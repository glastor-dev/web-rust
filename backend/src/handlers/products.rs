use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde_json::json;
use std::sync::Arc;

use crate::{
    models::{
        BestsellersParams, BestsellersResponse, CreateProductRequest, Product, ProductOption,
        ProductVariant, SyncVariantsRequest, UpdateProductRequest,
    },
    services::auth::AdminClaims,
    state::{AppError, AppState},
};

pub async fn get_products(State(state): State<Arc<AppState>>) -> Result<Json<Vec<Product>>, AppError> {
    let products = sqlx::query_as::<_, Product>("SELECT * FROM products")
        .fetch_all(&state.db_pool)
        .await?;

    Ok(Json(products))
}

pub async fn get_bestsellers(
    State(state): State<Arc<AppState>>,
    Query(params): Query<BestsellersParams>,
) -> Result<Json<BestsellersResponse>, AppError> {
    let limit = params.limit.unwrap_or(8);
    let category = params.category;

    let products = if let Some(ref cat) = category {
        sqlx::query_as::<_, Product>("SELECT * FROM products WHERE category = $1 ORDER BY sales_count DESC NULLS LAST LIMIT $2")
            .bind(cat)
            .bind(limit)
            .fetch_all(&state.db_pool)
            .await?
    } else {
        sqlx::query_as::<_, Product>("SELECT * FROM products ORDER BY sales_count DESC NULLS LAST LIMIT $1")
            .bind(limit)
            .fetch_all(&state.db_pool)
            .await?
    };
    let total: (i64,) = if let Some(ref cat) = category {
        sqlx::query_as("SELECT COUNT(*) FROM products WHERE category = $1")
            .bind(cat)
            .fetch_one(&state.db_pool)
            .await?
    } else {
        sqlx::query_as("SELECT COUNT(*) FROM products")
            .fetch_one(&state.db_pool)
            .await?
    };

    Ok(Json(BestsellersResponse {
        products,
        total: total.0,
    }))
}

