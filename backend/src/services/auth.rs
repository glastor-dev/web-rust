use axum::{
    extract::FromRequestParts,
    http::{request::Parts, StatusCode},
    Json,
};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, Serialize, Deserialize)]
pub struct AdminClaims {
    pub role: String,
    pub exp: usize,
}

impl<S> FromRequestParts<S> for AdminClaims
where
    S: Send + Sync,
{
    type Rejection = (StatusCode, Json<serde_json::Value>);

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let auth_header = parts.headers.get("Authorization").and_then(|h| h.to_str().ok());
        if let Some(auth_header) = auth_header {
            if auth_header.starts_with("Bearer ") {
                let token = &auth_header["Bearer ".len()..];
                let secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "glastor_secret_2026".to_string());
                
                let token_data = decode::<AdminClaims>(
                    token,
                    &DecodingKey::from_secret(secret.as_ref()),
                    &Validation::default()
                ).map_err(|_| {
                    (StatusCode::UNAUTHORIZED, Json(json!({"error": "Invalid token"})))
                })?;
                
                return Ok(token_data.claims);
            }
        }
        Err((StatusCode::UNAUTHORIZED, Json(json!({"error": "Missing or invalid authorization header"}))))
    }
}

pub fn create_admin_token() -> Result<String, ()> {
    let secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "glastor_secret_2026".to_string());
    
    let claims = AdminClaims {
        role: "admin".to_string(),
        exp: (chrono::Utc::now() + chrono::Duration::hours(24)).timestamp() as usize,
    };
    
    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_ref())
    ).map_err(|_| ())
}
