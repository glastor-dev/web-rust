import { motion } from 'motion/react';
import { Code2, Database, HardDrive, Activity, Wrench } from 'lucide-react';

const categories = [
  {
    title: 'Lenguajes Principales',
    icon: <Code2 className="w-6 h-6 text-brand" />,
    items: [
      { name: 'Rust', desc: 'Desarrollo principal, sistemas críticos', main: true },
      { name: 'Python', desc: 'Scripts, automatización, ML', main: false },
      { name: 'Bash/Shell', desc: 'Automatización de infraestructura', main: false },
    ],
  },
  {
    title: 'Bases de Datos',
    icon: <Database className="w-6 h-6 text-brand" />,
    items: [
      { name: 'PostgreSQL', desc: 'Base de datos principal', main: true },
      { name: 'Redis', desc: 'Caché y colas', main: true },
      { name: 'SQLite', desc: 'Aplicaciones embebidas', main: false },
      { name: 'TimescaleDB', desc: 'Series temporales', main: false },
    ],
  },
  {
    title: 'Infraestructura',
    icon: <HardDrive className="w-6 h-6 text-brand" />,
    items: [
      { name: 'Linux', desc: 'Servidores (Debian, Ubuntu, Alpine)', main: true },
      { name: 'Docker', desc: 'Contenedores', main: true },
      { name: 'Kubernetes', desc: 'Orquestación', main: true },
      { name: 'Nginx/Caddy', desc: 'Reverse proxies', main: false },
      { name: 'Terraform', desc: 'Infrastructure as Code', main: false },
    ],
  },
  {
    title: 'Monitoreo y Observabilidad',
    icon: <Activity className="w-6 h-6 text-brand" />,
    items: [
      { name: 'Prometheus', desc: 'Métricas', main: true },
      { name: 'Grafana', desc: 'Visualización', main: true },
      { name: 'Loki', desc: 'Logs', main: false },
      { name: 'Jaeger', desc: 'Tracing distribuido', main: false },
    ],
  },
  {
    title: 'Herramientas de Desarrollo',
    icon: <Wrench className="w-6 h-6 text-brand" />,
    items: [
      { name: 'Git', desc: 'Control de versiones', main: true },
      { name: 'GitHub/GitLab', desc: 'Repositorios', main: true },
      { name: 'CI/CD', desc: 'GitHub Actions, GitLab CI', main: true },
    ],
  },
];

export function TechStackSection() {
  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Tecnologías
          </div>
          <h2 className="text-fluid-h2 font-black uppercase text-white leading-none">
            STACK TECNOLÓGICO
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 border-editorial group hover:border-brand/30 transition-colors h-full"
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                {category.icon}
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  {category.title}
                </h3>
              </div>

              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <li key={i} className="flex flex-col">
                    <span
                      className={`font-mono text-sm mb-1 ${item.main ? 'text-white' : 'text-zinc-400'}`}
                    >
                      {item.name}
                    </span>
                    <span className="text-xs text-zinc-500 font-light">{item.desc}</span>
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
