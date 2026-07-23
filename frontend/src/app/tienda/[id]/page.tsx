'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ChevronLeft } from 'lucide-react';
import { SEO } from '@/components/SEO';
import type { Product } from '@/components/ui/ProductCard';

import { ProductGallery } from './components/ProductGallery';
import { ProductCheckout } from './components/ProductCheckout';
import { ProductTabs } from './components/ProductTabs';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const tabsRef = useRef<HTMLDivElement>(null);

  const {
    data: product,
    isLoading: loading,
    error,
  } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const url = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${url}/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      return response.json();
    },
    enabled: !!id,
  });

  // Generación de reseñas dinámicas y métricas agregadas
  const mockReviewsData = useMemo(() => {
    if (!product) return { reviews: [], totalCount: 0 };
    let seed = 0;
    for (let i = 0; i < product.id.length; i++) {
      seed += product.id.charCodeAt(i);
    }
    const numReviews = (seed % 3) + 3; // 3 to 5 reviews to show visually
    const totalCount = 150 + (seed % 350); // Generates a realistic number between 150 and 500

    const names = [
      'Carlos M. - Jefe de Obra',
      'Talleres Automotrices Ruiz',
      'Juan D. - Contratista',
      'Servicios Industriales Hnos',
      'Pedro L. - Operario',
      'G. Fernández - Logística',
      'Constructora Albas',
      'Miguel T. - Taller Metalúrgico',
      'Suministros Técnicos V.',
      'Roberto G. - Mecánico Jefe',
    ];

    const comments = [
      'Después de evaluar varias opciones en el mercado para nuestra línea de ensamblaje, optamos por este modelo. La construcción sólida y el diseño ergonómico han reducido significativamente la fatiga de nuestros operarios durante turnos de 8 horas. Reemplazamos nuestro equipo antiguo y la diferencia en tiempos de operación es simplemente brutal. Sin duda, una inversión que se paga sola en el primer trimestre.',
      'Como jefes de mantenimiento en una planta de alta demanda, necesitamos herramientas que no nos dejen tirados. La capacidad térmica de este equipo es sobresaliente; puede operar bajo uso continuo y cargas máximas sin activar la protección térmica. El motor entrega un torque consistente y la calibración llegó perfecta. Excelente relación calidad-precio para exigencias industriales.',
      'Implementamos esta herramienta hace aproximadamente 4 meses para trabajos estructurales. Nos ha sorprendido su tolerancia al polvo y la resistencia de su carcasa ante caídas accidentales. Hemos notado un aumento del 15% en la productividad de la cuadrilla simplemente por no tener que interrumpir el trabajo para recargas constantes. Materiales de primera categoría.',
      'Lo compramos para pruebas y terminó siendo el caballo de batalla principal de nuestro taller mecánico. La precisión de los ajustes y la potencia constante hacen que el trabajo pesado parezca sencillo. Los plásticos son de alto impacto y los engranajes metálicos transmiten fiabilidad. Es un equipo pesado, pero es el precio a pagar por este nivel de robustez técnica.',
      'Teníamos dudas sobre cambiar nuestro proveedor de herramientas, pero el rendimiento que ofrecen superó nuestras expectativas operativas. Las vibraciones son mínimas y el nivel de ruido está por debajo del estándar, lo que ayuda muchísimo en naves cerradas. A nivel logístico, el empaque modular y los accesorios incluidos nos facilitaron la estandarización del equipo en la empresa.',
      'Una pieza de ingeniería excepcional para el contratista moderno. Destaca especialmente por su eficiencia energética y la rapidez con la que se logran terminaciones profesionales. Llevo más de 20 años administrando proyectos de construcción civil pesada y pocas herramientas en el mercado actual transmiten esta sensación de durabilidad inagotable desde el primer tacto.',
    ];

    const reviews = [];
    for (let i = 0; i < numReviews; i++) {
      const pseudoRand = (((seed + i) * 1103515245 + 12345) % 2147483648) / 2147483648;
      const ratingValue = 4.4 + pseudoRand * 0.6; // 4.4 to 5.0
      const name = names[(seed + i) % names.length];
      const text = comments[(seed * i + i) % comments.length];
      const dateOffset = pseudoRand * 10000000000;
      const dateStr = new Date(Date.now() - dateOffset).toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric',
      });
      reviews.push({
        id: i,
        name,
        date: dateStr,
        rating: ratingValue.toFixed(1),
        text,
        numericRating: ratingValue,
      });
    }
    return { reviews, totalCount };
  }, [product]);

  const averageRating =
    mockReviewsData.reviews.length > 0
      ? mockReviewsData.reviews.reduce((acc, rev) => acc + rev.numericRating, 0) /
        mockReviewsData.reviews.length
      : 4.5;
  const fullStarsHeader = Math.floor(averageRating);
  const hasHalfHeader = averageRating - fullStarsHeader >= 0.4;

  useLayoutEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      window.dispatchEvent(new Event('force-lenis-reset'));
    }
  }, [loading]);

  if (loading) {
    return (
      <>
        <LoadingScreen />
        <div
          className="h-[200vh] w-full bg-[#050505] opacity-0 pointer-events-none"
          aria-hidden="true"
        />
      </>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold uppercase mb-4 text-red-500">Error</h2>
          <p className="text-zinc-400 mb-8 font-mono">Error al cargar los detalles del producto.</p>
          <Link
            href="/tienda"
            className="bg-brand text-black px-6 py-3 font-bold uppercase text-sm"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const parseJson = (str: string | null | undefined, fallback: any = []) => {
    if (!str) return fallback;
    try {
      return typeof str === 'string' ? JSON.parse(str) : str;
    } catch {
      return fallback;
    }
  };

  const isOutOfStock = product.stock <= 0;
  const rawGallery = parseJson((product as any).gallery, [
    product.image || '/images/default-tool.png',
  ]);
  const gallery = (
    rawGallery?.length > 0
      ? [...new Set(rawGallery)]
      : [product.image || '/images/default-tool.png']
  ) as string[];

  const sku = product.id.split('-')[0]?.toUpperCase() || 'GLX-P30';

  const navigateToReviews = () => {
    if (tabsRef.current) {
      // Small delay allows React to set the state inside the child component if we passed it via context,
      // but here we just scroll to the tabs section wrapper.
      // We could use context or ref forwarding to set 'RESEÑAS' in ProductTabs, but scrolling is usually enough.
      const offsetTop = tabsRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 pb-24 font-sans">
      <SEO
        schemaType="Product"
        dynamicSchema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description?.replace(/<[^>]+>/g, ''),
          sku,
          image: product.image || '/images/default-tool.png',
          brand: {
            '@type': 'Brand',
            name: product.name.split(' ')[0],
          },
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'ARS',
            availability:
              product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: averageRating.toFixed(1),
            reviewCount: mockReviewsData.totalCount,
          },
        }}
      />
      
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        {/* Breadcrumbs */}
        <div className="text-xs font-mono text-zinc-500 mb-6 tracking-wide">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link> /{' '}
          <Link href="/tienda" className="hover:text-white transition-colors">Catálogo</Link> /{' '}
          <span className="text-zinc-300">{product.name.substring(0, 30)}...</span>
        </div>

        {/* Top Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/tienda"
              className="flex items-center text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 px-4 py-2 rounded-sm transition-colors border border-white/5"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Volver a la galería
            </Link>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-white/5 border border-white/5 text-zinc-400">
              {product.category || 'MARCA'}
            </span>
          </div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
            GLASTOR ® DIRECTO v4.11 // CP-OPTIMIZER
          </div>
        </div>

        {/* HERO SPLIT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          {/* Lado Izquierdo: Galería */}
          <ProductGallery product={product} gallery={gallery} />

          {/* Lado Derecho: Info & Checkout */}
          <ProductCheckout
            product={product}
            sku={sku}
            averageRating={averageRating}
            fullStarsHeader={fullStarsHeader}
            hasHalfHeader={hasHalfHeader}
            totalCount={mockReviewsData.totalCount}
            isOutOfStock={isOutOfStock}
            onNavigateToReviews={navigateToReviews}
          />
        </div>

        {/* TABS SECTION */}
        <div ref={tabsRef}>
          <ProductTabs product={product} sku={sku} mockReviewsData={mockReviewsData} />
        </div>
      </div>
    </div>
  );
}
