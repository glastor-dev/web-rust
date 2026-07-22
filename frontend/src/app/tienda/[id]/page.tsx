'use client';

import { useState, useLayoutEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ChevronLeft, Star, StarHalf, Truck, Heart, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import type { Product } from '@/components/ui/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 150]);

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

  // States for interactive UI
  const [activeImage, setActiveImage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'RESUMEN' | 'ESPECIFICACIONES' | 'RESEÑAS'>('RESUMEN');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
  const [shippingDate, setShippingDate] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<string>('');

  const { toggleItem: toggleWishlistItem, hasItem: hasWishlistItem } = useWishlistStore();
  const isWishlisted = product ? hasWishlistItem(product.id) : false;

  useLayoutEffect(() => {
    // Shipping Date (today + 3 days)
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    setShippingDate(`el ${date.toLocaleDateString('es-ES', options)}`);

    // Time left (until 17:00 cutoff)
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(17, 0, 0, 0); // 5 PM cutoff

      if (now > target) {
        target.setDate(target.getDate() + 1); // Next day 5 PM
      }

      const diff = target.getTime() - now.getTime();
      const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hrs} hrs ${mins} mins.`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

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

    // Textos con mucho más desarrollo e inmersión en B2B
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
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>{' '}
          /{' '}
          <Link href="/tienda" className="hover:text-white transition-colors">
            Catálogo
          </Link>{' '}
          / <span className="text-zinc-300">{product.name.substring(0, 30)}...</span>
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
            GLASTOR ® DIRECTCO v4.11 // CP-OPTIMIZER
          </div>
        </div>

        {/* HERO SPLIT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          {/* Lado Izquierdo: Galería */}
          <div className="flex flex-col gap-4">
            {/* Imagen Principal */}
            <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square bg-[#080808] border border-white/5 rounded-xl flex items-center justify-center p-8 overflow-hidden group">
              <motion.div style={{ y: parallaxY }} className="w-full h-full relative">
                <Image
                  src={gallery[activeImage] as string}
                  alt={product.name}
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain filter drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/800x800/111/444?text=Herramienta';
                  }}
                />
              </motion.div>
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur border border-white/10 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                VISTA GENERAL
              </div>
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {gallery.slice(0, 4).map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square bg-[#080808] rounded-lg border flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${
                      activeImage === i
                        ? 'border-brand shadow-[0_0_15px_rgba(0,255,102,0.1)]'
                        : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lado Derecho: Info & Checkout */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-brand font-bold text-xs uppercase tracking-widest">
                GLASTOR ® DIRECTCO
              </span>
              <span className="bg-white/10 text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                MODELO: {sku}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-6">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-brand">
                <span className="font-bold mr-1">{averageRating.toFixed(1)}</span>
                <div className="flex text-brand">
                  {[...Array(fullStarsHeader)].map((_, i) => (
                    <Star key={`hf-${i}`} className="w-4 h-4" fill="currentColor" />
                  ))}
                  {hasHalfHeader && <StarHalf className="w-4 h-4" fill="currentColor" />}
                  {[...Array(5 - fullStarsHeader - (hasHalfHeader ? 1 : 0))].map((_, i) => (
                    <Star key={`he-${i}`} className="w-4 h-4 text-brand/30" />
                  ))}
                </div>
              </div>
              <span
                className="text-xs text-brand font-bold cursor-pointer hover:underline"
                onClick={() => {
                  setActiveTab('RESEÑAS');
                  window.scrollBy({ top: 300, behavior: 'smooth' });
                }}
              >
                {mockReviewsData.totalCount} valoraciones
              </span>
              <span className="bg-white/5 border border-white/10 text-[10px] text-zinc-400 font-mono uppercase tracking-widest px-2 py-1 rounded-sm">
                ENVIO GRATIS
              </span>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4 pr-8">
              {product.description
                ? isDescriptionExpanded
                  ? product.description.replace(/<[^>]+>/g, '')
                  : product.description.replace(/<[^>]+>/g, '').split('. ')[0] + '.'
                : `Descubra la cúspide del rendimiento y la portabilidad con la ${product.name}. Diseñada para el profesional exigente que requiere precisión y potencia sin restricciones de cable.`}
            </p>

            {product.description &&
              product.description.replace(/<[^>]+>/g, '').split('. ').length > 1 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-brand text-xs font-bold uppercase tracking-widest hover:underline self-start mb-8"
                >
                  {isDescriptionExpanded ? 'OCULTAR DESCRIPCIÓN' : 'VER DESCRIPCIÓN COMPLETA'}
                </button>
              )}

            {/* Checkout Card */}
            <div className="mt-auto bg-[#080808] border border-zinc-800 rounded-xl p-6 sm:p-8">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    PRECIO DE INVERSIÓN (ARS)
                  </span>
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tighter">
                    $ {product.price.toLocaleString('es-AR')}
                  </span>
                </div>
                <div className="bg-[#0a2012] border border-brand/30 text-brand text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                  {isOutOfStock ? 'AGOTADO' : 'DISPONIBLE'}
                </div>
              </div>
              <p className="text-brand text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
                IVA DEL 21% INCLUIDO.
              </p>

              <hr className="border-zinc-800 mb-6" />

              <div className="flex items-start gap-4 mb-8">
                <Truck className="w-5 h-5 text-zinc-400 mt-0.5" />
                <p className="text-xs text-zinc-400 leading-relaxed" suppressHydrationWarning>
                  Envío <span className="text-brand font-bold">GRATIS</span>{' '}
                  {shippingDate || 'calculando...'}.
                  <br />
                  Pedido antes de:{' '}
                  <span className="text-brand font-bold">{timeLeft || 'calculando...'}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative w-full sm:w-28">
                  <select className="w-full bg-black border border-zinc-700 text-white font-bold text-sm px-4 py-3.5 rounded-md appearance-none outline-none focus:border-brand">
                    <option>1 UND</option>
                    <option>2 UND</option>
                    <option>3 UND</option>
                    <option>4 UND</option>
                    <option>5+ UND</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400" />
                </div>
                <button
                  disabled={isOutOfStock}
                  onClick={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price || 0,
                      image: product.image,
                      quantity: 1,
                    });
                    toast.success(`Añadido: ${product.name}`, {
                      description: `Se han añadido 1 unidad(es) a tu orden.`,
                      action: {
                        label: 'Ver Orden',
                        onClick: () => toggleDrawer(),
                      },
                    });
                  }}
                  className="grow bg-[#050505] border border-brand text-brand hover:bg-brand hover:text-black transition-colors font-extrabold text-sm tracking-widest py-3.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  AÑADIR AL CARRITO
                </button>
              </div>

              <button
                disabled={isOutOfStock}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white transition-colors font-bold uppercase text-xs tracking-widest py-4 rounded-md mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                COMPRAR AHORA (1-CLIC)
              </button>

              <button
                onClick={() => {
                  if (product) {
                    toggleWishlistItem(product.id);
                    if (!isWishlisted) {
                      toast.success('Producto guardado', {
                        description: 'El producto se ha añadido a tu lista de deseos.',
                      });
                    } else {
                      toast.success('Producto eliminado', {
                        description: 'El producto se ha eliminado de tu lista de deseos.',
                      });
                    }
                  }
                }}
                className={`w-full flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  isWishlisted ? 'text-brand hover:text-brand/80' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
                {isWishlisted ? 'EN LISTA DE DESEOS' : 'AGREGAR A LISTA DE DESEOS'}
              </button>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex gap-8 border-b border-zinc-800 mb-8 overflow-x-auto pb-4 hide-scrollbar">
            {[
              'RESUMEN',
              'ESPECIFICACIONES TÉCNICAS',
              `RESEÑAS (${mockReviewsData.totalCount})`,
            ].map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(tab.split(' ')[0] as any)}
                className={`text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap pb-4 relative transition-colors ${
                  activeTab === tab.split(' ')[0]
                    ? 'text-brand'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab}
                {activeTab === tab.split(' ')[0] && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-brand"
                  />
                )}
              </button>
            ))}
          </div>

          {/* TAB CONTENT (RESUMEN por defecto) */}
          {activeTab === 'RESUMEN' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24"
            >
              {/* Left Column: Acerca del modelo */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
                  ACERCA DEL MODELO
                </h3>
                <div
                  className="text-zinc-400 text-sm leading-relaxed [&>p]:mb-5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-3 [&>ul]:mb-5 [&_strong]:text-white"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.about_model ||
                      product.description ||
                      `
                    <p>El ${product.name} se distingue por su ingeniería de vanguardia diseñada para dominar las aplicaciones de alta demanda. Este modelo incorpora un <strong class="text-white">motor de alto rendimiento</strong> que, junto con el control de velocidad, aplica potencia adicional automáticamente bajo carga, asegurando un rendimiento óptimo y consistente.</p>
                    <p>Su diseño se centra en la resistencia y la protección, con componentes de alta durabilidad que resguardan las superficies delicadas de posibles daños. Además, características como su ergonomía avanzada y el <strong class="text-white">arranque suave</strong> no solo aumentan la comodidad y el control del operador, sino que también prolongan la vida útil del equipo, haciendo de esta herramienta una inversión inteligente y duradera.</p>
                  `,
                  }}
                />
              </div>

              {/* Right Column: Características Principales */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
                  CARACTERÍSTICAS PRINCIPALES
                </h3>
                <ul className="list-disc pl-5 space-y-4 text-sm text-zinc-400 marker:text-brand">
                  {(() => {
                    try {
                      const features = product.features ? JSON.parse(product.features) : null;
                      if (Array.isArray(features) && features.length > 0) {
                        return features.map((f: any, i: number) => (
                          <li key={i}>
                            <strong className="text-white">
                              {f.title || f.name || 'Destacado'}:
                            </strong>{' '}
                            {f.desc || f.description || f.value || f}
                          </li>
                        ));
                      }
                    } catch (e) {
                      // If it's just text
                      if (product.features && product.features.length > 5) {
                        return (
                          <li>
                            <strong className="text-white">Destacado:</strong>{' '}
                            <span
                              className="block mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-3 [&_li]:marker:text-brand"
                              dangerouslySetInnerHTML={{ __html: product.features }}
                            />
                          </li>
                        );
                      }
                    }

                    // Fallback to hardcoded Makita features if no features exist
                    return (
                      <>
                        <li>
                          <strong className="text-white">Portabilidad Inalámbrica Superior:</strong>{' '}
                          Ofrece una solución sin cables para una variedad de aplicaciones
                          industriales, maximizando la movilidad y flexibilidad en el lugar de
                          trabajo.
                        </li>
                        <li>
                          <strong className="text-white">Control de Velocidad Preciso:</strong>{' '}
                          Equipada con un selector y gatillo de velocidad variable que permite al
                          usuario igualar la velocidad a la aplicación específica, garantizando
                          acabados impecables.
                        </li>
                        <li>
                          <strong className="text-white">Diseño Robusto y Protector:</strong> Cuenta
                          con engomado sobre la carcasa de engranajes y la batería, diseñado para
                          ayudar a proteger tanto la herramienta como las superficies de trabajo
                          delicadas.
                        </li>
                        <li>
                          <strong className="text-white">Ergonomía y Comodidad:</strong> Con un peso
                          optimizado, reduce significativamente la fatiga del operador durante usos
                          prolongados, complementado por un agarre de hule suave.
                        </li>
                        <li>
                          <strong className="text-white">
                            Tecnología de Protección Extrema (XPT™):
                          </strong>{' '}
                          Ingeniería avanzada para proporcionar una mayor resistencia contra el
                          polvo y el agua, ideal para las condiciones más severas.
                        </li>
                        <li>
                          <strong className="text-white">Arranque Suave:</strong> Suprime la
                          reacción de inicio, facilitando arranques más fluidos y contribuyendo a
                          una mayor durabilidad del engranaje y el motor.
                        </li>
                      </>
                    );
                  })()}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'ESPECIFICACIONES' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col max-w-4xl"
            >
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
                ESPECIFICACIONES DEL PRODUCTO
              </h3>

              {/* Tabla de Especificaciones */}
              <div className="border border-white/20 rounded-md mb-10 overflow-hidden bg-black/20">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-white/20 p-4 sm:p-6 hover:bg-white/5 transition-colors">
                  <span className="text-xs font-bold uppercase text-zinc-400 mb-2 sm:mb-0 flex items-center">
                    MODELO / SKU
                  </span>
                  <span className="font-mono text-sm text-white">{sku}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-white/20 p-4 sm:p-6 hover:bg-white/5 transition-colors">
                  <span className="text-xs font-bold uppercase text-zinc-400 mb-2 sm:mb-0 flex items-center">
                    MATERIAL BASE
                  </span>
                  <span className="font-mono text-sm text-white">
                    {product.material || 'Aleación de Grado Industrial'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] border-b border-white/20 p-4 sm:p-6 hover:bg-white/5 transition-colors">
                  <span className="text-xs font-bold uppercase text-zinc-400 mb-2 sm:mb-0 flex items-center">
                    DIMENSIONES (LXWXH)
                  </span>
                  <span className="font-mono text-sm text-white">
                    {product.dimensions || 'N/A'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] p-4 sm:p-6 hover:bg-white/5 transition-colors">
                  <span className="text-xs font-bold uppercase text-zinc-400 mb-2 sm:mb-0 flex items-center">
                    PESO OPERATIVO
                  </span>
                  <span className="font-mono text-sm text-white">{product.weight || 'N/A'}</span>
                </div>
              </div>

              {/* Lista dinámica de SEO/Atributos */}
              <ul className="list-disc pl-5 space-y-4 text-sm text-zinc-300 marker:text-brand">
                {(() => {
                  try {
                    const specs = product.specifications
                      ? JSON.parse(product.specifications)
                      : null;
                    if (specs && typeof specs === 'object' && Object.keys(specs).length > 0) {
                      return Object.entries(specs).map(([key, value]) => (
                        <li key={key}>
                          <strong className="text-white capitalize">
                            {key.replace(/_/g, ' ')}:
                          </strong>{' '}
                          {Array.isArray(value) ? value.join(', ') : String(value)}
                        </li>
                      ));
                    }
                  } catch (e) {
                    // Fallback to text if not json
                    return (
                      <li>
                        <strong className="text-white">Detalles:</strong>{' '}
                        <span
                          className="block mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-3 [&_li]:marker:text-brand"
                          dangerouslySetInnerHTML={{ __html: product.specifications || '' }}
                        />
                      </li>
                    );
                  }

                  // Fallback hardcoded if no specs available
                  return (
                    <>
                      <li>
                        <strong className="text-white">Modelo:</strong>{' '}
                        {product.name.split(' ')[0] || 'GVP01M1'}
                      </li>
                      <li>
                        <strong className="text-white">Tipo de Herramienta:</strong> Grado
                        Industrial
                      </li>
                      <li>
                        <strong className="text-white">Plataforma:</strong> Alta Potencia
                      </li>
                      <li>
                        <strong className="text-white">Tipo de Motor:</strong> Eficiencia Maximizada
                      </li>
                    </>
                  );
                })()}
              </ul>
            </motion.div>
          )}

          {activeTab === 'RESEÑAS' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {mockReviewsData.reviews.map((review) => {
                const fullStars = Math.floor(review.numericRating);
                const hasHalf = review.numericRating - fullStars >= 0.4;
                return (
                  <div
                    key={review.id}
                    className="p-6 bg-[#080808] border border-white/5 flex flex-col gap-4 hover:border-brand/30 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-bold tracking-tight text-lg">
                          {review.name}
                        </h4>
                        <p className="text-xs font-mono text-zinc-500 uppercase mt-1">
                          {review.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-brand/10 px-3 py-1.5 rounded-sm border border-brand/20">
                        <div className="flex text-brand">
                          {[...Array(fullStars)].map((_, i) => (
                            <Star key={`f-${i}`} size={14} fill="currentColor" />
                          ))}
                          {hasHalf && <StarHalf size={14} fill="currentColor" />}
                          {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
                            <Star key={`e-${i}`} size={14} className="text-zinc-700" />
                          ))}
                        </div>
                        <span className="text-brand font-bold font-mono text-xs ml-1">
                          {review.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-zinc-400 font-light leading-relaxed">{review.text}</p>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
