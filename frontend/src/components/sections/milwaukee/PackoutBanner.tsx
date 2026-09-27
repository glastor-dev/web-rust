'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { PlayIcon, Cancel01Icon } from 'hugeicons-react';
import { TextRevealGSAP } from '@/components/ui/TextRevealGSAP';

export function PackoutBanner() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section
      ref={containerRef}
      className="w-full relative min-h-[500px] md:min-h-[560px] bg-black overflow-hidden flex items-center"
    >
      {/* Dynamic Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center opacity-80"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto/v1784804585/separador2_mfqk7f.webp')",
          y: backgroundY,
        }}
      />
      <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-gradient-to-r from-black via-black/90 to-transparent z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full py-12">
        <AnimatePresence mode="wait">
          {!isVideoOpen ? (
            <motion.div
              key="content"
              className="max-w-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-brand font-mono text-xs uppercase tracking-widest font-bold">
                  Bundle recomendado
                </span>
              </div>

              <TextRevealGSAP 
                asH1={false}
                lines={[
                  <span key="1">
                    PACK
                    <span className="text-brand">
                      OUT<sup className="text-[0.45em] -ml-1">&trade;</sup>
                    </span>
                  </span>
                ]}
                className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2 italic"
              />
              <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm mb-5">
                Sistema de almacenamiento modular
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="border border-white/10 bg-black/40 px-4 py-3">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    Precio pack
                  </div>
                  <div className="text-white font-black text-lg">$433.500</div>
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
            </motion.div>
          ) : (
            <motion.div
              key="video"
              className="w-full max-w-4xl aspect-video bg-black shadow-2xl relative border border-white/20 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 bg-black/80 text-white hover:text-brand px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 backdrop-blur-md border border-white/10"
              >
                <Cancel01Icon className="w-4 h-4" />
                Cerrar Video
              </button>
              <video
                className="w-full h-full object-contain bg-black relative z-10"
                autoPlay
                controls
                playsInline
              >
                <source src="https://res.cloudinary.com/dzualplqi/video/upload/v1785162139/YTDown.com_YouTube_MILWAUKEE-PACKOUT-Storage-System_Media_b42FYK98E50_001_1080p_q5csge.mp4" type="video/mp4" />
              </video>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
