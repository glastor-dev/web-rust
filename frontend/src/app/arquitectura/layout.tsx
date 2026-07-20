import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configurador de Arquitectura | Glastor',
  description: 'Configura la arquitectura técnica de tu próximo proyecto con nuestros ingenieros.',
};

export default function ArquitecturaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
