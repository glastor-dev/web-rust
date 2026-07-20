use reqwest::Client;
use sqlx::PgPool;
use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use thiserror::Error;
use tracing::error;

pub struct AppState {
    pub http_client: Client,
    pub resend_api_key: String,
    pub resend_from_email: String,
    pub db_pool: PgPool,
    pub analytics_salt: String,
    pub turnstile_secret_key: String,
}

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
