'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight01Icon, ChartHistogramIcon, Rocket01Icon, UserGroupIcon } from 'hugeicons-react';

const teasers = [
  {
    title: 'Casos de Éxito',
    description: 'Conoce cómo reducimos latencias en un 90% y optimizamos la infraestructura de nuestros clientes B2B.',
    href: '/proyectos',
    icon: <Rocket01Icon className="w-8 h-8 text-brand mb-6" />,
    delay: 0.1,
  },
  {
    title: 'Métricas y Servicios',
    description: 'Arquitecturas en Rust, migraciones seguras y servidores de ultra-alto rendimiento. Descubre nuestros benchmarks.',
    href: '/servicios',
    icon: <ChartHistogramIcon className="w-8 h-8 text-brand mb-6" />,
    delay: 0.2,
  },
  {
    title: 'Nuestra Filosofía',
    description: 'Construimos sistemas críticos que escalan. Conoce a los ingenieros detrás del ecosistema Glastor.',
    href: '/nosotros',
    icon: <UserGroupIcon className="w-8 h-8 text-brand mb-6" />,
    delay: 0.3,
  },
];

export function NavigationTeasersGrid() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teasers.map((teaser, idx) => (
          <Link key={idx} href={teaser.href} className="group block h-full">
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(10% 0 10% 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: teaser.delay, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="glass-panel p-8 md:p-10 border-editorial h-full flex flex-col bg-[#050505] hover:bg-[#080808] transition-colors duration-500 relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-10" />
              
              <div className="relative z-10 flex-grow flex flex-col">
                {teaser.icon}
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-brand transition-colors duration-300">
                  {teaser.title}
                </h3>
                <p className="text-zinc-400 font-light leading-relaxed mb-8 flex-grow">
                  {teaser.description}
                </p>
                <div className="mt-auto flex items-center text-sm font-mono text-zinc-500 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                  Explorar
                  <ArrowRight01Icon className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300 text-brand" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
