import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

import path from 'path';

const dynamicRoutes = [
  '/',
  '/servicios',
  '/proyectos',
  '/nosotros',
  '/legales'
]

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://glastor.dev',
      dynamicRoutes,
      generateRobotsTxt: true,
      robots: [{
        userAgent: '*',
        allow: '/'
      }]
    })
  ],
})
