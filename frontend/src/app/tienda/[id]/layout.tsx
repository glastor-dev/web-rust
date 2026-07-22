import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${url}/api/products/${resolvedParams.id}`, { cache: 'no-store' });
    if (!response.ok) {
      return { title: 'Producto no encontrado | Glastor' };
    }
    const product = await response.json();

    const title = `${product.name} | Glastor Equipamiento`;
    const description =
      product.description?.replace(/<[^>]+>/g, '') ||
      `Adquiere el ${product.name} en Glastor. Equipamiento de Grado Industrial.`;
    const image = product.image || '/images/default-tool.png';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: image }],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    return { title: 'Glastor | Equipamiento Industrial' };
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
