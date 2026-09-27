'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { ArrowRight01Icon } from 'hugeicons-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

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
        className="absolute inset-0 w-full h-[130%] top-[-15%] opacity-20 z-0 mix-blend-overlay grayscale"
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
        className="absolute w-100 h-100 bg-brand/10 blur-[120px] rounded-full pointer-events-none z-0"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Column - COMPRA CTA */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-brand text-xs font-bold uppercase tracking-widest">
              E-commerce B2B
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[5.5rem] leading-none font-black text-white uppercase tracking-tighter mb-5 flex flex-col items-center lg:items-start justify-center">
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

          <p className="text-zinc-400 text-sm md:text-base font-medium mb-8 max-w-xl leading-relaxed lg:mx-0 mx-auto">
            Stock asignado exclusivo, financiación para empresas y logística exprés en 24/48h.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <MagneticButton
              href="/tienda"
              as="a"
              className="relative inline-block bg-brand text-black font-black uppercase tracking-widest px-8 py-4 text-xs transition-colors border-2 border-brand hover:border-white hover:bg-white shadow-[0_0_20px_rgba(0,255,102,0.15)]"
            >
              COMPRAR AHORA
            </MagneticButton>
            <MagneticButton
              href="mailto:ventas@glastor.es?subject=Cotización%20de%20proyecto"
              as="a"
              className="inline-flex items-center gap-2 border-2 border-white/10 bg-white/5 backdrop-blur-sm text-white font-bold uppercase tracking-widest px-8 py-4 text-xs hover:border-white hover:bg-white hover:text-black transition-all duration-300 group"
            >
              Cotizar proyecto
              <ArrowRight01Icon className="w-4 h-4 text-brand group-hover:text-black opacity-70 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

          <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-[11px] font-mono text-zinc-400">
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

        {/* Right Column - ALQUILER PROXIMAMENTE */}
        <div className="flex flex-col justify-center lg:items-end w-full mt-12 lg:mt-0">
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl p-8 relative overflow-hidden group hover:border-brand/30 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(0,255,102,0.15)]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-linear-to-br from-brand/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand/20 blur-[80px] rounded-full group-hover:bg-brand/30 transition-colors duration-700 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('/images/noise.svg')" }} />
            
            <div className="relative z-10 flex flex-col gap-5 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-brand/30 bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,102,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse shadow-[0_0_8px_rgba(0,255,102,0.8)]" />
                <span className="text-brand text-[10px] font-bold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(0,255,102,0.5)]">Próximamente</span>
              </div>
              
              {/* Typography */}
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-[0.9] mt-2">
                Alquiler de<br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-300 to-zinc-600">Herramientas</span>
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed mt-1 font-medium group-hover:text-zinc-300 transition-colors duration-500">
                Estamos preparando un nuevo servicio para que puedas alquilar equipamiento Bramer, Daewoo, Bosch, etc por el tiempo exacto que tu proyecto demande, sin inversión inicial.
              </p>
              
              {/* Bottom Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-8 h-8 rounded-full border border-white/10 bg-black/60 backdrop-blur-md flex items-center justify-center relative overflow-hidden z-[${4-i}]`}>
                        <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[${i * 100}ms]" />
                        <span className="text-[9px] font-mono font-bold text-zinc-400 relative z-10">{`0${i}`}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-brand transition-colors duration-500">Catálogo en proceso</span>
                </div>
                
                <div className="w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:bg-brand group-hover:border-brand group-hover:text-black transition-all duration-500 transform group-hover:-rotate-45">
                  <ArrowRight01Icon className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
