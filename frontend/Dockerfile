# ==========================================
# Etapa 1: Build (Construcción con Node y Next.js)
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package.json pnpm-lock.yaml* ./

# Instalamos pnpm globalmente
RUN npm install -g pnpm

# Instalamos las dependencias
RUN pnpm install --frozen-lockfile

# Copiamos el resto del código fuente
COPY . .

# Compilamos la aplicación Next.js
RUN pnpm run build

# ==========================================
# Etapa 2: Runtime (Servidor Node.js standalone)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copiamos los archivos necesarios de la etapa de build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Exponemos el puerto
EXPOSE 3000

# Ejecutamos el servidor standalone
CMD ["node", "server.js"]
