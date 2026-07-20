import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Recursos y Documentación Técnica | Glastor',
  description:
    'Accede a whitepapers, documentación técnica, guías de instalación y modelos CAD para tu próximo proyecto de infraestructura.',
};

export default function RecursosLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
