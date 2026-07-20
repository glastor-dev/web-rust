use axum::{http::StatusCode, Json};
use serde_json::json;
use crate::models::LoginPayload;
use crate::services::auth::create_admin_token;

pub async fn admin_login(
    Json(payload): Json<LoginPayload>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<serde_json::Value>)> {
    let expected_password = std::env::var("ADMIN_PASSWORD").unwrap_or_else(|_| "glastor2026".to_string());

    if payload.password == expected_password {
        let token = create_admin_token().map_err(|_| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({"error": "Failed to create token"})),
            )
        })?;

        Ok(Json(json!({ "token": token })))
    } else {
        Err((
            StatusCode::UNAUTHORIZED,
            Json(json!({"error": "Invalid password"})),
        ))
    }
}
