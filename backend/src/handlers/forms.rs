use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use serde_json::json;
use std::sync::Arc;
use tracing::info;

use crate::{
    models::{RevocationRequest, SowRequest},
    services::turnstile::verify_turnstile,
    state::{AppError, AppState},
};

fn response_is_success(res: &reqwest::Response) -> bool {
    res.status().is_success()
}

pub async fn send_sow(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<SowRequest>,
) -> Result<impl IntoResponse, AppError> {
    info!("Received SOW generation request for: {}", payload.email);

    let is_human = verify_turnstile(
        &payload.turnstile_token,
        &state.turnstile_secret_key,
        &state.http_client,
    )
    .await?;
    if !is_human {
        return Ok((
            StatusCode::BAD_REQUEST,
            Json(json!({ "status": "error", "message": "Security verification failed" })),
        )
            .into_response());
    }

    let b64_clean = if let Some(idx) = payload.pdf_base64.find(";base64,") {
        payload.pdf_base64[idx + 8..].to_string()
    } else {
        payload.pdf_base64
    };

    let email_payload = json!({
        "from": state.resend_from_email,
        "to": [payload.email],
        "subject": format!("GLASTOR® - SOW Técnico / Configuración B2B para {}", payload.company),
        "html": format!(
            "<h3>Hola {},</h3>\
            <p>Adjunto encontrarás el documento formal de <strong>Statement of Work (SOW)</strong> generado mediante nuestro Configurador Táctico para <strong>{}</strong>.</p>\
            <p>Revisa la propuesta técnica, el roadmap y el desglose de inversión. Cuando estés listo para escalar, respóndenos a este correo para coordinar una auditoría de 15 minutos.</p>\
            <p>Saludos,<br>El equipo de Glastor.</p>",
            payload.name, payload.company
        ),
        "attachments": [
            {
                "filename": format!("GLASTOR_SOW_{}.pdf", payload.company.replace(" ", "_")),
                "content": b64_clean
            }
        ]
    });

    let res = state
        .http_client
        .post("https://api.resend.com/emails")
        .bearer_auth(&state.resend_api_key)
        .json(&email_payload)
        .send()
        .await?;

    if response_is_success(&res) {
        Ok((
            StatusCode::OK,
            Json(json!({ "status": "success", "message": "Email sent" })),
        )
            .into_response())
    } else {
        let err_text = res.text().await.unwrap_or_default();
        Err(AppError::ResendError(err_text))
    }
}

pub async fn send_arrepentimiento(
    State(state): State<Arc<AppState>>,
    Json(payload): Json<RevocationRequest>,
) -> Result<impl IntoResponse, AppError> {
    info!("Received Arrepentimiento form from: {}", payload.email);

    let is_human = verify_turnstile(
        &payload.turnstile_token,
        &state.turnstile_secret_key,
        &state.http_client,
    )
    .await?;
    if !is_human {
        return Ok((
            StatusCode::BAD_REQUEST,
            Json(json!({ "status": "error", "message": "Security verification failed" })),
        )
            .into_response());
    }

    if !payload.declaration_accepted {
        return Ok((
            StatusCode::BAD_REQUEST,
            Json(json!({ "status": "error", "message": "Debe aceptar la declaración jurada" })),
        )
            .into_response());
    }

    let email_payload = json!({
        "from": state.resend_from_email,
        "to": [payload.email, state.resend_from_email.clone()],
        "subject": format!("Constancia de Revocación de Compra (Ley 24.240) - Orden #{}", payload.order_id),
        "html": format!(
            "<h3>Constancia de Solicitud de Revocación</h3>\
            <p>Estimado/a {} {},</p>\
            <p>Hemos recibido su solicitud de revocación de compra de conformidad con el Art. 34 de la Ley 24.240 de Defensa del Consumidor. A continuación se detallan los datos enviados:</p>\
            <ul>\
                <li><strong>DNI:</strong> {}</li>\
                <li><strong>Teléfono:</strong> {}</li>\
                <li><strong>Orden/Pedido:</strong> {}</li>\
                <li><strong>Fecha de Compra:</strong> {}</li>\
                <li><strong>Producto/Servicio:</strong> {}</li>\
                <li><strong>Motivo:</strong> {}</li>\
            </ul>\
            <p>Nuestro equipo procesará la solicitud a la brevedad y se pondrá en contacto con usted.</p>\
            <p>Atentamente,<br>Departamento Legal - Glastor</p>",
            payload.first_name, payload.last_name, payload.id_number, payload.phone, payload.order_id, payload.purchase_date, payload.product_name, payload.reason
        )
    });

    let res = state
        .http_client
        .post("https://api.resend.com/emails")
        .bearer_auth(&state.resend_api_key)
        .json(&email_payload)
        .send()
        .await?;

    if response_is_success(&res) {
        Ok((
            StatusCode::OK,
            Json(
                json!({ "status": "success", "message": "Solicitud de revocación enviada correctamente" }),
            ),
        )
            .into_response())
    } else {
        let err_text = res.text().await.unwrap_or_default();
        Err(AppError::ResendError(err_text))
    }
}
