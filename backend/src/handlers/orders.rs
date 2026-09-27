use axum::{
    extract::State,
    http::StatusCode,
    Json,
};
use serde_json::json;

use uuid::Uuid;

use crate::models::{CreateOrderPayload, Order};
use crate::services::auth::{UserClaims, AdminClaims};

pub async fn create_order(
    claims: UserClaims,
    State(state): State<std::sync::Arc<crate::state::AppState>>,
    Json(payload): Json<CreateOrderPayload>,
) -> Result<Json<serde_json::Value>, (StatusCode, Json<serde_json::Value>)> {
    let order_id = Uuid::new_v4().to_string();

    let mut tx = state.db_pool.begin().await.map_err(|_| {
        (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Error al iniciar transacción"})))
    })?;

    sqlx::query(
        "INSERT INTO orders (id, user_id, status, total_amount, shipping_address) VALUES ($1, $2, 'pending', $3, $4)"
    )
    .bind(&order_id)
    .bind(claims.sub.clone())
    .bind(payload.total_amount)
    .bind(&payload.shipping_address)
    .execute(&mut *tx)
    .await
    .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Error al crear orden"}))))?;

    for item in payload.items {
        let item_id = Uuid::new_v4().to_string();
        sqlx::query(
            "INSERT INTO order_items (id, order_id, product_id, quantity, price_at_purchase, product_name) VALUES ($1, $2, $3, $4, $5, $6)"
        )
        .bind(item_id)
        .bind(&order_id)
        .bind(item.product_id)
        .bind(item.quantity)
        .bind(item.price_at_purchase)
        .bind(item.product_name)
        .execute(&mut *tx)
        .await
        .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Error al crear items de la orden"}))))?;
    }

    tx.commit().await.map_err(|_| {
        (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Error al finalizar orden"})))
    })?;

    Ok(Json(json!({ "success": true, "order_id": order_id })))
}

pub async fn get_user_orders(
    claims: UserClaims,
    State(state): State<std::sync::Arc<crate::state::AppState>>,
) -> Result<Json<Vec<Order>>, (StatusCode, Json<serde_json::Value>)> {
    let orders = sqlx::query_as::<_, Order>(
        "SELECT id, user_id, status, total_amount, shipping_address, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC"
    )
    .bind(claims.sub)
    .fetch_all(&state.db_pool)
    .await
    .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Error de base de datos"}))))?;

    Ok(Json(orders))
}

pub async fn get_admin_orders(
    _claims: AdminClaims,
    State(state): State<std::sync::Arc<crate::state::AppState>>,
) -> Result<Json<Vec<Order>>, (StatusCode, Json<serde_json::Value>)> {
    let orders = sqlx::query_as::<_, Order>(
        "SELECT id, user_id, status, total_amount, shipping_address, created_at FROM orders ORDER BY created_at DESC"
    )
    .fetch_all(&state.db_pool)
    .await
    .map_err(|_| (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": "Error de base de datos"}))))?;

    Ok(Json(orders))
}
