# ==========================================
# Etapa 1: Build (Construcción con Bun y Vite)
# ==========================================
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copiamos primero los archivos de dependencias para aprovechar la caché de capas de Docker
COPY package.json bun.lock ./

# Instalamos las dependencias
RUN bun install --frozen-lockfile

# Copiamos el resto del código fuente
COPY . .

# Compilamos la aplicación de React
RUN bun run build

# ==========================================
# Etapa 2: Runtime (Servidor Web Nginx)
# ==========================================
FROM nginx:alpine

# Copiamos el build estático generado por Vite hacia la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiamos nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 (el estándar web)
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]
