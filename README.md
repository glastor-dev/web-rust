<div align="center">
  <img src="https://img.shields.io/badge/Architecture-React%20%2B%20Rust-00ff66?style=for-the-badge" alt="Architecture" />
  <img src="https://img.shields.io/badge/Design-Awwwards%20Level-black?style=for-the-badge" alt="Design Level" />
  <img src="https://img.shields.io/badge/Status-Production-success?style=for-the-badge" alt="Status" />
</div>

<br />

<div align="center">
  <h1 align="center">GLASTOR Web Platform</h1>
  <p align="center">
    <strong>Plataforma B2B de ultra alto rendimiento, diseñada con cinemática inercial y respaldada por un core en Rust.</strong>
  </p>
</div>

---

## ⚡ Ecosistema de Ingeniería

Este repositorio es un Monorepo que unifica dos pilares de ingeniería extrema:

1. **Frontend Cinemático (`/frontend`)**: Una Single Page Application (SPA) brutalista y fluida construida en React 19 y Vite. Renderiza a 60FPS constantes utilizando aceleración por hardware, _smooth scrolling_ (Lenis) y orquestación de animaciones complejas (Framer Motion).
2. **Core Backend (`/backend`)**: Un demonio de sistema ultra rápido y concurrente forjado en **Rust**. Diseñado para procesar solicitudes pesadas, gestión de telemetría y lógicas empresariales del cotizador con una huella de memoria en reposo casi indetectable (~20MB).

## 🚀 Tecnologías Core

### Frontend (User Experience & Cinematics)
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite (Ultra fast HMR)
- **Styling:** TailwindCSS v4 + Glassmorphism Customizado
- **Motion & Physics:** Framer Motion + Lenis (Smooth Scroll Inercial)
- **Linter & Formatter:** Biome + Oxlint

### Backend (Performance & Security)
- **Lenguaje:** Rust (Edición 2021)
- **Base de Datos:** PostgreSQL
- **Concurrencia:** Tokio runtime

## 🛠️ Entorno de Desarrollo Local

Si formas parte del equipo de ingeniería o eres un _early adopter_, sigue estos pasos para levantar el entorno completo en tu máquina:

### Requisitos Previos
- [Node.js](https://nodejs.org/) (v20+) y [Bun](https://bun.sh/)
- [Rust](https://rustup.rs/) (Cargo)

### Ejecutar Frontend
```bash
cd frontend
bun install
bun run dev
```

### Ejecutar Backend
```bash
cd backend
cargo run
```

## 📐 Estricto Cumplimiento de Diseño (Awwwards)
Toda contribución visual debe apegarse estrictamente a nuestro `DESIGN_RULES.md`. GLASTOR utiliza un enfoque brutalista premium:
- **Paleta Cromática:** `#050505` (Ultra Black) como fondo absoluto. `#00ff66` (Glastor Green) para acentos cinéticos y micro-interacciones de hover.
- **Tipografía Fluida:** Sin breakpoints bruscos. Todo el texto escala de forma dinámica (`clamp()`).
- **Motion Priority:** Ningún componente "aparece de golpe". Todo fluye, desde máscaras difuminadas hasta bordes reactivos al cursor.

## 🤝 Sostenibilidad y Contribución
Consulta nuestro archivo `CONTRIBUTORS.md` y `CITATION.cff` para conocer cómo ser parte del impacto, auditar nuestro código o escalar junto a nosotros a nivel de negocio y desarrollo.

---
© 2010-2026 Andrés Antonio Cardoso — GLASTOR®. Todos los derechos reservados.
