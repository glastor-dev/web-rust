use axum::{
    extract::State,
    http::{HeaderMap, HeaderValue},
    response::IntoResponse,
};
use std::sync::Arc;
use crate::{models::Product, state::{AppError, AppState}};

pub async fn get_sitemap(State(state): State<Arc<AppState>>) -> Result<impl IntoResponse, AppError> {
    let products = sqlx::query_as::<_, Product>("SELECT * FROM products")
        .fetch_all(&state.db_pool)
        .await?;

    let mut xml = String::from("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
    xml.push_str("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");

    let static_urls = vec![
        ("https://glastor.es/", "weekly", "1.0"),
        ("https://glastor.es/servicios", "monthly", "0.8"),
        ("https://glastor.es/proyectos", "monthly", "0.8"),
        ("https://glastor.es/nosotros", "monthly", "0.8"),
        ("https://glastor.es/arquitectura", "monthly", "0.7"),
        ("https://glastor.es/tienda", "daily", "0.9"),
        ("https://glastor.es/legales", "yearly", "0.3"),
        ("https://glastor.es/arrepentimiento", "yearly", "0.3"),
    ];

    for (url, freq, prio) in static_urls {
        xml.push_str(&format!(
            "  <url>\n    <loc>{}</loc>\n    <changefreq>{}</changefreq>\n    <priority>{}</priority>\n  </url>\n",
            url, freq, prio
        ));
    }

    for p in products {
        xml.push_str(&format!(
            "  <url>\n    <loc>https://glastor.es/tienda/{}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n",
            p.id
        ));
    }

    xml.push_str("</urlset>\n");

    let mut headers = HeaderMap::new();
    headers.insert(
        axum::http::header::CONTENT_TYPE,
        HeaderValue::from_static("application/xml; charset=utf-8"),
    );

    Ok((headers, xml))
}
