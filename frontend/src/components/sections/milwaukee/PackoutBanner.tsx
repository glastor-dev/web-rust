'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { PlayIcon } from 'hugeicons-react';

export function PackoutBanner() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <>
      <section
        ref={containerRef}
        className="w-full relative min-h-[460px] md:min-h-[520px] bg-black overflow-hidden flex items-center"
      >
        <motion.div
          className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dzualplqi/image/upload/v1784804585/separador2_mfqk7f.webp')",
            y: backgroundY,
          }}
        />
        <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-linear-to-r from-black via-black/90 to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span className="text-brand font-mono text-xs uppercase tracking-widest font-bold">
                Bundle recomendado
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2 italic">
              PACK
              <span className="text-brand">
                OUT<sup className="text-[0.45em] -ml-1">&trade;</sup>
              </span>
            </h2>
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm mb-5">
              Sistema de almacenamiento modular
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="border border-white/10 bg-black/40 px-4 py-3">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Precio pack
                </div>
                <div className="text-white font-black text-lg">USD 289</div>
              </div>
              <div className="border border-white/10 bg-black/40 px-4 py-3">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Ahorro
                </div>
                <div className="text-brand font-black text-lg">-18%</div>
              </div>
              <div className="border border-white/10 bg-black/40 px-4 py-3">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Despacho
                </div>
                <div className="text-white font-black text-lg">24h hábiles</div>
              </div>
            </div>

            <p className="text-zinc-300 text-base mb-8 max-w-md">
              El sistema de almacenamiento modular más versátil y duradero. Armá tu combo igual que
              en obra y reducí costos de equipo.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/tienda/modular"
                className="inline-block bg-brand text-black font-black uppercase tracking-widest px-8 py-4 text-sm hover:bg-white hover:text-black transition-colors"
              >
                Ver Sistema
              </a>
              <Link
                href="/cotizar"
                className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-bold uppercase tracking-widest px-8 py-4 text-sm hover:border-brand hover:text-brand transition-colors"
              >
                Cotizar bundle
              </Link>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center justify-center gap-2 border-2 border-brand text-brand font-bold uppercase tracking-widest px-6 py-4 text-sm hover:bg-brand hover:text-black transition-colors group"
              >
                <PlayIcon
                  className="w-4 h-4 text-brand group-hover:text-black transition-colors"
                  variant="solid"
                />
                Ver Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
          >
            {/* Close overlay area */}
            <div
              className="absolute inset-0 bg-black/95 cursor-pointer"
              onClick={() => setIsVideoOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-black border border-white/10 z-10 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-brand font-mono text-sm uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                Cerrar [X]
              </button>
              <div className="w-full h-full overflow-hidden relative">
                <iframe
                  className="w-full h-full pointer-events-none scale-[1.25] translate-y-2"
                  src="https://www.youtube.com/embed/b42FYK98E50?autoplay=1&rel=0&modestbranding=1&controls=0&end=58&disablekb=1&loop=1&playlist=b42FYK98E50"
                  title="Milwaukee PACKOUT Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
