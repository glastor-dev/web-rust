use axum::{
    extract::State,
    http::StatusCode,
    Json,
};
use bcrypt::{hash, verify, DEFAULT_COST};
use serde_json::json;

use uuid::Uuid;
use serde::Deserialize;

use crate::models::{RegisterPayload, User, UpdateProfilePayload};
use crate::services::auth::{create_user_token, UserClaims};

#[derive(Deserialize)]
pub struct CustomerLoginPayload {
    pub email: String,
    pub password: String,
}

pub async fn register(
    State(state): State<std::sync::Arc<crate::state::AppState>>,
    Json(payload): Json<RegisterPayload>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<serde_json::Value>)> {
    let hashed_password = hash(payload.password.as_bytes(), DEFAULT_COST).map_err(|_| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({"error": "Error al hashear contraseña"})),
        )
    })?;

    let id = Uuid::new_v4().to_string();

    let result = sqlx::query(
        "INSERT INTO users (id, email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5, 'customer')"
    )
    .bind(&id)
    .bind(&payload.email)
    .bind(&hashed_password)
    .bind(&payload.first_name)
    .bind(&payload.last_name)
    .execute(&state.db_pool)
    .await;

    match result {
        Ok(_) => {
            let token = create_user_token(&id, &payload.email).unwrap_or_default();
            Ok(Json(json!({ "token": token, "user": { "id": id, "email": payload.email, "first_name": payload.first_name, "last_name": payload.last_name } })))
        }
        Err(_) => Err((
            StatusCode::BAD_REQUEST,
            Json(json!({"error": "El email ya está registrado"})),
        )),
    }
}

pub async fn login(
    State(state): State<std::sync::Arc<crate::state::AppState>>,
    Json(payload): Json<CustomerLoginPayload>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<serde_json::Value>)> {
    let user = sqlx::query_as::<_, User>(
        "SELECT id, email, password_hash, first_name, last_name, phone, address, role, created_at FROM users WHERE email = $1"
    )
    .bind(payload.email)
    .fetch_optional(&state.db_pool)
    .await
    .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Error de base de datos"}))))?;

    if let Some(user) = user {
        let valid = verify(payload.password.as_bytes(), &user.password_hash).unwrap_or(false);
        if valid {
            let token = create_user_token(&user.id, &user.email).unwrap_or_default();
            Ok(Json(json!({ "token": token, "user": user })))
        } else {
            Err((StatusCode::UNAUTHORIZED, Json(json!({"error": "Credenciales inválidas"}))))
        }
    } else {
        Err((StatusCode::UNAUTHORIZED, Json(json!({"error": "Usuario no encontrado"}))))
    }
}

pub async fn get_profile(
    claims: UserClaims,
    State(state): State<std::sync::Arc<crate::state::AppState>>,
) -> Result<Json<User>, (StatusCode, Json<serde_json::Value>)> {
    let user = sqlx::query_as::<_, User>(
        "SELECT id, email, password_hash, first_name, last_name, phone, address, role, created_at FROM users WHERE id = $1"
    )
    .bind(claims.sub)
    .fetch_optional(&state.db_pool)
    .await
    .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Error de base de datos"}))))?;

    match user {
        Some(u) => Ok(Json(u)),
        None => Err((StatusCode::NOT_FOUND, Json(json!({"error": "Usuario no encontrado"})))),
    }
}

pub async fn update_profile(
    claims: UserClaims,
    State(state): State<std::sync::Arc<crate::state::AppState>>,
    Json(payload): Json<UpdateProfilePayload>,
) -> Result<Json<User>, (StatusCode, Json<serde_json::Value>)> {
    let result = sqlx::query_as::<_, User>(
        "UPDATE users SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), phone = COALESCE($3, phone), address = COALESCE($4, address) WHERE id = $5 RETURNING id, email, password_hash, first_name, last_name, phone, address, role, created_at"
    )
    .bind(payload.first_name)
    .bind(payload.last_name)
    .bind(payload.phone)
    .bind(payload.address)
    .bind(claims.sub)
    .fetch_one(&state.db_pool)
    .await;

    match result {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({"error": "Error al actualizar perfil"})),
        )),
    }
}

pub async fn get_users(
    _claims: crate::services::auth::AdminClaims,
    State(state): State<std::sync::Arc<crate::state::AppState>>,
) -> Result<Json<Vec<User>>, (StatusCode, Json<serde_json::Value>)> {
    let users = sqlx::query_as::<_, User>(
        "SELECT id, email, password_hash, first_name, last_name, phone, address, role, created_at FROM users ORDER BY created_at DESC"
    )
    .fetch_all(&state.db_pool)
    .await
    .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Error de base de datos"}))))?;

    Ok(Json(users))
}
