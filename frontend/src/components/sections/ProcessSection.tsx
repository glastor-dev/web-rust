'use client';

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
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header estático normal */}
        <div className="mb-16 md:mb-24 text-center">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Cómo trabajamos
          </div>
          <h2 className="text-fluid-h2 font-extrabold text-white mb-6 leading-none">
            De la Idea a Producción
            <br />
            <span className="text-zinc-600">en 5 Pasos.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light mt-6">
            No improvisamos. Seguimos un proceso probado en más de 150 proyectos para asegurar que
            tu sistema funcione desde el primer día.
          </p>
        </div>

        {/* Añadimos un padding-bottom alto para que el usuario tenga espacio para scrollear la última carta y verla apilada */}
        <div className="relative w-full max-w-4xl mx-auto pb-[20vh]">
          {steps.map((step, index) => {
            // El objetivo de escala: las primeras cartas se encogen un poco más que las últimas.
            const targetScale = 1 - (steps.length - index) * 0.05;
            
            // Calculamos en qué rango del scrollYProgress debería empezar a encogerse esta carta
            // Usamos una interpolación aproximada basada en el índice.
            const rangeStart = index / steps.length;
            const rangeEnd = rangeStart + 1 / steps.length;
            const isLast = index === steps.length - 1;
            
            return (
              <Card
                key={index}
                index={index}
                step={step}
                progress={scrollYProgress}
                range={[rangeStart, 1]}
                targetScale={targetScale}
                isLast={isLast}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface CardProps {
  index: number;
  step: typeof steps[0];
  progress: any;
  range: number[];
  targetScale: number;
  isLast: boolean;
}

function Card({ index, step, progress, range, targetScale, isLast }: CardProps) {
  // Animamos la escala a medida que el usuario sigue bajando
  // La última carta no debe encogerse
  const scale = useTransform(progress, range, [1, isLast ? 1 : targetScale]);
  
  // En lugar de hacer toda la carta transparente (lo que revela las cartas de atrás),
  // animamos un overlay negro para dar el efecto de profundidad/sombra sin perder opacidad.
  // La última carta no debe oscurecerse
  const overlayOpacity = useTransform(progress, range, [0, isLast ? 0 : 0.7]);

  return (
    <div
      className="sticky flex items-start justify-center w-full"
      style={{
        // Aquí está la magia principal: Cada carta se frena en un top diferente 
        // para dejar ver el borde de la carta anterior.
        top: `calc(15vh + ${index * 35}px)`,
        // Solo añadimos margen a las cartas que no son la última, para no generar un padding gigante al final.
        marginBottom: isLast ? '0' : '50vh',
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full border border-white/10 hover:border-brand/30 bg-[#0a0a0a] p-8 md:p-12 shadow-2xl origin-top"
      >
        {/* Overlay para oscurecer la carta sin hacerla transparente */}
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none z-0"
          style={{ opacity: overlayOpacity }}
        />
        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Columna Izquierda (Número y Título) */}
          <div className="md:w-1/3 shrink-0">
            <div className="text-brand font-mono text-sm mb-4 uppercase tracking-widest border-b border-white/5 pb-2 inline-block">
              Fase {step.num}
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              {step.title}
            </h3>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              Duración estimada:
              <br />
              <span className="text-zinc-300">{step.duration}</span>
            </p>
          </div>

          {/* Columna Derecha (Contenido) */}
          <div className="md:w-2/3 flex flex-col justify-center">
            <p className="text-zinc-400 mb-8 text-lg font-light leading-relaxed">
              {step.description}
            </p>

            <div className="mb-8">
              <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                Puntos Clave:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {step.points.map((pt, i) => (
                  <li key={i} className="text-sm text-zinc-300 flex items-start">
                    <span className="text-brand mr-2 mt-0.5">▹</span> {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-brand/5 p-5 border-l-2 border-brand/50">
              <h4 className="text-xs font-mono text-brand uppercase tracking-widest mb-2">
                Output / Entregable:
              </h4>
              <p className="text-sm text-zinc-300">{step.deliverable}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
