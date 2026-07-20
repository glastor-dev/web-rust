use sqlx::PgPool;
use tracing::info;

pub async fn init_db(pool: &PgPool) -> Result<(), sqlx::Error> {
    info!("Running database migrations...");
    sqlx::migrate!("./migrations").run(pool).await?;

    // Initial seeding of architecture modules if table is empty
    let count: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM architecture_modules")
        .fetch_one(pool)
        .await?;

    if count.0 == 0 {
        info!("Seeding database with initial modules...");
        let modules = vec![
            (
                "m-auditoria",
                "Auditoría & Discovery (Rust/Bun)",
                "Diagnóstico",
                2500,
                1,
                2,
                "Análisis de cuellos de botella y diseño de arquitectura.",
            ),
            (
                "m-core-backend",
                "Core Backend en Rust",
                "Ingeniería Core",
                12500,
                4,
                6,
                "Reescritura del motor crítico. Concurrencia masiva sin Garbage Collector.",
            ),
            (
                "m-mvp-fast",
                "MVP de Alta Velocidad",
                "Startups",
                7500,
                3,
                6,
                "Desarrollo de producto base ultra-optimizado con Next.js/Rust.",
            ),
            (
                "m-webgl-ui",
                "Frontend Reactivo (WebGL)",
                "Experiencia Visual",
                9000,
                2,
                4,
                "Interfaces 3D, Shaders y animaciones inerciales (FCP < 1s).",
            ),
            (
                "m-cloud-refactor",
                "Refactorización Cloud / Contenedores",
                "Enterprise",
                10000,
                3,
                5,
                "Reducción de costos AWS trasladando microservicios pesados.",
            ),
            (
                "m-staff-elite",
                "Staff Augmentation Élite",
                "Equipos",
                6000,
                4,
                4,
                "Inyección de ingenieros Rust Senior por mes.",
            ),
        ];

        for m in modules {
            sqlx::query(
                "INSERT INTO architecture_modules (id, title, category, base_price, min_weeks, max_weeks, description) VALUES ($1, $2, $3, $4, $5, $6, $7)"
            )
            .bind(m.0)
            .bind(m.1)
            .bind(m.2)
            .bind(m.3)
            .bind(m.4)
            .bind(m.5)
            .bind(m.6)
            .execute(pool)
            .await?;
        }
    }

    Ok(())
}
