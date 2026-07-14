import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Activity, Cpu, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
  {
    id: 'fintech',
    title: 'Fintech & Web3',
    icon: <ShieldCheck className="w-8 h-8 text-brand" />,
    description:
      'Baja latencia extrema, inmutabilidad y seguridad criptográfica. Rust es el estándar de facto para validadores blockchain y HFT (High Frequency Trading).',
    metrics: ['Sub-millisecond Latency', 'Zero Data Races'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Alta Concurrencia',
    icon: <Activity className="w-8 h-8 text-brand" />,
    description:
      'Soporta picos de Black Friday sin sudar. Microservicios que consumen un 80% menos de RAM que Node.js, reduciendo drásticamente la factura de AWS.',
    metrics: ['+100k RPS', '85% Cost Reduction'],
  },
  {
    id: 'healthtech',
    title: 'Sistemas de Salud (HealthTech)',
    icon: <Cpu className="w-8 h-8 text-brand" />,
    description:
      'Garantía de memoria segura y concurrencia sin fallos. El compilador de Rust asegura que los datos críticos de pacientes nunca estén expuestos a vulnerabilidades de memoria.',
    metrics: ['Memory Safe', 'HIPAA Compliant Ready'],
  },
  {
    id: 'telecom',
    title: 'Telecomunicaciones & IoT',
    icon: <Network className="w-8 h-8 text-brand" />,
    description:
      'Rendimiento a nivel de C con ergonomía moderna. Procesamiento masivo de streams de datos en tiempo real para millones de dispositivos concurrentes.',
    metrics: ['Real-time Streaming', 'Low Footprint'],
  },
];

export const IndustriesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#050505] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block text-brand font-mono text-xs uppercase tracking-widest mb-4"
          >
            Sectores Críticos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white"
          >
            Soluciones por <span className="text-zinc-500">Industria</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-zinc-400 font-mono text-sm max-w-2xl"
          >
            Rust no es solo un lenguaje, es una ventaja competitiva. Descubre cómo aplicamos la
            fiabilidad absoluta en diferentes verticales donde el fallo no es una opción.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#050505] p-8 lg:p-12 group hover:bg-[#080808] transition-colors duration-500"
            >
              <div className="mb-8 p-4 bg-white/5 inline-flex rounded-lg border border-white/10 group-hover:border-brand/30 transition-colors duration-500">
                {industry.icon}
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-4">
                {industry.title}
              </h3>
              <p className="text-zinc-400 font-mono text-sm mb-8 leading-relaxed">
                {industry.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {industry.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="text-[10px] font-mono text-brand uppercase tracking-widest px-2 py-1 bg-brand/10 border border-brand/20"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:text-brand transition-colors duration-300"
              >
                Ver casos de uso
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
