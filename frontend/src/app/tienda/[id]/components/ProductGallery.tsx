'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import type { Product } from '@/components/ui/ProductCard';

interface ProductGalleryProps {
  product: Product;
  gallery: string[];
}

export function ProductGallery({ product, gallery }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<number>(0);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 150]);

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen Principal */}
      <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square bg-[#080808] border border-white/5 rounded-xl flex items-center justify-center p-8 overflow-hidden group cursor-crosshair">
        <motion.div style={{ y: parallaxY }} className="w-full h-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 w-full h-full"
            >
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
          </AnimatePresence>
        </motion.div>
        <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur border border-white/10 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm z-10">
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
                  ? 'border-brand shadow-[0_0_15px_rgba(0,255,102,0.1)] scale-95'
                  : 'border-white/5 hover:border-white/20 hover:scale-105'
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
  );
}
