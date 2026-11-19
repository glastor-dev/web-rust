'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon } from 'hugeicons-react';
import { SectionHeader } from '../ui/SectionHeader';
import { TEAM_MEMBERS as teamMembers } from '@/lib/constants/aboutData';

export const TeamSection = () => {
  const isSingle = teamMembers.length === 1;

  return (
    <section
      id="equipo"
      className="py-24 md:py-32 bg-[#080808] border-t border-white/5 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader
          title="Ingeniería. Sin Intermediarios."
          subtitle="Al trabajar con Glastor, no hablas con gestores de cuenta o comerciales. Hablas directamente con el arquitecto de sistemas que diseñará y construirá tu infraestructura."
        />

        <div
          className={
            isSingle ? 'max-w-4xl mx-auto mt-16' : 'grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'
          }
        >
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className={`group relative bg-[#050505] border border-white/10 rounded-md overflow-hidden hover:border-brand/40 hover:shadow-[0_0_30px_rgba(0,255,102,0.05)] transition-all duration-500 ${
                isSingle ? 'grid grid-cols-1 md:grid-cols-12' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden bg-[#111] ${
                  isSingle ? 'md:col-span-5 aspect-4/5 md:aspect-auto min-h-80' : 'aspect-4/5'
                }`}
              >
                <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
              </div>

              <div
                className={`p-6 md:p-10 relative z-20 flex flex-col justify-between ${
                  isSingle
                    ? 'md:col-span-7 bg-[#050505]'
                    : 'bg-linear-to-t from-[#050505] via-[#050505] to-transparent -mt-16 pt-20'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-3">
                    // LIDERAZGO TÉCNICO DIRECTO
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono tracking-widest uppercase text-brand mb-4">
                    {member.role}
                  </p>
                  <p className="text-zinc-400 text-xs font-mono mb-4">{member.specialty}</p>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-8">
                    {member.bio}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                  <Link
                    href="/servicios"
                    className="inline-flex items-center gap-1.5 text-brand hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
                  >
                    <span>Ver servicios</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <span className="text-white/15">|</span>
                  <a
                    href="mailto:founder@glastor.es"
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-brand transition-colors text-xs font-mono"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>founder@glastor.es</span>
                  </a>
                  <span className="text-white/15">|</span>
                  <a
                    href="https://github.com/glastor-core"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-brand transition-colors text-xs font-mono"
                  >
                    <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>@glastor-core</span>
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
