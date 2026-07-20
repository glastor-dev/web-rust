'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowRight01Icon,
  ZapIcon,
  ToolsIcon,
  BatteryFullIcon,
  Shield01Icon,
} from 'hugeicons-react';

const CATEGORIES = [
  {
    id: 'herramientas-inalambricas',
    title: 'HERRAMIENTAS INALÁMBRICAS',
    description: 'Potencia brutal sin restricciones de cables.',
    icon: ToolsIcon,
    href: '/tienda/inalambricas',
    image: '/images/noise.svg',
  },
  {
    id: 'baterias-cargadores',
    title: 'BATERÍAS Y CARGADORES',
    description: 'Energía de litio extrema de larga duración.',
    icon: BatteryFullIcon,
    href: '/tienda/baterias',
    image: '/images/noise.svg',
  },
  {
    id: 'equipos-medicion',
    title: 'EQUIPOS DE MEDICIÓN',
    description: 'Precisión láser para entornos exigentes.',
    icon: ZapIcon,
    href: '/tienda/medicion',
    image: '/images/noise.svg',
  },
  {
    id: 'accesorios-pesados',
    title: 'ACCESORIOS PESADOS',
    description: 'Brocas, discos y puntas forjadas en acero.',
    icon: Shield01Icon,
    href: '/tienda/accesorios',
    image: '/images/noise.svg',
  },
];

export function TechCategories() {
  return (
    <section className="w-full bg-[#050505] py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              Equipamiento <br />
              <span className="text-brand">Profesional</span>
            </h2>
          </div>
          <Link
            href="/tienda"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            Ver catálogo completo
            <ArrowRight01Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative block bg-[#0a0a0a] border border-white/10 hover:border-brand/50 transition-colors duration-500 overflow-hidden cursor-pointer h-full"
            >
              {/* Image / Graphic Area (Top half) */}
              <div className="relative h-48 w-full bg-[#0f0f0f] flex items-center justify-center p-8 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10 mix-blend-overlay"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                {/* Techy background lines */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <cat.icon
                  className="w-20 h-20 text-zinc-800 group-hover:text-brand transition-colors duration-500 relative z-10 group-hover:scale-110"
                  strokeWidth={1}
                />
              </div>

              {/* Text Area (Bottom half) */}
              <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
                <div className="flex-grow">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-brand transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-zinc-500 text-sm font-sans leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5 group-hover:border-brand/20 transition-colors">
                  <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400">
                    Comprar
                  </span>
                  <ArrowRight01Icon className="w-5 h-5 text-zinc-600 group-hover:text-brand transition-transform duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