pub async fn get_product_by_id(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<impl IntoResponse, AppError> {
    let product = sqlx::query_as::<_, Product>("SELECT * FROM products WHERE id = $1")
        .bind(id)
        .fetch_optional(&state.db_pool)
        .await?;

    match product {
        Some(p) => Ok((StatusCode::OK, Json(p)).into_response()),
        None => Ok((
            StatusCode::NOT_FOUND,
            Json(json!({"error": "Product not found"})),
        )
            .into_response()),
    }
}

pub async fn update_product(
    State(state): State<Arc<AppState>>,
    _claims: AdminClaims,
    Path(id): Path<String>,
    Json(payload): Json<UpdateProductRequest>,
) -> Result<impl IntoResponse, AppError> {
    let result = sqlx::query(
        r#"
        UPDATE products 
        SET 
            name = COALESCE($2, name),
            category = COALESCE($3, category),
            status = COALESCE($4, status),
            price = COALESCE($5, price),
            stock = COALESCE($6, stock),
            description = COALESCE($7, description),
            image = COALESCE($8, image),
            gallery = COALESCE($9, gallery),
            slug = COALESCE($10, slug),
            seo = COALESCE($11, seo),
            about_model = COALESCE($12, about_model),
            features = COALESCE($13, features),
            specifications = COALESCE($14, specifications)
        WHERE id = $1
        "#
    )
    .bind(&id)
    .bind(payload.name)
    .bind(payload.category)
    .bind(payload.status)
    .bind(payload.price)
    .bind(payload.stock)
    .bind(payload.description)
    .bind(payload.image)
    .bind(payload.gallery)
    .bind(payload.slug)
    .bind(payload.seo)
    .bind(payload.about_model)
    .bind(payload.features)
    .bind(payload.specifications)
    .execute(&state.db_pool)
    .await?;

    if result.rows_affected() == 0 {
        return Ok((
            StatusCode::NOT_FOUND,
            Json(json!({"error": "Product not found"})),
        )
            .into_response());
    }

    Ok((StatusCode::OK, Json(json!({"status": "success"}))).into_response())
}

pub async fn create_product(
    State(state): State<Arc<AppState>>,
    _claims: AdminClaims,
    Json(payload): Json<CreateProductRequest>,
) -> Result<impl IntoResponse, AppError> {
    sqlx::query(
        r#"
        INSERT INTO products (
            id, name, category, status, price, stock, description, image, gallery, slug, seo, about_model, features, specifications
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        )
        "#
    )
    .bind(&payload.id)
    .bind(payload.name)
    .bind(payload.category)
    .bind(payload.status.unwrap_or_else(|| "draft".to_string()))
    .bind(payload.price.unwrap_or(0.0))
    .bind(payload.stock.unwrap_or(0))
    .bind(payload.description)
    .bind(payload.image)
    .bind(payload.gallery)
    .bind(payload.slug)
    .bind(payload.seo)
    .bind(payload.about_model)
    .bind(payload.features)
    .bind(payload.specifications)
    .execute(&state.db_pool)
    .await?;

    Ok((StatusCode::CREATED, Json(json!({"status": "success", "id": payload.id}))).into_response())
}

pub async fn delete_product(
    State(state): State<Arc<AppState>>,
    _claims: AdminClaims,
    Path(id): Path<String>,
) -> Result<impl IntoResponse, AppError> {
    let result = sqlx::query("DELETE FROM products WHERE id = $1")
        .bind(&id)
        .execute(&state.db_pool)
        .await?;

    if result.rows_affected() == 0 {
        return Ok((
            StatusCode::NOT_FOUND,
            Json(json!({"error": "Product not found"})),
        ).into_response());
    }

    Ok((StatusCode::OK, Json(json!({"status": "success"}))).into_response())
}

pub async fn get_product_options(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<impl IntoResponse, AppError> {
    let options = sqlx::query_as::<_, ProductOption>("SELECT * FROM product_options WHERE product_id = $1")
        .bind(&id)
        .fetch_all(&state.db_pool)
        .await?;
    Ok((StatusCode::OK, Json(options)).into_response())
}

pub async fn get_product_variants(
    State(state): State<Arc<AppState>>,
    Path(id): Path<String>,
) -> Result<impl IntoResponse, AppError> {
    let variants = sqlx::query_as::<_, ProductVariant>("SELECT * FROM product_variants WHERE product_id = $1")
        .bind(&id)
        .fetch_all(&state.db_pool)
        .await?;
    Ok((StatusCode::OK, Json(variants)).into_response())
}

pub async fn update_product_variants(
    State(state): State<Arc<AppState>>,
    _claims: AdminClaims,
    Path(id): Path<String>,
    Json(payload): Json<SyncVariantsRequest>,
) -> Result<impl IntoResponse, AppError> {
    let mut tx = state.db_pool.begin().await?;

    // Delete existing options and variants for this product
    sqlx::query("DELETE FROM product_options WHERE product_id = $1").bind(&id).execute(&mut *tx).await?;
    sqlx::query("DELETE FROM product_variants WHERE product_id = $1").bind(&id).execute(&mut *tx).await?;

    // Insert new options
    for opt in payload.options {
        sqlx::query(
            "INSERT INTO product_options (id, product_id, title, values) VALUES ($1, $2, $3, $4)"
        )
        .bind(opt.id)
        .bind(&id)
        .bind(opt.title)
        .bind(opt.values)
        .execute(&mut *tx)
        .await?;
    }

    // Insert new variants
    for var in payload.variants {
        sqlx::query(
            "INSERT INTO product_variants (id, product_id, sku, price, stock, options) VALUES ($1, $2, $3, $4, $5, $6)"
        )
        .bind(var.id)
        .bind(&id)
        .bind(var.sku)
        .bind(var.price)
        .bind(var.stock)
        .bind(var.options)
        .execute(&mut *tx)
        .await?;
    }

    tx.commit().await?;

    Ok((StatusCode::OK, Json(json!({"status": "success"}))).into_response())
}
