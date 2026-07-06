use axum::{
    extract::{State, DefaultBodyLimit},
    http::{HeaderMap, HeaderValue, Method, StatusCode},
    response::{IntoResponse, Response},
    routing::{post, get},
    Json, Router,
};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::{sqlite::SqlitePoolOptions, SqlitePool, FromRow};
use std::env;
use std::sync::Arc;
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;
use tracing::{info, error};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use thiserror::Error;
use sha2::{Sha256, Digest};
use chrono::Utc;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Failed to send email via Resend: {0}")]
    ResendError(String),
    #[error("Network error: {0}")]
    NetworkError(#[from] reqwest::Error),
    #[error("Database error: {0}")]
    DatabaseError(#[from] sqlx::Error),
    #[error("Internal server error")]
    InternalServerError,
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            AppError::ResendError(msg) => {
                error!("Resend API Error: {}", msg);
                (StatusCode::INTERNAL_SERVER_ERROR, "Failed to send email")
            }
            AppError::NetworkError(err) => {
                error!("Reqwest Network Error: {}", err);
                (StatusCode::INTERNAL_SERVER_ERROR, "Network error")
            }
            AppError::DatabaseError(err) => {
                error!("Database Error: {}", err);
                (StatusCode::INTERNAL_SERVER_ERROR, "Database error")
            }
            AppError::InternalServerError => {
                error!("Internal Server Error");
                (StatusCode::INTERNAL_SERVER_ERROR, "Internal server error")
            }
        };

        let body = Json(json!({
            "status": "error",
            "message": error_message,
        }));

        (status, body).into_response()
    }
}

#[derive(Deserialize)]
struct SowRequest {
    email: String,
    name: String,
    company: String,
    pdf_base64: String,
}

#[derive(Deserialize)]
struct RevocationRequest {
    nombre: String,
    apellido: String,
    dni: String,
    telefono: String,
    email: String,
    orden: String,
    fecha_compra: String,
    producto: String,
    motivo: String,
    declaracion: bool,
}

#[derive(Deserialize)]
struct PageviewRequest {
    path: String,
    referrer: Option<String>,
    screen_size: Option<String>,
}

#[derive(Deserialize)]
struct LeaveRequest {
    path: String,
    duration_seconds: i32,
}

#[derive(Deserialize)]
struct EventRequest {
    event_name: String,
    path: String,
    data: Option<String>,
}


#[derive(Serialize, FromRow)]
struct TopPage {
    path: String,
    views: i64,
}

#[derive(Serialize, Deserialize, FromRow)]
struct ArchitectureModule {
    id: String,
    title: String,
    category: String,
    base_price: i32,
    min_weeks: i32,
    max_weeks: i32,
    description: String,
}

struct AppState {
    http_client: Client,
    resend_api_key: String,
    resend_from_email: String,
    db_pool: SqlitePool,
    analytics_salt: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let _ = dotenvy::dotenv();

    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "info,backend=debug,tower_http=debug".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let db_url = "sqlite://data.db";
    if !std::path::Path::new("data.db").exists() {
        std::fs::File::create("data.db")?;
    }
    
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(db_url)
        .await?;

    init_db(&pool).await?;

    let resend_api_key = env::var("RESEND_API_KEY").unwrap_or_else(|_| "fake_key".to_string());
    let resend_from_email = env::var("RESEND_FROM_EMAIL").unwrap_or_else(|_| "onboarding@resend.dev".to_string());
    let analytics_salt = env::var("ANALYTICS_SALT").unwrap_or_else(|_| "glastor_default_salt_2026".to_string());

    let state = Arc::new(AppState {
        http_client: Client::new(),
        resend_api_key,
        resend_from_email,
        db_pool: pool,
        analytics_salt,
    });

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::POST, Method::GET, Method::OPTIONS])
        .allow_headers(tower_http::cors::Any);

    let governor_conf = Arc::new(
        tower_governor::governor::GovernorConfigBuilder::default()
            .per_second(2)
            .burst_size(5)
            .finish()
            .unwrap()
    );

    let app = Router::new()
        .route("/api/modules", get(get_modules))
        .route("/api/sow/send", post(send_sow))
        .route("/api/arrepentimiento/send", post(send_arrepentimiento))
        .route("/api/analytics/pageview", post(track_pageview))
        .route("/api/analytics/leave", post(track_leave))
        .route("/api/analytics/event", post(track_event))
        .route("/api/analytics/summary", get(get_analytics_summary))
        .layer(tower_governor::GovernorLayer::new(governor_conf))
        .layer(TraceLayer::new_for_http())
        .layer(cors)
        .layer(DefaultBodyLimit::max(10 * 1024 * 1024))
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await?;
    info!("Backend server running on http://localhost:3001");
    
    axum::serve(listener, app).await?;
    Ok(())
}

