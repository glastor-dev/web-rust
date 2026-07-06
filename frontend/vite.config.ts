import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import Sitemap from 'vite-plugin-sitemap';

import path from 'path';
import packageJson from './package.json' with { type: 'json' };

const dynamicRoutes = ['/', '/servicios', '/proyectos', '/nosotros', '/legales'];

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageJson.version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://glastor.dev',
      dynamicRoutes,
      generateRobotsTxt: true,
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
});
