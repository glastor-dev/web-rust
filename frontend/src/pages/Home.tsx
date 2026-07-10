import { PageHero } from '../components/ui/PageHero';
import { ClientMarquee } from '../components/ui/ClientMarquee';
import { SEO } from '../components/SEO';

// New Sections
import { ImpactMetricsSection } from '../components/sections/ImpactMetricsSection';
import { RustServicesSection } from '../components/sections/RustServicesSection';
import { RustBenchmarksSection } from '../components/sections/RustBenchmarksSection';
import { WhyGlastorSection } from '../components/sections/WhyGlastorSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { CaseStudiesSection } from '../components/sections/CaseStudiesSection';
export default function Home() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title="Glastor | Desarrollo Backend en Rust y Optimización de Servidores"
        description="Construimos servidores de alto rendimiento y optimizamos infraestructura para empresas que necesitan velocidad, fiabilidad y escalabilidad real."
        url="https://glastor.es/"
      />

      <PageHero
        title={
          <>
            <span className="sr-only">Desarrollo Backend en Rust desde 2010</span>
            DESARROLLO BACKEND EN <span className="text-brand">RUST</span> DESDE 2010
          </>
        }
        titleText={'DESARROLLO BACKEND EN\nRUST DESDE 2010'}
        titleClass="text-fluid-display"
        description="Construimos servidores de alto rendimiento y optimizamos infraestructura para empresas que necesitan velocidad, fiabilidad y escalabilidad real."
        ctaPrimary={{ text: 'Ver proyectos', href: '/proyectos' }}
        ctaSecondary={{ text: 'Contactar', href: '#contacto' }}
        socialProof={
          <span className="flex items-center gap-2">
            15 años de experiencia · Girona, España · Marca registrada INPI
          </span>
        }
        minHeight="min-h-[90vh]"
        backgroundImage="https://res.cloudinary.com/dzualplqi/image/upload/v1783566449/servidoresvps-768x384_hb3fbx.webp"
        bottomElement={<ClientMarquee />}
      />

      <ImpactMetricsSection />

      <RustServicesSection />

      <RustBenchmarksSection />

      <WhyGlastorSection />

      <ProcessSection />

      <CaseStudiesSection />
    </div>
  );
}
