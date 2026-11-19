use axum::{
    response::IntoResponse,
    http::{HeaderMap, HeaderValue},
};
use crate::state::AppError;

pub async fn get_sitemap() -> Result<impl IntoResponse, AppError> {

    let mut xml = String::from("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
    xml.push_str("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");

    let static_urls = vec![
        ("https://glastor.es/", "weekly", "1.0"),
        ("https://glastor.es/servicios", "monthly", "0.9"),
        ("https://glastor.es/proyectos", "monthly", "0.9"),
        ("https://glastor.es/nosotros", "monthly", "0.8"),
        ("https://glastor.es/arquitectura", "monthly", "0.8"),
        ("https://glastor.es/recursos", "monthly", "0.7"),
        ("https://glastor.es/legales", "yearly", "0.3"),
        ("https://glastor.es/arrepentimiento", "yearly", "0.3"),
    ];

    for (url, freq, prio) in static_urls {
        xml.push_str(&format!(
            "  <url>\n    <loc>{}</loc>\n    <changefreq>{}</changefreq>\n    <priority>{}</priority>\n  </url>\n",
            url, freq, prio
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
