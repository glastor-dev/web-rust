use axum::{extract::State, Json};
use std::sync::Arc;
use crate::{models::ArchitectureModule, state::{AppError, AppState}};

pub async fn get_modules(
    State(state): State<Arc<AppState>>,
) -> Result<Json<Vec<ArchitectureModule>>, AppError> {
    let modules = sqlx::query_as::<_, ArchitectureModule>("SELECT * FROM architecture_modules")
        .fetch_all(&state.db_pool)
        .await?;

    Ok(Json(modules))
}
