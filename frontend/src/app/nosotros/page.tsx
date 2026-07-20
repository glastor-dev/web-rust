import type { Metadata } from 'next';
import { EvolutionTimeline } from '@/components/sections/Nosotros/EvolutionTimeline';
import { MissionVision } from '@/components/sections/Nosotros/MissionVision';
import { TeamSection } from '@/components/sections/TeamSection';

import { CompanyStatsHero } from '@/components/sections/Nosotros/CompanyStatsHero';

export const metadata: Metadata = {
  title: 'Nuestra Visión y Evolución | Glastor',
  description:
    'Conoce la evolución, liderazgo y el núcleo operativo de Glastor. Expertos en infraestructura de alto rendimiento.',
};

export default function Nosotros() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CompanyStatsHero />
      <EvolutionTimeline />
      <MissionVision />

      {/* 4. Liderazgo y Núcleo Operativo */}
      <div className="pt-24 border-t border-white/10">
        <TeamSection />
      </div>

      {/* CTA contextual */}
      <div className="border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-brand font-mono text-xs uppercase tracking-widest mb-3">
              ¿Tu infra necesita foco técnico?
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Agenda 15 minutos con nuestro Tech Lead.
            </h3>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Cero comerciales. Te devolvemos un diagnóstico real y los siguientes pasos, con
              alcance y ROI estimado.
            </p>
          </div>
          <a
            href="/arquitectura"
            className="shrink-0 bg-brand text-black font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-white transition-colors"
          >
            Agendar auditoría
          </a>
        </div>
      </div>
    </div>
  );
}