async fn init_db(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS architecture_modules (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            base_price INTEGER NOT NULL,
            min_weeks INTEGER NOT NULL,
            max_weeks INTEGER NOT NULL,
            description TEXT NOT NULL
        );
        "#,
    )
    .execute(pool)
    .await?;

    // Drop table to update schema for analytics (development reset)
    let _ = sqlx::query("DROP TABLE IF EXISTS analytics_pageviews").execute(pool).await;
    let _ = sqlx::query("DROP TABLE IF EXISTS analytics_events").execute(pool).await;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS analytics_pageviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            path TEXT NOT NULL,
            user_agent TEXT NOT NULL,
            referrer TEXT,
            screen_size TEXT,
            duration_seconds INTEGER DEFAULT 0,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    )
    .execute(pool)
    .await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS analytics_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            event_name TEXT NOT NULL,
            path TEXT NOT NULL,
            data TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    )
    .execute(pool)
    .await?;

    let count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM architecture_modules")
        .fetch_one(pool)
        .await?;

    if count.0 == 0 {
        info!("Seeding database with initial modules...");
        let modules = vec![
            ("m-auditoria", "Auditoría & Discovery (Rust/Bun)", "Diagnóstico", 5000, 1, 2, "Análisis de cuellos de botella y diseño de arquitectura."),
            ("m-core-backend", "Core Backend en Rust", "Ingeniería Core", 25000, 4, 6, "Reescritura del motor crítico. Concurrencia masiva sin Garbage Collector."),
            ("m-mvp-fast", "MVP de Alta Velocidad", "Startups", 15000, 3, 6, "Desarrollo de producto base ultra-optimizado con Next.js/Rust."),
            ("m-webgl-ui", "Frontend Reactivo (WebGL)", "Experiencia Visual", 18000, 2, 4, "Interfaces 3D, Shaders y animaciones inerciales (FCP < 1s)."),
            ("m-cloud-refactor", "Refactorización Cloud / Contenedores", "Enterprise", 20000, 3, 5, "Reducción de costos AWS trasladando microservicios pesados."),
            ("m-staff-elite", "Staff Augmentation Élite", "Equipos", 12000, 4, 4, "Inyección de ingenieros Rust Senior por mes.")
        ];

        for m in modules {
            sqlx::query(
                "INSERT INTO architecture_modules (id, title, category, base_price, min_weeks, max_weeks, description) VALUES (?, ?, ?, ?, ?, ?, ?)"
            )
            .bind(m.0)
            .bind(m.1)
            .bind(m.2)
            .bind(m.3)
            .bind(m.4)
            .bind(m.5)
            .bind(m.6)
            .execute(pool)
            .await?;
        }
    }
    
    Ok(())
}

fn get_client_ip(headers: &HeaderMap) -> String {
    headers
        .get("x-forwarded-for")
        .and_then(|h| h.to_str().ok())
        .unwrap_or("127.0.0.1")
        .split(',')
        .next()
        .unwrap_or("127.0.0.1")
        .trim()
        .to_string()
}

fn generate_session_id(ip: &str, user_agent: &str, salt: &str) -> String {
    let date = Utc::now().format("%Y-%m-%d").to_string();
    let raw = format!("{}-{}-{}-{}", ip, user_agent, date, salt);
    let mut hasher = Sha256::new();
    hasher.update(raw);
    hex::encode(hasher.finalize())
}

async fn get_modules(State(state): State<Arc<AppState>>) -> Result<Json<Vec<ArchitectureModule>>, AppError> {
    let modules = sqlx::query_as::<_, ArchitectureModule>("SELECT * FROM architecture_modules")
        .fetch_all(&state.db_pool)
        .await?;
    
    Ok(Json(modules))
}

