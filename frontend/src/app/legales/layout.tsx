import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal y Políticas de Privacidad | Glastor',
  description: 'Términos y condiciones, políticas de privacidad y aviso legal de Glastor.',
};

export default function LegalesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
