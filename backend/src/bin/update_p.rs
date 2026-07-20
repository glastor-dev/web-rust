use sqlx::postgres::PgPoolOptions;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenvy::dotenv().ok();
    let db_url = env::var("NEON_DB_URL").expect("NEON_DB_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(2)
        .connect(&db_url)
        .await?;

    let specs = serde_json::json!({
        "pantalla": "32\"",
        "resolucion": "HD",
        "tipo_panel": "LED",
        "tasa_refresco": "60 Hz",
        "sistema_operativo": "VIDAA U5",
        "apps": ["Netflix", "YouTube", "Disney+", "Prime Video", "Flow"],
        "entradas_hdmi": "Sí",
        "entradas_usb": 2,
        "bluetooth": "No",
        "potencia_parlantes": "6W",
        "peso": "3.6 kg",
        "dimensiones_con_soporte": "716 × 428 × 86 mm",
        "dimensiones_sin_soporte": "717 × 427 × 86 mm"
    });

    sqlx::query(
        r#"
        UPDATE products 
        SET 
            name = $2,
            category = $3,
            price = $4,
            description = $5,
            rating = $6,
            image = $7,
            material = $8,
            dimensions = $9,
            weight = $10,
            stock = $11,
            status = $12,
            about_model = $13,
            features = $14,
            specifications = $15
        WHERE id = $1
        "#
    )
    .bind("P") // 1
    .bind("Smart TV Hisense 32\" A42K") // 2
    .bind("TV") // 3
    .bind(150000.0) // 4
    .bind("<p>El Smart TV Hisense 32\" A42K se distingue por su ingeniería de vanguardia dentro del innovador ecosistema VIDAA U5. Diseñado para ofrecer una experiencia fluida, cuenta con una interfaz intuitiva que facilita el acceso a tus aplicaciones favoritas como Netflix, YouTube, y Flow.</p><p>Su diseño minimalista y compacto se adapta perfectamente a cualquier ambiente, mientras que su resolución HD asegura una calidad de imagen nítida. Cuenta con 2 entradas USB y conexiones HDMI para máxima versatilidad.</p>") // 5 description
    .bind(4.5) // 6 rating
    .bind("https://www.hisense.com.ar/wp-content/uploads/2026/01/Hisense_POP_TVDigital_A4_32.jpg") // 7 image
    .bind("Plástico/Metal") // 8 material
    .bind("716 × 428 × 86 mm") // 9 dimensions
    .bind("3.6 kg") // 10 weight
    .bind(10) // 11 stock
    .bind("active") // 12 status
    .bind("Modelo A42K HD") // 13 about
    .bind(serde_json::json!([
        {"title": "Sistema VIDAA U5", "desc": "Plataforma rápida e intuitiva para tus apps favoritas."},
        {"title": "Resolución HD", "desc": "Imágenes claras y colores vivos para tu entretenimiento."},
        {"title": "Conectividad Total", "desc": "Múltiples puertos HDMI y USB para todos tus dispositivos."},
        {"title": "Diseño sin bordes", "desc": "Estética moderna que se integra en cualquier espacio."},
        {"title": "Audio Envolvente", "desc": "Potencia de 6W con optimización de sonido para diálogos claros."}
    ]).to_string()) // 14 features (stored as JSON string or parsed dynamically in frontend)
    .bind(specs.to_string()) // 15 specs
    .execute(&pool)
    .await?;

    println!("Product P successfully UPDATED in Neon DB.");
    Ok(())
}
