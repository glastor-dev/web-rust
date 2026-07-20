use reqwest::Client;
use serde::Deserialize;
use crate::state::AppError;

#[derive(Deserialize)]
struct TurnstileResponse {
    success: bool,
}

pub async fn verify_turnstile(token: &str, secret: &str, client: &Client) -> Result<bool, AppError> {
    let mut params = std::collections::HashMap::new();
    params.insert("secret", secret);
    params.insert("response", token);

    let res = client
        .post("https://challenges.cloudflare.com/turnstile/v0/siteverify")
        .form(&params)
        .send()
        .await?;

    if res.status().is_success() {
        let ts_res: TurnstileResponse = res
            .json()
            .await
            .map_err(|_| AppError::InternalServerError)?;
        Ok(ts_res.success)
    } else {
        Ok(false)
    }
}
