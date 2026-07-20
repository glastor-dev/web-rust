import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Botón de Arrepentimiento | Glastor',
  description:
    'Formulario de arrepentimiento de compra. Cuentas con 10 días para solicitar la cancelación de tu orden.',
};

export default function ArrepentimientoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
