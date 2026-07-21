'use client';

import { motion } from 'motion/react';
import { Button } from '../../reutilizables/button';
import { ArrowRightIcon } from 'lucide-react';
import { COMPANY_STATS } from '@/lib/constants/aboutData';

export function CompanyStatsHero() {
  return (
    <section className="relative w-full min-h-150 flex flex-col justify-center overflow-hidden bg-[#050505]">
      {/* Subtle Background Layer / Filter */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(0, 255, 102, 0.03) 0%, transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
          backgroundPosition: 'center center',
        }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start lg:items-center">
          {/* Columna Izquierda: Texto y CTA */}
          <div className="flex flex-col items-start">
            <div className="bg-brand text-black font-mono text-[10px] font-bold tracking-widest px-3 py-1 mb-8 rounded-sm inline-block">
              Sobre Nosotros
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight leading-[0.85] mb-8 text-white">
              Somos <br />
              <span className="text-brand">Glastor®</span>
            </h1>

            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-6 font-medium max-w-xl">
              Desarrollador apasionado por <strong>Rust, Python y el diseño creativo</strong>. Desde
              2010 construyendo tecnología avanzada y contenido con un enfoque en la excelencia
              visual y técnica.
            </p>

            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-10 max-w-xl">
              Operamos con una base centralizada desde España, ofreciendo capacidades técnicas
              excepcionales respaldadas por los mejores estándares de la industria.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-brand hover:bg-brand/90 text-black font-bold tracking-widest text-xs h-12 px-8 rounded-sm"
                asChild
              >
                <a href="#contacto">Contactar</a>
              </Button>

              <a
                href="mailto:ventas@glastor.es"
                className="h-12 px-8 flex items-center justify-center gap-2 border border-white/10 hover:border-brand/50 text-zinc-400 hover:text-brand font-mono text-xs tracking-widest transition-colors rounded-sm"
              >
                ventas@glastor.es <ArrowRightIcon size={14} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:mt-16">
            {COMPANY_STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className={`border p-8 rounded-xl flex flex-col justify-center min-h-40 transition-colors ${
                  stat.highlight
                    ? 'border-brand/20 bg-brand/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <span
                  className={`text-5xl font-black tracking-tighter mb-2 ${
                    stat.highlight ? 'text-brand' : 'text-white'
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-zinc-400 font-mono text-[10px] tracking-widest font-bold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
