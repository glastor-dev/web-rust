import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finalizar Compra B2B | Glastor',
  description: 'Completa tu orden de compra B2B de forma segura.',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
