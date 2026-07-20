'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { ArrowRight01Icon } from 'hugeicons-react';

export function DealerBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section
      ref={containerRef}
      className="w-full relative h-auto bg-black overflow-hidden flex flex-col items-center justify-center py-16 md:py-20 px-6 border-y border-white/5"
    >
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%] opacity-20 z-0 mix-blend-overlay grayscale"
        style={{
          y: backgroundY,
        }}
      >
        <Image src="/images/hero23.webp" alt="Background" fill className="object-cover object-center" />
      </motion.div>
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay z-10 pointer-events-none"
        style={{ backgroundImage: "url('/images/noise.svg')" }}
      />

      {/* Glowing Orb */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[400px] h-[400px] bg-brand/10 blur-[120px] rounded-full pointer-events-none z-0"
      />

      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          <span className="text-brand text-xs font-bold uppercase tracking-widest">
            E-commerce B2B
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-[5.5rem] leading-none font-black text-white uppercase tracking-tighter mb-5 flex flex-col items-center justify-center">
          <span className="opacity-90">COMPRA</span>
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-brand/70 drop-shadow-[0_0_20px_rgba(0,255,102,0.3)] pb-2 pr-4">
              GLASTOR
            </span>
            <span className="absolute top-2 right-0 text-[0.35em] text-brand opacity-80">
              &reg;
            </span>
          </span>
        </h2>

        <p className="text-zinc-400 text-sm md:text-base font-medium mb-8 max-w-2xl leading-relaxed">
          Stock asignado exclusivo, financiación para empresas y logística exprés en 24/48h.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-brand blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <Link
              href="/tienda"
              className="relative inline-block bg-brand text-black font-black uppercase tracking-widest px-8 py-4 text-xs transition-colors border-2 border-brand hover:border-white hover:bg-white shadow-[0_0_20px_rgba(0,255,102,0.15)]"
            >
              COMPRAR AHORA
            </Link>
          </motion.div>
          <a
            href="mailto:ventas@glastor.es?subject=Cotización%20de%20proyecto"
            className="inline-flex items-center gap-2 border-2 border-white/10 bg-white/5 backdrop-blur-sm text-white font-bold uppercase tracking-widest px-8 py-4 text-xs hover:border-white hover:bg-white hover:text-black transition-all duration-300 group"
          >
            Cotizar proyecto
            <ArrowRight01Icon className="w-4 h-4 text-brand group-hover:text-black opacity-70 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-8 flex items-center gap-4 text-[11px] font-mono text-zinc-400">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Garantía oficial
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Stock controlado
          </span>
        </div>
      </div>
    </section>
  );
}
