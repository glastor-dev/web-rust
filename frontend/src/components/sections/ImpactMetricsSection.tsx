'use client';

import { motion } from 'motion/react';
import { AnimatedCounter } from '../ui/AnimatedCounter';

import { TextRevealGSAP } from '../ui/TextRevealGSAP';

const metrics = [
  { label: 'MENOS LATENCIA', value: 85, prefix: '', suffix: '%', decimals: 0 },
  { label: 'AHORRO COSTOS INFRA', value: 60, prefix: '', suffix: '%', decimals: 0 },
  { label: 'UPTIME PROMEDIO', value: 99.97, prefix: '', suffix: '%', decimals: 2 },
  { label: 'AÑOS DE EXPERIENCIA', value: 15, prefix: '', suffix: '', decimals: 0 },
];

export function ImpactMetricsSection() {
  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 text-center md:text-left">
          <TextRevealGSAP
            lines={[
              'Resultados Medibles,',
              <span key="sub" className="text-zinc-600">
                No Promesas.
              </span>,
            ]}
            className="text-fluid-h2 font-extrabold text-white mb-4 leading-none"
            start="top 85%"
          />
          <p className="text-zinc-400 max-w-2xl text-lg font-light mt-6">
            Cada proyecto se mide. Cada mejora se demuestra. Estos son los promedios que hemos
            conseguido en los últimos 15 años.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="glass-panel p-8 flex flex-col items-center text-center justify-center border-editorial hover:border-brand/50 transition-colors duration-300"
            >
              <div className="text-5xl font-black text-brand mb-2 font-display">
                <AnimatedCounter
                  from={0}
                  to={m.value}
                  duration={2}
                  suffix={m.suffix}
                  prefix={m.prefix}
                  decimals={m.decimals}
                />
              </div>
              <div className="text-sm tracking-widest text-zinc-400 font-mono uppercase mt-2">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
