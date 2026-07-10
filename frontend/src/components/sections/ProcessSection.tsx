import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const steps = [
  {
    num: '01',
    title: 'Análisis Técnico',
    duration: '1-2 semanas',
    description:
      'No empezamos a codificar sin entender tu problema. Analizamos a fondo tus necesidades técnicas y de negocio.',
    points: [
      'Reunión inicial para entender el problema',
      'Análisis de requisitos técnicos y de negocio',
      'Evaluación de infraestructura actual',
      'Identificación de riesgos y dependencias',
      'Propuesta técnica detallada',
    ],
    deliverable:
      'Documento técnico con arquitectura propuesta, timeline detallado y presupuesto cerrado.',
  },
  {
    num: '02',
    title: 'Diseño de Arquitectura',
    duration: '1-2 semanas',
    description:
      'Diseñamos sistemas que escalan desde el día uno, no arquitecturas que tendrás que reescribir en 6 meses.',
    points: [
      'Diseño detallado del sistema',
      'Selección de tecnologías y patrones',
      'Plan de escalabilidad y mantenimiento',
      'Prototipo de componentes críticos',
      'Definición de métricas de éxito',
    ],
    deliverable:
      'Diagramas de arquitectura, especificaciones técnicas, prototipo funcional y plan de testing.',
  },
  {
    num: '03',
    title: 'Desarrollo Iterativo',
    duration: '4-12 semanas',
    description:
      "Sprints de 1-2 semanas con entregas incrementales. No desaparecemos durante meses para volver con un 'producto terminado'.",
    points: [
      'Desarrollo por sprints de 1-2 semanas',
      'Entregas incrementales de funcionalidad',
      'Tests automatizados desde el día uno',
      'Benchmarks de rendimiento continuos',
      'Reuniones semanales de seguimiento',
      'Code reviews rigurosos',
    ],
    deliverable:
      'Código funcional, tests automatizados, documentación técnica, métricas de rendimiento y demos semanales.',
  },
  {
    num: '04',
    title: 'Despliegue y Optimización',
    duration: '1-2 semanas',
    description:
      'Producción con monitoreo desde el primer segundo. No cruzamos los dedos y esperamos, monitorizamos y optimizamos activamente.',
    points: [
      'Despliegue en producción',
      'Monitoreo intensivo inicial',
      'Optimización basada en métricas reales',
      'Ajustes de configuración',
      'Testing de carga y estrés',
      'Documentación de operaciones',
    ],
    deliverable:
      'Sistema en producción, dashboards de monitoreo, alertas configuradas, documentación operativa y runbooks.',
  },
  {
    num: '05',
    title: 'Soporte y Evolución',
    duration: 'Continuo',
    description:
      '3 meses de soporte gratuito incluidos. Después, si quieres seguir trabajando con nosotros, tenemos planes flexibles.',
    points: [
      'Monitoreo proactivo 24/7',
      'Actualizaciones de seguridad',
      'Optimización continua',
      'Soporte técnico prioritario',
      'Evolución del sistema según necesidades',
      'Informes mensuales de rendimiento',
    ],
    deliverable:
      'Informes mensuales, actualizaciones regulares, soporte dedicado y roadmap de evolución.',
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="py-24 relative bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-24 text-center">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Cómo trabajamos
          </div>
          <h2 className="text-fluid-h2 font-black uppercase text-white mb-6 leading-none">
            DE LA IDEA A PRODUCCIÓN
            <br />
            <span className="text-zinc-600">EN 5 PASOS.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light mt-6">
            No improvisamos. Seguimos un proceso probado en más de 150 proyectos para asegurar que
            tu sistema funcione desde el primer día.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          {/* Animated vertical line */}
          <div className="absolute left-[27px] md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div className="w-full bg-brand origin-top" style={{ height: lineHeight }} />
          </div>

          <div className="space-y-12 md:space-y-24 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-[#050505] border-2 border-zinc-800 flex items-center justify-center -ml-[0px] md:-ml-[28px] mt-2 md:mt-0 z-20 group transition-colors duration-300 hover:border-brand">
                    <span className="font-mono text-lg font-bold text-zinc-500 group-hover:text-brand transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* Content Box */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className={`ml-20 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'} pt-2`}
                  >
                    <div className="glass-panel p-8 border-editorial group hover:border-brand/30 transition-colors">
                      <div className="text-brand font-mono text-sm mb-4 uppercase tracking-widest border-b border-white/5 pb-2 inline-block">
                        Duración: {step.duration}
                      </div>
                      <h3 className="text-2xl font-black uppercase text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-zinc-400 mb-6">{step.description}</p>

                      <div className="mb-6">
                        <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                          Qué hacemos:
                        </h4>
                        <ul className="space-y-2">
                          {step.points.map((pt, i) => (
                            <li key={i} className="text-sm text-zinc-300 flex items-start">
                              <span className="text-brand mr-2 mt-0.5">-</span> {pt}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-brand/5 p-4 border-l-2 border-brand">
                        <h4 className="text-xs font-mono text-brand uppercase tracking-widest mb-1">
                          Entregable:
                        </h4>
                        <p className="text-sm text-zinc-300">{step.deliverable}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
