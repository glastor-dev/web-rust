import { motion } from 'motion/react';
import { ArrowRight, Activity, TrendingDown, RefreshCcw } from 'lucide-react';

const cases = [
  {
    icon: <Activity className="w-8 h-8 text-brand" />,
    title: 'API de Alto Rendimiento en Rust',
    subtitle: '8 semanas',
    challenge: [
      'Latencia p99: 800ms (inaceptable para usuarios)',
      'Caídas frecuentes durante picos de tráfico',
      'Costos de servidor: €8,000/mes',
    ],
    solution: 'Migración a Rust con Actix-web, PostgreSQL optimizado, Redis y Load balancing.',
    results: [
      { label: 'Latencia p99', value: '800ms → 23ms', sub: '97% mejora' },
      { label: 'Throughput', value: '200 → 15k req/s', sub: '75x mejora' },
      { label: 'Costo mensual', value: '€8k → €2k', sub: '75% ahorro' },
    ],
    stack: 'Rust · Actix-web · PostgreSQL · Redis · Docker · Nginx',
    roi: 'Recuperado en 4 meses',
  },
  {
    icon: <TrendingDown className="w-8 h-8 text-brand" />,
    title: 'Reducción de Costos de Infraestructura',
    subtitle: '10 semanas',
    challenge: [
      'Costos AWS: €25,000/mes (insostenible)',
      '15 microservicios en Node.js ineficientes',
      'Escalado manual y reactivo',
    ],
    solution:
      'Auditoría, right-sizing de instancias (40% red.), migración a PostgreSQL y Auto-scaling inteligente.',
    results: [
      { label: 'Costo AWS', value: '€25k → €6.2k', sub: '75% reducción' },
      { label: 'Tiempo de carga', value: '4.2s → 1.8s', sub: '57% más rápido' },
      { label: 'Tiempo despliegue', value: '45m → 8m', sub: 'Automatizado' },
    ],
    stack: 'Rust · PostgreSQL · Redis · AWS · Terraform · Kubernetes',
    roi: '8x en el primer año',
  },
  {
    icon: <RefreshCcw className="w-8 h-8 text-brand" />,
    title: 'Migración de Sistema Legacy',
    subtitle: '6 meses',
    challenge: [
      'Código en tecnologías obsoletas (15 años)',
      'Sin API, imposible integrar con otros sistemas',
      'Caídas diarias, backups manuales',
    ],
    solution: 'Migración gradual en 4 fases sin downtime a nueva arquitectura Rust + React.',
    results: [
      { label: 'Uptime', value: '85% → 99.95%', sub: 'Alta disponibilidad' },
      { label: 'Nuevas integraciones', value: '0 → 15', sub: 'APIs REST' },
      { label: 'Tiempo en backups', value: '2h/día → 0', sub: '100% automático' },
    ],
    stack: 'Rust · React · PostgreSQL · Docker · Nginx · Redis',
    roi: 'Recuperado en 18 meses',
  },
];

export function CaseStudiesSection() {
  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
              Casos de Éxito
            </div>
            <h2 className="text-fluid-h2 font-black uppercase text-white mb-4 leading-none">
              PROYECTOS EN
              <br />
              <span className="text-zinc-600">PRODUCCIÓN.</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg font-light mt-6">
              Más de 150 proyectos completados desde 2010. Aquí tienes una muestra de lo que hacemos
              y los resultados que conseguimos.
            </p>
          </div>
          <a
            href="/proyectos"
            className="inline-flex items-center text-sm font-mono text-brand hover:text-white transition-colors"
          >
            Ver todos los casos <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

        <div className="space-y-12">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="glass-panel p-8 md:p-12 border-editorial flex flex-col lg:flex-row gap-12 group hover:border-brand/30 transition-colors"
            >
              {/* Left Column */}
              <div className="lg:w-1/3">
                <div className="mb-6">{caseStudy.icon}</div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">{caseStudy.title}</h3>
                <div className="text-brand font-mono text-sm mb-6">
                  Duración: {caseStudy.subtitle}
                </div>

                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                  El Desafío:
                </h4>
                <ul className="space-y-2 mb-6">
                  {caseStudy.challenge.map((ch, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex items-start">
                      <span className="text-red-500 mr-2 mt-0.5">✕</span> {ch}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column */}
              <div className="lg:w-2/3 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                    La Solución:
                  </h4>
                  <p className="text-zinc-300 mb-8">{caseStudy.solution}</p>

                  <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                    Resultados:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {caseStudy.results.map((res, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-sm border border-white/10">
                        <div className="text-xs text-zinc-500 font-mono uppercase mb-1">
                          {res.label}
                        </div>
                        <div className="text-lg font-bold text-white mb-1">{res.value}</div>
                        <div className="text-xs text-brand">{res.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-white/10 gap-4">
                  <div className="text-xs font-mono text-zinc-500">
                    <span className="text-white">Stack:</span> {caseStudy.stack}
                  </div>
                  <div className="text-xs font-mono px-3 py-1 bg-brand/10 text-brand rounded-full">
                    ROI: {caseStudy.roi}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
