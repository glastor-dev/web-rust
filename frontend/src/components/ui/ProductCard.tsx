'use client';

import { motion } from 'motion/react';
import { ArrowRight01Icon, PlusSignIcon, MinusSignIcon, Loading02Icon, Tick01Icon, ShoppingCart01Icon } from 'hugeicons-react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { useCartStore } from '../../store/cartStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagneticButton } from './MagneticButton';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  stock: number;
  material?: string;
  dimensions?: string;
  weight?: string;
  seo?: any;
  leadTime?: string;
  minOrder?: number;
  cert?: string[];
  about_model?: string;
  features?: string;
  specifications?: string;
}

export function ProductCard({
  product,
  viewMode = 'grid',
}: {
  product: Product;
  viewMode?: 'grid' | 'list';
}) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handlePrefetch = () => {
    router.prefetch(`/tienda/${product.id}`);
  };

  const [quantity, setQuantity] = useState(1);
  const [_isHovered, setIsHovered] = useState(false);
  const [addState, setAddState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock > 0 && addState === 'idle') {
      setAddState('loading');

      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }

      // Simulate network request for premium tactile feedback
      await new Promise((resolve) => setTimeout(resolve, 400));

      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });

      setAddState('success');
      toast.success(`${quantity}x ${product.name} añadido al carrito`, {
        description: 'Inventario B2B reservado.',
        style: { background: '#050505', border: '1px solid rgba(0, 255, 102, 0.3)', color: '#fff' },
      });

      // openDrawer(); // Disabled automatic drawer opening for better B2B bulk buying flow

      setTimeout(() => {
        setAddState('idle');
        setQuantity(1);
      }, 2000);
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
        className="group relative flex items-center bg-[#080808] border border-white/5 hover:border-brand/30 transition-colors p-4 gap-6"
      >
        <Link
          href={`/tienda/${product.id}`}
          onMouseEnter={handlePrefetch}
          className="relative w-24 h-24 shrink-0 bg-[#030303] flex items-center justify-center p-2 rounded-md overflow-hidden group"
        >
          <Image
            src={product.image || '/images/default-tool.png'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 p-2"
          />
        </Link>

        <div className="grow min-w-0">
          <Link
            href={`/tienda?brand=${encodeURIComponent(product.category)}`}
            className="inline-block px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2 hover:bg-brand/10 hover:text-brand hover:border-brand/20 transition-colors rounded-sm"
          >
            {product.category}
          </Link>
          <Link href={`/tienda/${product.id}`} onMouseEnter={handlePrefetch} className="hover:text-brand transition-colors">
            <h3 className="text-lg font-bold text-white tracking-tight truncate">{product.name}</h3>
          </Link>
          <p className="text-sm text-zinc-400 font-mono mt-1">
            SKU: {product.id.split('-')[0].toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col shrink-0 items-end min-w-30">
          <span className="text-[10px] font-mono text-zinc-400">PRECIO</span>
          <span className="text-xl font-bold text-brand font-mono">
            ${product.price?.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0 border-l border-white/10 pl-6 ml-2">
          {product.stock > 0 ? (
            <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-md h-10 px-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:text-brand transition-colors text-zinc-400"
              >
                <MinusSignIcon size={14} />
              </button>
              <span className="font-mono text-sm w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-1 hover:text-brand transition-colors text-zinc-400"
              >
                <PlusSignIcon size={14} />
              </button>
            </div>
          ) : (
            <span className="text-red-500 text-xs font-mono tracking-widest px-4">AGOTADO</span>
          )}

          <MagneticButton>
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || addState !== 'idle'}
              className={`h-10 px-6 font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-30 ${
                addState === 'success' ? 'bg-white text-black' : 'bg-brand text-black hover:bg-white'
              }`}
            >
              {addState === 'loading' ? (
                <Loading02Icon className="w-4 h-4 animate-spin" />
              ) : addState === 'success' ? (
                <Tick01Icon className="w-4 h-4" />
              ) : (
                <span className="uppercase tracking-widest text-[10px]">Añadir al carrito</span>
              )}
            </button>
          </MagneticButton>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#080808] border border-white/5 hover:border-brand/30 transition-colors"
    >
      <Link
        href={`/tienda/${product.id}`}
        onMouseEnter={handlePrefetch}
        className="relative aspect-square overflow-hidden bg-[#030303] flex items-center justify-center p-4 sm:p-8"
      >
        <Image
          src={product.image || '/images/default-tool.png'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-contain p-4 sm:p-8 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {product.stock <= 0 && (
          <div className="absolute top-4 right-4 bg-red-500/20 text-red-500 text-[10px] font-mono px-2 py-1 uppercase tracking-widest backdrop-blur-md">
            Agotado
          </div>
        )}
      </Link>

      <div className="p-4 sm:p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-4 grow">
          <div>
            <Link
              href={`/tienda?brand=${encodeURIComponent(product.category)}`}
              className="inline-block px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2 hover:bg-brand/10 hover:text-brand hover:border-brand/20 transition-colors rounded-sm"
            >
              {product.category}
            </Link>
            <Link href={`/tienda/${product.id}`} onMouseEnter={handlePrefetch}>
              <h3 className="text-sm sm:text-lg font-bold text-white tracking-tight leading-tight line-clamp-3 hover:text-brand transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        <div className="mt-auto border-t border-white/10 relative overflow-hidden h-16">
          {/* Capa Base (Precio y Flecha) */}
          <div className="absolute inset-0 flex items-center justify-between transition-transform duration-300 transform group-hover:-translate-y-full">
            <div className="flex flex-col justify-center">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400">PRECIO B2B</span>
              <span className="text-base sm:text-xl font-bold text-brand font-mono">
                ${product.price?.toLocaleString()}
              </span>
            </div>
            <Link
              href={`/tienda/${product.id}`}
              className="w-10 h-10 flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition-colors rounded-sm"
            >
              <ArrowRight01Icon className="w-4 h-4" />
            </Link>
          </div>

          {/* Capa Hover (Controles de Carrito) */}
          <div className="absolute inset-0 flex items-center justify-between transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
            {product.stock > 0 ? (
              <div className="flex items-center w-full gap-2 pt-1">
                <div className="flex items-center bg-black/40 border border-white/10 rounded-sm h-10 px-1 flex-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                    className="p-2 hover:text-brand transition-colors text-zinc-400"
                  >
                    <MinusSignIcon size={14} />
                  </button>
                  <span className="font-mono text-sm flex-1 text-center">{quantity}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuantity(Math.min(product.stock, quantity + 1));
                    }}
                    className="p-2 hover:text-brand transition-colors text-zinc-400"
                  >
                    <PlusSignIcon size={14} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0 || addState !== 'idle'}
                  className={`h-10 px-2 sm:px-4 font-bold text-[10px] sm:text-xs transition-colors flex items-center justify-center rounded-sm shrink-0 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${
                    addState === 'success'
                      ? 'bg-white text-black'
                      : 'bg-brand text-black hover:bg-white'
                  }`}
                >
                  {addState === 'loading' ? (
                    <Loading02Icon className="w-4 h-4 animate-spin" />
                  ) : addState === 'success' ? (
                    <span className="flex items-center justify-center">
                      <Tick01Icon className="w-4 h-4" />
                    </span>
                  ) : (
                    <ShoppingCart01Icon className="w-4 h-4" />
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full pt-1">
                <span className="text-red-500 font-mono text-xs tracking-widest bg-red-500/10 px-4 py-2 rounded-sm w-full text-center">
                  SIN STOCK
                </span>
              </div>
            )}
          </div>
        </div>
        {((product.stock <= 5 && product.stock > 0) ||
          product.leadTime ||
          product.minOrder ||
          (product.cert && product.cert.length)) && (
          <div className="px-4 pb-4 sm:px-6 sm:pb-6 flex flex-wrap gap-2">
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 border border-red-500/20 bg-red-500/5 px-2 py-1">
                Bajo stock
              </span>
            )}
            {product.leadTime && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 border border-white/10 bg-white/5 px-2 py-1">
                Entrega: {product.leadTime}
              </span>
            )}
            {product.minOrder && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 border border-white/10 bg-white/5 px-2 py-1">
                Min: {product.minOrder} und
              </span>
            )}
            {product.cert && product.cert.length > 0 && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand border border-brand/20 bg-brand/5 px-2 py-1">
                {product.cert[0]}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
