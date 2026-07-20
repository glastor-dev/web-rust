'use client';

import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { Linkedin02Icon, GithubIcon } from 'hugeicons-react';

const teamMembers = [
  {
    name: 'Marcus Vance',
    role: 'CEO & Arquitecto Jefe',
    image: '/images/team_ceo.png',
    specialty: 'Rust y sistemas distribuidos',
    bio: 'Lidera la ejecución de arquitecturas críticas y la reducción de latencia en producción.',
  },
  {
    name: 'Elena Silva',
    role: 'CTO & Sistemas Cloud',
    image: '/images/team_cto.png',
    specialty: 'Cloud, Kubernetes y Fintech/Salud',
    bio: 'Diseña e infraestructura entornos de alto tráfico y cumplimiento operativo.',
  },
  {
    name: 'David Torres',
    role: 'Lead Full-Stack',
    image: '/images/team_lead.png',
    specialty: 'WebGL/React y experiencias producto',
    bio: 'Transforma requerimientos complejos en interfaces de alto rendimiento.',
  },
];

export const TeamSection = () => {
  return (
    <section
      id="equipo"
      className="py-24 md:py-32 bg-[#080808] border-t border-white/5 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader
          title="Ingeniería. Sin Intermediarios."
          subtitle="Al trabajar con Glastor, no hablas con gestores de cuenta o comerciales. Hablas directamente con los arquitectos de sistemas que construirán tu infraestructura."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative bg-[#050505] border border-white/10 rounded-md overflow-hidden hover:border-brand/40 hover:shadow-[0_0_30px_rgba(0,255,102,0.05)] transition-all duration-500"
            >
              <div className="aspect-4/5 relative overflow-hidden bg-[#111]">
                <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-8 relative z-20 bg-linear-to-t from-[#050505] via-[#050505] to-transparent -mt-16 pt-20">
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-mono tracking-widest uppercase text-brand mb-4">
                  {member.role}
                </p>
                <p className="text-zinc-500 text-xs font-mono mb-4">{member.specialty}</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{member.bio}</p>

                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <a
                    href="/servicios"
                    className="text-brand hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
                  >
                    Ver servicios
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
