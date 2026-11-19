import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Recursos, RFDs y Deep-Dives en Rust | Glastor Labs',
  description:
    'Artículos de ingeniería de sistemas, RFDs técnicos, patrones de producción en Rust, Tokio, Axum, SQLx, Docker distroless y Kubernetes.',
};

export default function RecursosLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