async fn send_sow(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<SowRequest>,
) -> Result<impl IntoResponse, AppError> {
    info!("Received SOW generation request for: {}", payload.email);
    
    let b64_clean = if let Some(idx) = payload.pdf_base64.find(";base64,") {
        payload.pdf_base64[idx + 8..].to_string()
    } else {
        payload.pdf_base64
    };

    let email_payload = json!({
        "from": state.resend_from_email,
        "to": [payload.email],
        "subject": format!("GLASTOR® - SOW Técnico / Configuración B2B para {}", payload.company),
        "html": format!(
            "<h3>Hola {},</h3>\
            <p>Adjunto encontrarás el documento formal de <strong>Statement of Work (SOW)</strong> generado mediante nuestro Configurador Táctico para <strong>{}</strong>.</p>\
            <p>Revisa la propuesta técnica, el roadmap y el desglose de inversión. Cuando estés listo para escalar, respóndenos a este correo para coordinar una auditoría de 15 minutos.</p>\
            <p>Saludos,<br>El equipo de Glastor.</p>",
            payload.name, payload.company
        ),
        "attachments": [
            {
                "filename": format!("GLASTOR_SOW_{}.pdf", payload.company.replace(" ", "_")),
                "content": b64_clean
            }
        ]
    });

    let res = state
        .http_client
        .post("https://api.resend.com/emails")
        .bearer_auth(&state.resend_api_key)
        .json(&email_payload)
        .send()
        .await?;

    if response_is_success(&res) {
        Ok((StatusCode::OK, Json(json!({ "status": "success", "message": "Email sent" }))))
    } else {
        let err_text = res.text().await.unwrap_or_default();
        Err(AppError::ResendError(err_text))
    }
}

async fn send_arrepentimiento(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<RevocationRequest>,
) -> Result<impl IntoResponse, AppError> {
    info!("Received Arrepentimiento form from: {}", payload.email);

    if !payload.declaracion {
        return Ok((StatusCode::BAD_REQUEST, Json(json!({ "status": "error", "message": "Debe aceptar la declaración jurada" }))));
    }

    let email_payload = json!({
        "from": state.resend_from_email,
        "to": [payload.email, state.resend_from_email.clone()],
        "subject": format!("Constancia de Revocación de Compra (Ley 24.240) - Orden #{}", payload.orden),
        "html": format!(
            "<h3>Constancia de Solicitud de Revocación</h3>\
            <p>Estimado/a {} {},</p>\
            <p>Hemos recibido su solicitud de revocación de compra de conformidad con el Art. 34 de la Ley 24.240 de Defensa del Consumidor. A continuación se detallan los datos enviados:</p>\
            <ul>\
                <li><strong>DNI:</strong> {}</li>\
                <li><strong>Teléfono:</strong> {}</li>\
                <li><strong>Orden/Pedido:</strong> {}</li>\
                <li><strong>Fecha de Compra:</strong> {}</li>\
                <li><strong>Producto/Servicio:</strong> {}</li>\
                <li><strong>Motivo:</strong> {}</li>\
            </ul>\
            <p>Nuestro equipo procesará la solicitud a la brevedad y se pondrá en contacto con usted.</p>\
            <p>Atentamente,<br>Departamento Legal - Glastor</p>",
            payload.nombre, payload.apellido, payload.dni, payload.telefono, payload.orden, payload.fecha_compra, payload.producto, payload.motivo
        )
    });

    let res = state
        .http_client
        .post("https://api.resend.com/emails")
        .bearer_auth(&state.resend_api_key)
        .json(&email_payload)
        .send()
        .await?;

    if response_is_success(&res) {
        Ok((StatusCode::OK, Json(json!({ "status": "success", "message": "Solicitud de revocación enviada correctamente" }))))
    } else {
        let err_text = res.text().await.unwrap_or_default();
        Err(AppError::ResendError(err_text))
    }
}

fn response_is_success(res: &reqwest::Response) -> bool {
    res.status().is_success()
}

