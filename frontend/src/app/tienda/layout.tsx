import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Catálogo Mayorista B2B | Glastor',
  description:
    'El estándar definitivo para obras y manufactura. Acceso exclusivo a inventario B2B con líneas de crédito y logística de alto rendimiento.',
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
