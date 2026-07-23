'use client';

import { useState, useLayoutEffect } from 'react';
import { Star, StarHalf, Truck, Heart, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { toast } from 'sonner';
import type { Product } from '@/components/ui/ProductCard';

import { ScrambleText } from '@/components/ui/ScrambleText';

interface ProductCheckoutProps {
  product: Product;
  sku: string;
  averageRating: number;
  fullStarsHeader: number;
  hasHalfHeader: boolean;
  totalCount: number;
  isOutOfStock: boolean;
  onNavigateToReviews: () => void;
}

export function ProductCheckout({
  product,
  sku,
  averageRating,
  fullStarsHeader,
  hasHalfHeader,
  totalCount,
  isOutOfStock,
  onNavigateToReviews,
}: ProductCheckoutProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  
  const { toggleItem: toggleWishlistItem, hasItem: hasWishlistItem } = useWishlistStore();
  const isWishlisted = product ? hasWishlistItem(product.id) : false;

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);
  const [shippingDate, setShippingDate] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<string>('');

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <span className="text-brand font-bold text-xs uppercase tracking-widest">
          GLASTOR ® DIRECTO
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
          onClick={onNavigateToReviews}
        >
          {totalCount} valoraciones
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
            <ScrambleText
              text={`$ ${product.price.toLocaleString('es-AR')}`}
              className="text-4xl sm:text-5xl font-black font-mono tracking-tighter"
              duration={1000}
              delay={300}
            />
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
            className="group relative overflow-hidden grow bg-[#050505] border border-brand transition-colors font-extrabold text-sm tracking-widest py-3.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-brand w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 text-brand group-hover:text-black transition-colors duration-300">
              AÑADIR AL CARRITO
            </span>
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
  );
}
