'use client';

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    title: 'Experiencia real, no teoría',
    description:
      'Desde 2010 hemos visto de todo: sistemas que colapsan, migraciones desastrosas, costos que se disparan. Hemos aprendido qué funciona y qué no en el mundo real.',
    points: [
      '15 años resolviendo problemas técnicos complejos',
      '150+ proyectos en producción',
      'Sistemas que procesan millones de operaciones diarias',
      'Clientes que llevan años con nosotros',
    ],
  },
  {
    title: 'Especialización, no generalización',
    description:
      'No hacemos diseño web, ni apps móviles, ni marketing digital. Nos especializamos en Rust y servidores porque creemos que es mejor hacer pocas cosas muy bien que muchas mediocres.',
    points: [
      'Expertos en Rust, no aprendices',
      'Foco en backend y sistemas distribuidos',
      'Conocimiento profundo de rendimiento y escalabilidad',
      'Stack técnico optimizado y probado',
    ],
  },
  {
    title: 'Transparencia total',
    description:
      "No hay sorpresas. No hay letras pequeñas. No hay 'te llamamos la próxima semana' para evitar dar respuestas.",
    points: [
      'Acceso completo al código desde el día uno',
      'Comunicación directa con ingenieros, no comerciales',
      'Reporting semanal de progreso',
      'Facturación clara y sin sorpresas',
      'Si no podemos ayudarte, te lo decimos',
    ],
  },
  {
    title: 'Resultados medibles',
    description:
      "No prometemos 'más rápido' o 'mejor rendimiento'. Demostramos con datos concretos antes, durante y después del proyecto.",
    points: [
      'Benchmarks de rendimiento contractuales',
      'Métricas de latencia, throughput y costos',
      'Monitoreo en tiempo real desde el primer día',
      'Informes mensuales de rendimiento',
      'Si no cumple, lo arreglamos sin coste',
    ],
  },
  {
    title: 'Compromiso a largo plazo',
    description:
      'No desaparecemos después del lanzamiento. Tu sistema es crítico para tu negocio, y nosotros nos aseguramos de que siga funcionando.',
    points: [
      '3 meses de soporte gratuito post-lanzamiento',
      'Actualizaciones de seguridad críticas',
      'Soporte técnico prioritario',
      'Evolución del sistema según necesidades',
      'Contrato flexible, sin atarte',
    ],
  },
  {
    title: 'Marca registrada y profesionalidad',
    description:
      'En 2025 registramos Glastor como marca en el INPI. No somos aficionados, somos profesionales comprometidos con la excelencia.',
    points: [
      'Marca registrada INPI 2025',
      'Empresa establecida desde 2010',
      'Sede en Girona desde 2023',
      'Equipo técnico dedicado',
      'Metodología probada y documentada',
    ],
  },
];

export function WhyGlastorSection() {
  return (
    <section className="py-24 relative bg-[#080808] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Por qué Glastor
          </div>
          <h2 className="text-fluid-h2 font-extrabold text-white mb-6 leading-none">
            15 Años Construyendo
            <br />
            <span className="text-zinc-600">Software que Funciona.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light mt-6">
            No somos una startup de moda. Somos un equipo con trayectoria real, construyendo
            sistemas críticos desde 2010.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">
                {reason.title}
              </h3>
              <p className="text-zinc-400 mb-6 font-light">{reason.description}</p>
              <ul className="space-y-3">
                {reason.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start text-sm text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-brand mr-3 flex-shrink-0 mt-0.5" />
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
