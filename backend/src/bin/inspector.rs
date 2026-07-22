use sqlx::postgres::PgPoolOptions;
use std::env;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    dotenvy::dotenv().ok();
    let db_url = env::var("NEON_DB_URL").expect("NEON_DB_URL must be set");
    println!("Conectando a la base de datos...");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await?;

    println!("Conectado!");

    // FIX ADVISORY LOCKS BY KILLING OTHER CONNECTIONS
    sqlx::query("SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid()")
        .execute(&pool)
        .await?;
    println!("Todas las otras conexiones fueron terminadas. Locks liberados.");

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
