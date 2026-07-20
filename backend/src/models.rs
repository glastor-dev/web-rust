use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Deserialize)]
pub struct LoginPayload {
    pub password: String,
}

#[derive(Deserialize)]
pub struct SowRequest {
    pub email: String,
    pub name: String,
    pub company: String,
    pub pdf_base64: String,
    pub turnstile_token: String,
}

#[derive(Deserialize)]
pub struct RevocationRequest {
    pub first_name: String,
    pub last_name: String,
    pub id_number: String,
    pub phone: String,
    pub email: String,
    pub order_id: String,
    pub purchase_date: String,
    pub product_name: String,
    pub reason: String,
    pub declaration_accepted: bool,
    pub turnstile_token: String,
}

#[derive(Deserialize)]
pub struct PageviewRequest {
    pub path: String,
    pub referrer: Option<String>,
    pub screen_size: Option<String>,
}

#[derive(Deserialize)]
pub struct LeaveRequest {
    pub path: String,
    pub duration_seconds: i32,
}

#[derive(Deserialize)]
pub struct EventRequest {
    pub event_name: String,
    pub path: String,
    pub data: Option<String>,
}

#[derive(Serialize, FromRow)]
pub struct TopPage {
    pub path: String,
    pub views: i64,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct ArchitectureModule {
    pub id: String,
    pub title: String,
    pub category: String,
    pub base_price: i32,
    pub min_weeks: i32,
    pub max_weeks: i32,
    pub description: String,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct MediaAsset {
    pub id: String,
    pub url: String,
    pub format: String,
    pub created_at: Option<String>,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct ProductOption {
    pub id: String,
    pub product_id: String,
    pub title: String,
    pub values: serde_json::Value,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct ProductVariant {
    pub id: String,
    pub product_id: String,
    pub sku: String,
    pub price: f32,
    pub stock: i32,
    pub options: serde_json::Value,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct Product {
    pub id: String,
    pub name: Option<String>,
    pub category: Option<String>,
    pub price: Option<f32>,
    pub description: Option<String>,
    pub rating: Option<f32>,
    pub image: Option<String>,
    pub badges: Option<serde_json::Value>,
    pub material: Option<String>,
    pub dimensions: Option<String>,
    pub weight: Option<String>,
    pub stock: Option<i32>,
    pub reviews: Option<serde_json::Value>,
    pub gallery: Option<serde_json::Value>,
    pub status: Option<String>,
    #[sqlx(rename = "publishDate")]
    pub publish_date: Option<String>,
    pub seo: Option<serde_json::Value>,
    pub about_model: Option<String>,
    pub features: Option<String>,
    pub specifications: Option<String>,
    pub slug: Option<String>,
    pub sales_count: Option<i32>,
}

#[derive(Deserialize)]
pub struct UpdateProductRequest {
    pub name: Option<String>,
    pub category: Option<String>,
    pub status: Option<String>,
    pub price: Option<f32>,
    pub stock: Option<i32>,
    pub description: Option<String>,
    pub image: Option<String>,
    pub gallery: Option<serde_json::Value>,
    pub slug: Option<String>,
    pub seo: Option<serde_json::Value>,
    pub about_model: Option<String>,
    pub features: Option<String>,
    pub specifications: Option<String>,
}

#[derive(Deserialize)]
pub struct CreateProductRequest {
    pub id: String,
    pub name: Option<String>,
    pub category: Option<String>,
    pub status: Option<String>,
    pub price: Option<f32>,
    pub stock: Option<i32>,
    pub description: Option<String>,
    pub image: Option<String>,
    pub gallery: Option<serde_json::Value>,
    pub slug: Option<String>,
    pub seo: Option<serde_json::Value>,
    pub about_model: Option<String>,
    pub features: Option<String>,
    pub specifications: Option<String>,
}

#[derive(Deserialize)]
pub struct BestsellersParams {
    pub limit: Option<i64>,
    pub category: Option<String>,
}

#[derive(Serialize)]
pub struct BestsellersResponse {
    pub products: Vec<Product>,
    pub total: i64,
}

#[derive(Deserialize)]
pub struct SyncVariantsRequest {
    pub options: Vec<ProductOptionDTO>,
    pub variants: Vec<ProductVariantDTO>,
}

#[derive(Deserialize)]
pub struct ProductOptionDTO {
    pub id: String,
    pub title: String,
    pub values: serde_json::Value,
}

#[derive(Deserialize)]
pub struct ProductVariantDTO {
    pub id: String,
    pub sku: String,
    pub price: f32,
    pub stock: i32,
    pub options: serde_json::Value,
}

#[derive(Serialize, FromRow)]
pub struct TopEvent {
    pub event_name: String,
    pub count: i64,
}

#[derive(Serialize)]
pub struct AnalyticsSummary {
    pub total_pageviews: i64,
    pub unique_visitors: i64,
    pub average_duration: i64,
    pub top_pages: Vec<TopPage>,
    pub top_events: Vec<TopEvent>,
}
