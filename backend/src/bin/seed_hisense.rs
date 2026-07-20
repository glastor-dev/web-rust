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

    let empty_json = serde_json::json!({});
    let empty_array = serde_json::json!([]);

    sqlx::query(
        r#"
        INSERT INTO products (
            id, name, category, price, description, rating, image, badges, material, dimensions, weight, stock, reviews, gallery, status, "publishDate", seo, variants, about_model, features, specifications
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
        ) ON CONFLICT (id) DO UPDATE SET 
            specifications = EXCLUDED.specifications,
            image = EXCLUDED.image
        "#
    )
    .bind("P") // 1
    .bind("Smart TV Hisense 32\" A42K") // 2
    .bind("TV") // 3
    .bind(150000.0) // 4
    .bind("Smart TV Hisense 32\" HD A42K con VIDAA U5") // 5
    .bind(4.5) // 6 rating
    .bind("https://www.hisense.com.ar/wp-content/uploads/2026/01/Hisense_POP_TVDigital_A4_32.jpg") // 7 image
    .bind(&empty_json) // 8 badges
    .bind("Plástico/Metal") // 9 material
    .bind("716 × 428 × 86 mm") // 10 dimensions
    .bind("3.6 kg") // 11 weight
    .bind(10) // 12 stock
    .bind(&empty_json) // 13 reviews
    .bind(&empty_array) // 14 gallery
    .bind("active") // 15 status
    .bind("2026-07-15") // 16 publishDate
    .bind(&empty_json) // 17 seo
    .bind(&empty_array) // 18 variants
    .bind("Modelo A42K HD") // 19 about
    .bind("Smart TV, VIDAA U5") // 20 features
    .bind(specs.to_string()) // 21 specs
    .execute(&pool)
    .await?;

    println!("Product successfully inserted into Neon DB.");
    Ok(())
}
