'use client';

import { motion } from 'motion/react';
import { AnimatedCounter } from '../../ui/AnimatedCounter';

const metrics = [
  { value: 150, suffix: '+', label: 'Proyectos Completados', desc: 'sistemas en producción' },
  {
    value: 99.97,
    suffix: '%',
    decimals: 2,
    label: 'Uptime Promedio',
    desc: 'en todos los sistemas gestionados',
  },
  {
    value: 85,
    suffix: '%',
    label: 'Reducción de Latencia',
    desc: 'de media en proyectos de optimización',
  },
  {
    value: 60,
    suffix: '%',
    label: 'Ahorro en Infraestructura',
    desc: 'de reducción de costos promedio',
  },
  { value: 15, suffix: '', label: 'Años de Experiencia', desc: 'construyendo software crítico' },
  { value: 40, suffix: '+', label: 'Clientes Activos', desc: 'empresas confían en nosotros' },
];

export function GlobalMetricsSection() {
  return (
    <section className="py-24 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Métricas Globales
          </div>
          <h2 className="text-fluid-h2 font-extrabold text-white leading-none">
            Números que Hablan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className="text-6xl md:text-7xl font-black text-white group-hover:text-brand transition-colors duration-500 mb-4 font-mono tracking-tighter">
                <AnimatedCounter
                  from={0}
                  to={metric.value}
                  duration={2}
                  decimals={metric.decimals || 0}
                />
                <span className="text-brand">{metric.suffix}</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
                {metric.label}
              </h3>
              <p className="text-zinc-400 text-sm">{metric.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
