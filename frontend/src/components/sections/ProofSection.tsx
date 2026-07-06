import { motion } from 'motion/react';
import { Card } from '../reutilizables/card';
import { SectionHeader } from '../ui/SectionHeader';
import { Avatar, AvatarImage, AvatarFallback } from '../reutilizables/avatar';

const testimonials = [
  {
    metric: '-80% Latencia',
    quote: '"Nuestro monolito en Node colapsaba en Black Friday. Glastor reescribió el motor crítico en Rust. De 2s de latencia pasamos a 15ms bajo carga extrema."',
    author: 'Dan Khasis',
    company: 'CEO & Founder @ Route4Me',
    companyUrl: 'https://route4me.com/',
    avatar: '/images/khasis_dan.webp'
  },
  {
    metric: '-60% Costos Cloud',
    quote: '"Su equipo no hace preguntas redundantes. Auditaron la arquitectura de AWS, bajaron nuestros costos mensuales radicalmente y ejecutaron sin romper el frontend."',
    author: 'Shane Murphy-Reuter',
    company: 'Director de Marketing @ Calendly',
    companyUrl: 'https://calendly.com/es/leadership',
    avatar: '/images/Shane.webp'
  },
  {
    metric: '100% Uptime',
    quote: '"No sabía que el software podía ser tan robusto hasta que vi su cobertura de tests y el uso estricto de tipos de datos. Literalmente cero caídas en todo el año."',
    author: 'Will Corkin',
    company: 'Fundador',
    avatar: '/images/will.webp'
  }
];

export function ProofSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-y border-white/10 bg-[#050505]">
      <SectionHeader 
        title="Evidencia Técnica" 
        subtitle="Ingeniería que habla por sí sola. Cero fricción comercial." 
        titleClassName="text-fluid-h3"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {testimonials.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
          >
            <Card className="h-full bg-black/50 border border-white/10 hover:border-brand/40 transition-colors p-8 flex flex-col group rounded-none">
              <div className="border-b border-white/10 pb-4 mb-6">
                <span className="text-brand font-mono text-sm uppercase tracking-widest font-black">
                  [ {item.metric} ]
                </span>
              </div>
              
              <blockquote className="text-zinc-300 text-base leading-relaxed grow font-sans italic mb-8">
                {item.quote}
              </blockquote>
              
              <div className="mt-auto flex items-center gap-4 border-l-2 border-brand/50 pl-4">
                {item.avatar && (
                  <Avatar>
                    <AvatarImage src={item.avatar} alt={item.author} />
                    <AvatarFallback>{item.author.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-white font-bold text-sm uppercase tracking-widest">
                    {item.author}
                  </span>
                  {item.companyUrl ? (
                    <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand transition-colors font-mono text-xs uppercase tracking-widest">
                      {item.company}
                    </a>
                  ) : (
                    <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                      {item.company}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
