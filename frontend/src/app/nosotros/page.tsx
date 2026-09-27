import type { Metadata } from 'next';
import { EvolutionTimeline } from '@/components/sections/Nosotros/EvolutionTimeline';
import { MissionVision } from '@/components/sections/Nosotros/MissionVision';
import { TeamSection } from '@/components/sections/TeamSection';
import PhilosophySection from '@/components/sections/PhilosophySection';

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
      <MissionVision />
      <EvolutionTimeline />
      <PhilosophySection />

      {/* 4. Liderazgo y Núcleo Operativo */}
      <TeamSection />
    </div>
  );
}
