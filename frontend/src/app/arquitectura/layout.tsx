import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configurador Táctico de Arquitectura | Glastor',
  description: 'Cotizador B2B transparente. Calcula la inversión base y plazos de ejecución para ingeniería de backend, infraestructura y sistemas críticos.',
};

export default function ArquitecturaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
