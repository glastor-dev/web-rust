'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

export interface StepItem {
  num: string;
  title: string;
  duration: string;
  description: string;
  points: string[];
  deliverable: string;
}

const steps: StepItem[] = [
  {
    num: '01',
    title: 'Discovery & Auditoría',
    duration: 'Semana 1',
    description:
      'Analizamos tu arquitectura actual, identificamos cuellos de botella y definimos los objetivos técnicos y de negocio.',
    points: [
      'Auditoría de código y arquitectura existente',
      'Perfilado de rendimiento y uso de memoria',
      'Definición de SLOs (Latencia p99, Throughput, Uptime)',
      'Diseño de arquitectura objetivo',
      'Estimación detallada y plan de migración',
    ],
    deliverable:
      'Documento de arquitectura con trade-offs, benchmarks iniciales y estimación cerrada.',
  },
  {
    num: '02',
    title: 'PoC & Benchmarking',
    duration: 'Semana 2-3',
    description:
      'Construimos una prueba de concepto del componente crítico y medimos el impacto real antes de comprometer el desarrollo completo.',
    points: [
      'Prototipo del módulo más crítico en Rust',
      'Pruebas de carga comparativas con el sistema actual',
      'Validación de throughput y consumo de recursos',
      'Demostración con datos reales (anonimizados)',
      'Decisión Go/No-Go con datos en mano',
    ],
    deliverable: 'Benchmark reproducible comparando el sistema actual vs la solución en Rust.',
  },
  {
    num: '03',
    title: 'Desarrollo Core',
    duration: 'Semana 4-8',
    description:
      'Implementación del sistema completo siguiendo las mejores prácticas de Rust: zero-cost abstractions, tipado fuerte y concurrencia segura.',
    points: [
      'Desarrollo modular con tests unitarios y de integración',
      'Integración continua con pipelines automatizados',
      'Fuzzing y property-based testing en áreas críticas',
      'Documentación técnica y OpenAPI/gRPC specs',
      'Revisiones de código semanales con tu equipo',
    ],
    deliverable:
      'Código fuente con >80% de cobertura de tests, binarios compilados y documentación.',
  },
  {
    num: '04',
    title: 'Migración & Despliegue',
    duration: 'Semana 9-10',
    description:
      'Estrategia de rollout progresivo sin downtime. Shadow traffic, canary deployments y rollback automatizado.',
    points: [
      'Configuración de infraestructura (Docker, K8s)',
      'Rollout progresivo con feature flags',
      'Shadow traffic para validar respuestas en producción',
      'Métricas en tiempo real (Prometheus/Grafana)',
      'Transferencia de conocimiento al equipo interno',
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
    <section ref={containerRef} className="pt-24 pb-12 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header estático normal */}
        <div className="mb-16 md:mb-24 text-center">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Cómo trabajamos
          </div>
          <h2 className="text-fluid-h2 font-extrabold text-white mb-6 leading-none">
            De la Idea a Producción
            <br />
            <span className="text-zinc-400">en 5 Pasos.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light mt-6">
            No improvisamos. Seguimos un proceso probado en más de 150 proyectos para asegurar que
            tu sistema funcione desde el primer día.
          </p>
        </div>

        {/* Contenedor de cartas apiladas */}
        <div className="relative w-full max-w-4xl mx-auto pb-6 md:pb-8">
          {steps.map((step, index) => {
            // El objetivo de escala: las primeras cartas se encogen un poco más que las últimas.
            const targetScale = 1 - (steps.length - index) * 0.05;

            // Calculamos en qué rango del scrollYProgress debería empezar a encogerse esta carta
            const rangeStart = index / steps.length;
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
  step: StepItem;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  isLast: boolean;
}

function Card({ index, step, progress, range, targetScale, isLast }: CardProps) {
  // Animamos la escala en desktop para el efecto apilado
  const scale = useTransform(progress, range, [1, isLast ? 1 : targetScale]);

  // Overlay oscuro solo para el efecto de profundidad en desktop
  const overlayOpacity = useTransform(progress, range, [0, isLast ? 0 : 0.7]);

  return (
    <div
      className={`flex items-start justify-center w-full mb-6 ${isLast ? 'md:mb-0' : 'md:mb-[30vh]'} md:sticky`}
      style={{
        top: `calc(15vh + ${index * 35}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full border border-white/10 hover:border-brand/30 bg-[#0a0a0a] p-6 md:p-12 shadow-2xl origin-top"
      >
        {/* Overlay para oscurecer la carta sin hacerla transparente (solo en desktop) */}
        <motion.div
          className="hidden md:block absolute inset-0 bg-black pointer-events-none z-0"
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