async fn track_pageview(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<PageviewRequest>,
) -> Result<impl IntoResponse, AppError> {
    let user_agent = headers
        .get(axum::http::header::USER_AGENT)
        .and_then(|h| h.to_str().ok())
        .unwrap_or("unknown");

    let ip = get_client_ip(&headers);
    let session_id = generate_session_id(&ip, user_agent, &state.analytics_salt);

    sqlx::query(
        "INSERT INTO analytics_pageviews (session_id, path, user_agent, referrer, screen_size) VALUES (?, ?, ?, ?, ?)"
    )
    .bind(&session_id)
    .bind(&payload.path)
    .bind(user_agent)
    .bind(&payload.referrer)
    .bind(&payload.screen_size)
    .execute(&state.db_pool)
    .await?;

    Ok((StatusCode::OK, Json(json!({ "status": "success", "session_id": session_id }))))
}

async fn track_leave(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<LeaveRequest>,
) -> Result<impl IntoResponse, AppError> {
    let user_agent = headers
        .get(axum::http::header::USER_AGENT)
        .and_then(|h| h.to_str().ok())
        .unwrap_or("unknown");

    let ip = get_client_ip(&headers);
    let session_id = generate_session_id(&ip, user_agent, &state.analytics_salt);

    sqlx::query(
        "UPDATE analytics_pageviews SET duration_seconds = ? WHERE id = (SELECT id FROM analytics_pageviews WHERE session_id = ? AND path = ? ORDER BY id DESC LIMIT 1)"
    )
    .bind(payload.duration_seconds)
    .bind(&session_id)
    .bind(&payload.path)
    .execute(&state.db_pool)
    .await?;

    Ok((StatusCode::OK, Json(json!({ "status": "success" }))))
}

async fn track_event(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<EventRequest>,
) -> Result<impl IntoResponse, AppError> {
    let user_agent = headers
        .get(axum::http::header::USER_AGENT)
        .and_then(|h| h.to_str().ok())
        .unwrap_or("unknown");

    let ip = get_client_ip(&headers);
    let session_id = generate_session_id(&ip, user_agent, &state.analytics_salt);

    sqlx::query(
        "INSERT INTO analytics_events (session_id, event_name, path, data) VALUES (?, ?, ?, ?)"
    )
    .bind(&session_id)
    .bind(&payload.event_name)
    .bind(&payload.path)
    .bind(&payload.data)
    .execute(&state.db_pool)
    .await?;

    Ok((StatusCode::OK, Json(json!({ "status": "success" }))))
}

#[derive(Serialize, FromRow)]
struct TopEvent {
    event_name: String,
    count: i64,
}

#[derive(Serialize)]
struct AnalyticsSummary {
    total_pageviews: i64,
    unique_visitors: i64,
    average_duration: i64,
    top_pages: Vec<TopPage>,
    top_events: Vec<TopEvent>,
}

async fn get_analytics_summary(
    State(state): State<Arc<AppState>>,
) -> Result<impl IntoResponse, AppError> {
    let total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM analytics_pageviews").fetch_one(&state.db_pool).await?;
    let unique: (i64,) = sqlx::query_as("SELECT COUNT(DISTINCT session_id) FROM analytics_pageviews").fetch_one(&state.db_pool).await?;
    let avg_duration: (Option<f64>,) = sqlx::query_as("SELECT AVG(duration_seconds) FROM analytics_pageviews WHERE duration_seconds > 0").fetch_one(&state.db_pool).await?;
    
    let top_pages = sqlx::query_as::<_, TopPage>(
        "SELECT path, COUNT(*) as views FROM analytics_pageviews GROUP BY path ORDER BY views DESC LIMIT 5"
    ).fetch_all(&state.db_pool).await?;

    let top_events = sqlx::query_as::<_, TopEvent>(
        "SELECT event_name, COUNT(*) as count FROM analytics_events GROUP BY event_name ORDER BY count DESC LIMIT 5"
    ).fetch_all(&state.db_pool).await?;

    let summary = AnalyticsSummary {
        total_pageviews: total.0,
        unique_visitors: unique.0,
        average_duration: avg_duration.0.unwrap_or(0.0) as i64,
        top_pages,
        top_events,
    };

    Ok((StatusCode::OK, Json(summary)))
}
