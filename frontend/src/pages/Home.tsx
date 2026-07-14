import { SEO } from '../components/SEO';
import HeroSection from '../components/HeroSection';

// New Sections
import { ImpactMetricsSection } from '../components/sections/ImpactMetricsSection';
import { RustServicesSection } from '../components/sections/RustServicesSection';
import { RustBenchmarksSection } from '../components/sections/RustBenchmarksSection';
import { WhyGlastorSection } from '../components/sections/WhyGlastorSection';
import { CaseStudiesSection } from '../components/sections/CaseStudiesSection';
import { IndustriesSection } from '../components/sections/IndustriesSection';
import { LeadMagnetSection } from '../components/sections/LeadMagnetSection';

export default function Home() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title="Glastor | Desarrollo Backend en Rust y Optimización de Servidores"
        description="Construimos servidores de alto rendimiento y optimizamos infraestructura para empresas que necesitan velocidad, fiabilidad y escalabilidad real."
        url="https://glastor.es/"
      />

      <HeroSection />

      <ImpactMetricsSection />

      <RustServicesSection />

      <IndustriesSection />

      <RustBenchmarksSection />

      <WhyGlastorSection />

      <CaseStudiesSection />

      <LeadMagnetSection />
    </div>
  );
}
