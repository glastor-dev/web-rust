pub mod db;
pub mod handlers;
pub mod models;
pub mod services;
pub mod state;

use axum::{
    extract::DefaultBodyLimit,
    http::{HeaderValue, Method},
    routing::{get, post},
    Router,
};
use reqwest::Client;
use sqlx::postgres::PgPoolOptions;
use std::env;
use std::sync::Arc;
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use crate::db::init_db;
use crate::handlers::{
    analytics::{get_analytics_summary, track_event, track_leave, track_pageview},
    auth::admin_login,
    forms::{send_arrepentimiento, send_sow},
    modules_api::get_modules,
    products::{
        create_product, delete_product, get_bestsellers, get_product_by_id, get_product_options,
        get_product_variants, get_products, update_product, update_product_variants,
        product_stock_stream,
    },
    sitemap::get_sitemap,
};
use crate::state::AppState;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let dotenv_result = dotenvy::dotenv_override();
    if let Err(e) = dotenv_result {
        println!("Failed to load .env file: {:?}", e);
    }

    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG")
                .unwrap_or_else(|_| "info,backend=debug,tower_http=debug".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let db_url = env::var("NEON_DB_URL").expect("NEON_DB_URL must be set in the environment");
    let pool_max = env::var("DB_POOL_MAX")
        .unwrap_or_else(|_| "50".to_string())
        .parse::<u32>()
        .unwrap_or(50);

    let pool = PgPoolOptions::new()
        .max_connections(pool_max)
        .connect(&db_url)
        .await?;

    init_db(&pool).await?;

    let resend_api_key = env::var("RESEND_API_KEY").unwrap_or_else(|_| "fake_key".to_string());
    let resend_from_email =
        env::var("RESEND_FROM_EMAIL").unwrap_or_else(|_| "onboarding@resend.dev".to_string());
    let analytics_salt =
        env::var("ANALYTICS_SALT").unwrap_or_else(|_| "glastor_default_salt_2026".to_string());
    let turnstile_secret_key = env::var("TURNSTILE_SECRET_KEY")
        .unwrap_or_else(|_| "1x0000000000000000000000000000000AA".to_string());

    let state = Arc::new(AppState {
        http_client: Client::new(),
        resend_api_key,
        resend_from_email,
        db_pool: pool,
        analytics_salt,
        turnstile_secret_key,
    });

    let frontend_url = env::var("FRONTEND_URL").unwrap_or_else(|_| "http://localhost:3000".to_string());
    
    let cors = CorsLayer::new()
        .allow_origin(vec![
            frontend_url.parse::<HeaderValue>().unwrap(),
            "http://localhost:5173".parse::<HeaderValue>().unwrap(), // Mantenemos Vite en local por si acaso
            "http://localhost:3000".parse::<HeaderValue>().unwrap(), // Next.js en local
        ])
        .allow_methods([Method::POST, Method::GET, Method::PUT, Method::OPTIONS])
        .allow_headers(tower_http::cors::Any);

    let governor_conf = Arc::new(
        tower_governor::governor::GovernorConfigBuilder::default()
            .per_second(10)
            .burst_size(50)
            .finish()
            .unwrap(),
    );

    let app = Router::new()
        .route("/api/auth/login", post(admin_login))
        .route("/api/modules", get(get_modules))
        .route("/api/products", get(get_products).post(create_product))
        .route("/api/products/stream", get(product_stock_stream))
        .route("/api/products/bestsellers", get(get_bestsellers))
        .route(
            "/api/products/{id}",
            get(get_product_by_id)
                .put(update_product)
                .delete(delete_product),
        )
        .route("/api/products/{id}/options", get(get_product_options))
        .route(
            "/api/products/{id}/variants",
            get(get_product_variants).put(update_product_variants),
        )
        .route("/api/sow/send", post(send_sow))
        .route("/api/arrepentimiento/send", post(send_arrepentimiento))
        .route("/api/analytics/pageview", post(track_pageview))
        .route("/api/analytics/leave", post(track_leave))
        .route("/api/analytics/event", post(track_event))
        .route("/api/analytics/summary", get(get_analytics_summary))
        .route("/api/sitemap.xml", get(get_sitemap))
        .layer(tower_governor::GovernorLayer::new(governor_conf))
        .layer(TraceLayer::new_for_http())
        .layer(cors)
        .layer(DefaultBodyLimit::max(10 * 1024 * 1024))
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await?;
    info!("Backend server running on http://localhost:3001");

    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<std::net::SocketAddr>(),
    )
    .await?;
    Ok(())
}
