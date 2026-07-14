use sqlx::postgres::PgPoolOptions;
use std::env;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    let db_url = "postgresql://neondb_owner:npg_sdOv2ulAn1zo@ep-super-glitter-ahdn7lxs-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
    println!("Conectando a {}...", db_url);

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(db_url)
        .await?;

    println!("Conectado!");

    // Consultar las tablas públicas
    let tables: Vec<(String,)> = sqlx::query_as(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
    )
    .fetch_all(&pool)
    .await?;

    println!("Tablas en public:");
    for (table_name,) in &tables {
        println!("- {}", table_name);
        // Consultar columnas
        let cols: Vec<(String, String)> = sqlx::query_as(
            "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1",
        )
        .bind(table_name)
        .fetch_all(&pool)
        .await?;

        for (col, dtype) in cols {
            println!("  - {}: {}", col, dtype);
        }
    }

    Ok(())
}
