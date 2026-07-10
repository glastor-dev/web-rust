import { SectionHeader } from '../components/ui/SectionHeader';
import { TeamEasterEgg } from '../components/ui/TeamEasterEgg';
import { SEO } from '../components/SEO';
import { FoundersSection } from '../components/sections/Nosotros/FoundersSection';
import { CompanyStatsHero } from '../components/sections/Nosotros/CompanyStatsHero';
import { EvolutionTimeline } from '../components/sections/Nosotros/EvolutionTimeline';
import { MissionVision } from '../components/sections/Nosotros/MissionVision';

export default function Nosotros() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title="Glastor | Amamos la ingeniería de precisión"
        description="Fundamos Glastor porque creemos que el software debe ser rápido, seguro y escalable desde el primer día. Conoce al equipo obcecado con la calidad."
        url="https://glastor.es/nosotros"
      />

      <CompanyStatsHero />
      <EvolutionTimeline />
      <MissionVision />

      {/* 4. Liderazgo y Núcleo Operativo */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <FoundersSection />

        <div className="mt-32">
          <SectionHeader title="NÚCLEO OPERATIVO" subtitle="Gente Obcecada con la Calidad" />
          <TeamEasterEgg />
        </div>
      </section>
    </div>
  );
}
