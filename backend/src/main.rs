use axum::{
    extract::{State, DefaultBodyLimit},
    http::{HeaderValue, Method, StatusCode},
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

    // Init SQLite DB
    let db_url = "sqlite://data.db";
    // Create the DB file if it doesn't exist
    if !std::path::Path::new("data.db").exists() {
        std::fs::File::create("data.db")?;
    }
    
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(db_url)
        .await?;

    // Create table and seed if empty
    init_db(&pool).await?;

    let resend_api_key = env::var("RESEND_API_KEY").unwrap_or_else(|_| "fake_key".to_string());
    let resend_from_email = env::var("RESEND_FROM_EMAIL").unwrap_or_else(|_| "onboarding@resend.dev".to_string());

    let state = Arc::new(AppState {
        http_client: Client::new(),
        resend_api_key,
        resend_from_email,
        db_pool: pool,
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
