import { motion } from 'motion/react';
import { ArrowRight, Server, Zap, RefreshCw, MessageSquare, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RustServicesSection({ detailed = false }: { detailed?: boolean }) {
  const servicesData = [
    {
      icon: <Code className="w-8 h-8 text-brand" />,
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
      linkText: 'Ver proyectos en Rust',
      linkUrl: '/proyectos',
    },
    {
      icon: <Server className="w-8 h-8 text-brand" />,
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
      linkText: 'Ver casos de infraestructura',
      linkUrl: '/proyectos',
    },
    {
      icon: <Zap className="w-8 h-8 text-brand" />,
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
      linkText: 'Solicitar auditoría',
      linkUrl: '/servicios',
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-brand" />,
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
      linkText: 'Ver proceso de migración',
      linkUrl: '/servicios',
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-brand" />,
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
      linkText: 'Agendar consultoría',
      linkUrl: 'https://cal.com/andres-zl5hcb/15min',
    },
  ];

  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center md:text-left">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Qué hacemos
          </div>
          <h2 className="text-fluid-h2 font-black uppercase text-white mb-6 leading-none">
            ESPECIALISTAS EN RUST
            <br />
            <span className="text-zinc-600">Y SERVIDORES.</span>
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
              className={`glass-panel p-8 border-editorial flex flex-col h-full ${
                !detailed
                  ? 'draw-border cursor-pointer group hover:bg-[#080808] transition-colors duration-300'
                  : 'group hover:bg-brand/5 hover:border-brand/30 transition-all duration-300'
              }`}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-black uppercase text-white mb-4 tracking-tight">
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

              <div className="mt-auto pt-6 border-t border-white/5">
                {service.linkUrl.startsWith('http') ? (
                  <a
                    href={service.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-mono text-white group-hover:text-brand transition-colors"
                  >
                    {service.linkText}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to={service.linkUrl}
                    className="inline-flex items-center text-sm font-mono text-white group-hover:text-brand transition-colors"
                  >
                    {service.linkText}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
