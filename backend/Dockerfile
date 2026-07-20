# ==========================================
# Etapa 1: Build (Compilación de Rust)
# ==========================================
FROM rust:slim-bookworm AS builder

# Instalar dependencias necesarias para compilar algunas librerías (ej. SQLx)
RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiamos los manifiestos primero para aprovechar la caché
COPY Cargo.toml Cargo.lock ./
# Creamos un src dummy para compilar las dependencias solas y cachearlas
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src

# Copiamos el código real
COPY src ./src

# Forzamos la recompilación del código real (touch obliga a ignorar el caché del main dummy)
RUN touch src/main.rs
RUN cargo build --release

# ==========================================
# Etapa 2: Runtime (Entorno de Ejecución Mínimo)
# ==========================================
FROM debian:bookworm-slim

# Instalamos certificados SSL y SQLite3 (si lo usas localmente)
RUN apt-get update && apt-get install -y libssl3 ca-certificates sqlite3 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiamos el binario compilado desde la etapa anterior
COPY --from=builder /app/target/release/backend /usr/local/bin/backend

# Exponemos el puerto del backend
EXPOSE 3001

# Ejecutamos el demonio de Rust
CMD ["backend"]
