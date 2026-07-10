import { motion } from 'motion/react';

const timelineEvents = [
  {
    year: '2010',
    title: 'FUNDACIÓN',
    description:
      'Glastor nace con la misión de democratizar herramientas digitales avanzadas y ponerlas al alcance de la comunidad técnica y corporativa.',
  },
  {
    year: '2015',
    title: 'ESTRUCTURA HÍBRIDA',
    description:
      'Transformación en entidad para escalar operaciones, atrayendo talento e infraestructura sin perder los valores fundacionales.',
  },
  {
    year: '2019',
    title: 'PLATAFORMA CLOUD',
    description:
      'Desarrollo de infraestructura robusta de alta computación y rendimiento (HPC). Lanzamiento de servicios B2B.',
  },
  {
    year: '2023',
    title: 'GIRONA, ESPAÑA',
    description:
      'Traslado de operaciones HQ a Girona, España. Expansión internacional y consolidación como empresa tecnológica de alto rendimiento.',
  },
];

export function EvolutionTimeline() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 overflow-hidden">
      <div className="bg-brand text-black font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 mb-8 rounded-sm inline-block">
        Línea de Tiempo
      </div>

      <h2 className="text-5xl md:text-7xl lg:text-[80px] font-black uppercase tracking-tighter leading-[0.85] mb-16 text-white max-w-4xl">
        UNA HISTORIA <br />
        <span className="text-zinc-500">DE EVOLUCIÓN</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {timelineEvents.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="border border-white/10 hover:border-brand/50 transition-colors p-8 rounded-xl flex flex-col bg-[#080808]"
          >
            <span className="text-brand font-mono text-sm font-bold uppercase tracking-widest mb-6">
              // {item.year}
            </span>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">
              {item.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
