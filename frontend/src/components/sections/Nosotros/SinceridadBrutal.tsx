import { motion } from 'motion/react';
import { Card } from '../../reutilizables/card';
import { SectionHeader } from '../../ui/SectionHeader';

const noHacemos = [
  { title: 'Plantillas Genéricas', desc: 'No construimos sobre temas prefabricados. Arquitectura 100% a medida de tus operaciones.' },
  { title: 'Deuda Técnica', desc: 'No sacrificamos arquitectura a largo plazo por cerrar un sprint 2 semanas antes.' },
  { title: 'Promesas sin Datos', desc: 'No inflamos expectativas. Hablamos con métricas duras (Latencia p99, Uptime, Costos Cloud).' }
];

export function SinceridadBrutal() {
  return (
    <section className="py-24 border-y border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader title="SINCERIDAD BRUTAL" subtitle="Lo que JAMÁS Haremos" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {noHacemos.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <Card className="p-8 border-red-500/20 bg-red-500/5 hover:border-red-500/40 transition-colors rounded-none h-full shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                <div className="text-red-500 font-mono text-xl mb-4 font-black">X</div>
                <h3 className="text-white font-bold uppercase tracking-tight mb-4 text-xl">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
