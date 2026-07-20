'use client';

import { motion } from 'motion/react';
import { CheckmarkCircle01Icon } from 'hugeicons-react';

const guarantees = [
  {
    title: 'Código de Calidad',
    points: [
      'Tests automatizados (>80% cobertura)',
      'Documentación completa',
      'Code reviews rigurosos',
      'Sin dependencias innecesarias',
    ],
  },
  {
    title: 'Rendimiento Garantizado',
    points: [
      'Benchmarks antes y después',
      'Métricas de rendimiento contractuales',
      'Optimización continua incluida',
      'Si no cumple, lo arreglamos sin coste',
    ],
  },
  {
    title: 'Transparencia Total',
    points: [
      'Acceso completo al código desde el día uno',
      'Reporting semanal de progreso',
      'Sin sorpresas en facturación',
      'Comunicación directa con desarrolladores',
    ],
  },
  {
    title: 'Soporte Post-Lanzamiento',
    points: [
      '3 meses de soporte gratuito incluido',
      'Respuesta en <4 horas para problemas críticos',
      'Actualizaciones de seguridad críticas',
      'Documentación operativa completa',
    ],
  },
];

export function GuaranteesSection() {
  return (
    <section className="py-24 relative bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Garantías
          </div>
          <h2 className="text-fluid-h2 font-extrabold text-white leading-none">
            Nuestro Compromiso
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 md:p-10 border-editorial group hover:border-brand/30 transition-colors"
            >
              <h3 className="text-2xl font-extrabold tracking-tight text-white mb-6 border-b border-white/10 pb-4">
                {guarantee.title}
              </h3>

              <ul className="space-y-4">
                {guarantee.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start text-zinc-300">
                    <CheckmarkCircle01Icon className="w-5 h-5 text-brand mr-3 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
