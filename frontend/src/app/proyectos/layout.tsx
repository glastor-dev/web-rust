import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Casos de Éxito y Proyectos | Glastor',
  description:
    'Descubre cómo Glastor ha optimizado infraestructuras industriales pesadas en distintos sectores con resultados medibles.',
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
