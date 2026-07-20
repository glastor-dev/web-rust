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

type TechFilter = 'todos' | 'rust' | 'docker' | 'oxc' | 'mongodb';

interface ServiceItem {
  icon: React.ReactNode;
  image: string;
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
      image: '/images/especialista1.webp',
      title: 'Desarrollo en Rust',
      description:
        'APIs, microservicios y aplicaciones de alto rendimiento construidas desde cero o migradas desde sistemas legacy.',
      features: [
        'APIs REST y GraphQL con latencia mínima',
        'Microservicios escalables horizontalmente',
        'Sistemas de procesamiento en tiempo real',
        'Herramientas CLI y automatización',
      ],
      results: ['Latencia p99: 10-50ms', 'Throughput: 10k-50k req/s', 'Uso memoria: 70-90% menor'],
      tech: 'rust',
      linkUrl: '/proyectos',
      linkText: 'Ver proyectos en Rust',
    },
    {
      icon: <ServerStack01Icon className="w-8 h-8 text-brand" />,
      image: '/images/especialista2.webp',
      title: 'Servidores e Infraestructura',
      description:
        'Arquitecturas distribuidas diseñadas para escalar sin dolor, con alta disponibilidad y monitoreo proactivo.',
      features: [
        'Diseño de arquitectura distribuida',
        'Load balancing y alta disponibilidad',
        'Contenedores Docker y Kubernetes',
        'CI/CD pipelines automatizados',
      ],
      results: ['Uptime: 99.95-99.99%', 'Despliegue en minutos', 'Reducción costos: 40-70%'],
      tech: 'docker',
      linkUrl: '/proyectos',
      linkText: 'Ver casos de infraestructura',
    },
    {
      icon: <DatabaseLightningIcon className="w-8 h-8 text-brand" />,
      image: '/images/especialista3.webp',
      title: 'Optimización de Rendimiento',
      description:
        'Analizamos y optimizamos sistemas existentes que no cumplen con los requisitos de rendimiento o cuestan demasiado.',
      features: [
        'Auditoría técnica completa',
        'Análisis de cuellos de botella',
        'Optimización de consultas y datos',
        'Reducción de latencia y costos',
      ],
      results: ['Reducción latencia: 80-95%', 'Aumento capacidad: 5-50x', 'Ahorro infra: 50-80%'],
      tech: 'mongodb',
      linkUrl: '/proyectos',
      linkText: 'Ver casos de optimización',
    },
    {
      icon: <RefreshIcon className="w-8 h-8 text-brand" />,
      image: '/images/especialista4.webp',
      title: 'Migración de Sistemas Legacy',
      description:
        'Movemos aplicaciones antiguas a arquitecturas modernas sin downtime y sin perder funcionalidad.',
      features: [
        'Análisis de código legacy',
        'Estrategia de migración gradual',
        'Refactorización y modernización',
        'Despliegue sin interrupciones',
      ],
      results: [
        'Cero downtime en migración',
        'Mejora rendimiento: 10-100x',
        'Código mantenible y documentado',
      ],
      tech: 'rust',
      linkUrl: '/proyectos',
      linkText: 'Ver casos de migración',
    },
    {
      icon: <Message01Icon className="w-8 h-8 text-brand" />,
      image: '/images/especialista5.webp',
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
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center md:text-left">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Qué hacemos
          </div>
          <h2 className="text-fluid-h2 font-extrabold text-white mb-6 leading-none">
            Especialistas en Rust
            <br />
            <span className="text-zinc-600">y Servidores.</span>
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`glass-panel p-8 border-editorial flex flex-col h-full relative overflow-hidden ${
                !detailed
                  ? 'draw-border cursor-pointer group hover:bg-[#080808] transition-colors duration-300'
                  : 'group hover:bg-brand/5 hover:border-brand/30 transition-all duration-300'
              }`}
            >
              {service.image && (
                <>
                  <div className="absolute inset-0 z-0">
                    <img
                      src={service.image}
                      alt=""
                      className="w-full h-full object-cover opacity-10 grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 z-0 bg-linear-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />
                </>
              )}

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
