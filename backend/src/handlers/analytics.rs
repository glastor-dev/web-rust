use axum::{
    extract::State,
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use chrono::Utc;
use serde_json::json;
use sha2::{Digest, Sha256};
use std::sync::Arc;

use crate::{
    models::{AnalyticsSummary, EventRequest, LeaveRequest, PageviewRequest, TopEvent, TopPage},
    services::auth::AdminClaims,
    state::{AppError, AppState},
};

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

pub async fn track_pageview(
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
        "INSERT INTO analytics_pageviews (session_id, path, user_agent, referrer, screen_size) VALUES ($1, $2, $3, $4, $5)"
    )
    .bind(&session_id)
    .bind(&payload.path)
    .bind(user_agent)
    .bind(&payload.referrer)
    .bind(&payload.screen_size)
    .execute(&state.db_pool)
    .await?;

    Ok((
        StatusCode::OK,
        Json(json!({ "status": "success", "session_id": session_id })),
    ))
}

pub async fn track_leave(
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
        "UPDATE analytics_pageviews SET duration_seconds = $1 WHERE id = (SELECT id FROM analytics_pageviews WHERE session_id = $2 AND path = $3 ORDER BY id DESC LIMIT 1)"
    )
    .bind(payload.duration_seconds)
    .bind(&session_id)
    .bind(&payload.path)
    .execute(&state.db_pool)
    .await?;

    Ok((StatusCode::OK, Json(json!({ "status": "success" }))))
}

pub async fn track_event(
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
        "INSERT INTO analytics_events (session_id, event_name, path, data) VALUES ($1, $2, $3, $4)",
    )
    .bind(&session_id)
    .bind(&payload.event_name)
    .bind(&payload.path)
    .bind(&payload.data)
    .execute(&state.db_pool)
    .await?;

    Ok((StatusCode::OK, Json(json!({ "status": "success" }))))
}

pub async fn get_analytics_summary(
    State(state): State<Arc<AppState>>,
    _claims: AdminClaims,
) -> Result<impl IntoResponse, AppError> {
    let total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM analytics_pageviews")
        .fetch_one(&state.db_pool)
        .await?;
    let unique: (i64,) =
        sqlx::query_as("SELECT COUNT(DISTINCT session_id) FROM analytics_pageviews")
            .fetch_one(&state.db_pool)
            .await?;

    let avg_duration: (Option<f64>,) = sqlx::query_as(
        "SELECT AVG(duration_seconds)::FLOAT FROM analytics_pageviews WHERE duration_seconds > 0",
    )
    .fetch_one(&state.db_pool)
    .await?;

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
