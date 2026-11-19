'use client';

import { motion } from 'motion/react';
import {
  ArrowRight01Icon,
  ServerStack01Icon,
  DatabaseLightningIcon,
  RefreshIcon,
  Message01Icon,
  CodeIcon,
} from 'hugeicons-react';
import Link from 'next/link';

type TechFilter = 'todos' | 'rust' | 'docker' | 'kubernetes' | 'postgresql';

interface ServiceItem {
  icon: React.ReactNode;
  image?: string;
  title: string;
  description: string;
  features: string[];
  results: string[];
  tech: TechFilter;
  linkUrl: string;
  linkText: string;
}

export function RustServicesSection({ detailed = false }: { detailed?: boolean }) {
  const servicesData: ServiceItem[] = [
    {
      icon: <CodeIcon className="w-8 h-8 text-brand" />,
      title: 'Desarrollo Core en Rust',
      description:
        'Motores de cálculo, microservicios y runtimes distribuidos construidos sobre Tokio y Axum, con rendimiento determinista y seguridad de memoria garantizada.',
      features: [
        'APIs gRPC y REST ultra-rápidas con Tokio runtime & Axum',
        'Zero-cost abstractions y concurrencia segura con traits Send + Sync',
        'Sistemas en tiempo real con latencia p99 plana (sin pausas de GC)',
        'Binarios estáticos autónomos compilados sin dependencias externas',
      ],
      results: ['Latencia p99: 5-15ms', 'Throughput: 50.000+ req/s', 'Consumo RAM: 70-90% menor'],
      tech: 'rust',
      linkUrl: '/proyectos',
      linkText: 'Ver proyectos en Rust',
    },
    {
      icon: <ServerStack01Icon className="w-8 h-8 text-brand" />,
      title: 'Sistemas Distribuidos & Cloud',
      description:
        'Infraestructura determinística de alta concurrencia diseñada para escalar sin fatiga, con observabilidad OpenTelemetry y mTLS nativo.',
      features: [
        'Arquitecturas de microservicios con mTLS seguro (Rustls, sin OpenSSL)',
        'Contenedores distroless/scratch ultra-ligeros (< 25MB por servicio)',
        'Observabilidad estructurada con Tracing y métricas Prometheus',
        'Pipelines CI/CD deterministas con compilación LTO y target nativo',
      ],
      results: ['Uptime SLA: 99.99%', 'Imágenes Docker < 25MB', 'Reducción costos Cloud: 50-80%'],
      tech: 'docker',
      linkUrl: '/proyectos',
      linkText: 'Ver casos de infraestructura',
    },
    {
      icon: <DatabaseLightningIcon className="w-8 h-8 text-brand" />,
      title: 'Auditoría & Optimización de Rendimiento',
      description:
        'Eliminamos cuellos de botella en sistemas existentes mediante perfilado de bajo nivel, análisis de memoria y aceleración de hardware.',
      features: [
        'Perfilado con Linux perf, Flamegraphs y análisis de cache misses',
        'Eliminación de pausas de Garbage Collector (GC Jitter)',
        'Vectorización hardware SIMD (AVX-512 y ARM NEON)',
        'Zero-allocation hot-paths con estructuras alineadas a caché L1/L2',
      ],
      results: [
        'Reducción latencia p99: 80-95%',
        'Throughput aumentado: 5-50x',
        'Cero memory leaks',
      ],
      tech: 'postgresql',
      linkUrl: '/proyectos',
      linkText: 'Ver casos de optimización',
    },
    {
      icon: <RefreshIcon className="w-8 h-8 text-brand" />,
      title: 'Migración de Sistemas Legacy a Rust',
      description:
        'Reescritura quirúrgica de cuellos de botella en Node.js, Python o Java hacia Rust mediante el Strangler Pattern sin interrumpir la operación.',
      features: [
        'Estrategia Strangler Fig con Shadow Traffic y cero downtime',
        'Interoperabilidad FFI (C/C++, Python vía PyO3, Node vía N-API)',
        'Reemplazo modular de microservicios costosos por módulos en Rust',
        'Validación formal con property-based testing y fuzzing continuo',
      ],
      results: [
        'Cero downtime durante rollout',
        'Consolidación de clústeres a 1/5',
        'Sistemas deterministas y mantenibles',
      ],
      tech: 'rust',
      linkUrl: '/proyectos',
      linkText: 'Ver casos de migración',
    },
    {
      icon: <Message01Icon className="w-8 h-8 text-brand" />,
      title: 'Consultoría Técnica',
      description:
        'Asesoramiento experto para decisiones técnicas críticas y resolución de problemas complejos.',
      features: [
        'Revisión de arquitectura',
        'Selección de tecnologías',
        'Code reviews especializados',
        'Resolución de problemas complejos',
      ],
      results: ['Sesiones de 2-4 horas', 'Informes técnicos detallados', 'Plan de acción concreto'],
      tech: 'todos',
      linkUrl: '/proyectos',
      linkText: 'Ver casos de auditoría',
    },
  ];

  const resourceHref = (tech: TechFilter) =>
    tech === 'todos' ? '/recursos' : `/recursos?tech=${tech}`;

  return (
    <section className="py-24 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center md:text-left">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Qué hacemos
          </div>
          <h2 className="text-fluid-h2 font-extrabold text-white mb-6 leading-none">
            Especialistas en Rust
            <br />
            <span className="text-zinc-400">y Servidores.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-lg font-light mt-6">
            No hacemos de todo. Nos especializamos en lo que mejor sabemos hacer: construir sistemas
            críticos que funcionan bajo presión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              className={`glass-panel p-8 border-editorial flex flex-col h-full relative overflow-hidden ${
                !detailed
                  ? 'draw-border cursor-pointer group hover:bg-[#080808] transition-colors duration-300'
                  : 'group hover:bg-brand/5 hover:border-brand/30 transition-all duration-300'
              }`}
            >
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full grow">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-6 grow">{service.description}</p>

                {detailed && (
                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                        Qué incluye:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="text-sm text-zinc-300 flex items-start">
                            <span className="text-brand mr-2 mt-0.5">-</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                        Resultados típicos:
                      </h4>
                      <ul className="space-y-2">
                        {service.results.map((result, i) => (
                          <li key={i} className="text-sm text-brand flex items-start">
                            <span className="mr-2 mt-0.5 opacity-50">✓</span> {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {service.linkUrl && (
                  <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap items-center gap-x-6 gap-y-2">
                    {service.linkUrl.startsWith('http') ? (
                      <a
                        href={service.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-mono text-white group-hover:text-brand transition-colors"
                      >
                        {service.linkText}
                        <ArrowRight01Icon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <Link
                        href={service.linkUrl}
                        className="inline-flex items-center text-sm font-mono text-white group-hover:text-brand transition-colors"
                      >
                        {service.linkText}
                        <ArrowRight01Icon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                    <Link
                      href={resourceHref(service.tech)}
                      className="inline-flex items-center text-xs font-mono text-zinc-400 hover:text-brand transition-colors"
                    >
                      Ver recursos técnicos
                      <ArrowRight01Icon className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
