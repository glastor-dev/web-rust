import { PageHero } from '../components/ui/PageHero';
import { ROICalculator } from '../components/ui/ROICalculator';
import { TrustBar } from '../components/ui/TrustBar';
import { SEO } from '../components/SEO';

import { RustServicesSection } from '../components/sections/RustServicesSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { GuaranteesSection } from '../components/sections/GuaranteesSection';

export default function Servicios() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title="Servicios | Consultoría Cloud, Arquitectura Backend y Migración a Rust"
        description="Construimos sistemas críticos que escalan, optimizamos infraestructura que cuesta demasiado, y migramos aplicaciones legacy a arquitecturas modernas."
        url="https://glastor.es/servicios"
      />

      {/* 1. Hero Dedicado con ROICalculator */}
      <PageHero
        title={
          <>
            SERVICIOS
            <br />
            <span className="text-brand">TÉCNICOS.</span>
          </>
        }
        titleClass="text-[clamp(3rem,10vw,6rem)] lg:text-[clamp(3rem,4.5vw,6rem)]"
        description="Construimos sistemas críticos que escalan, optimizamos infraestructura que cuesta demasiado, y migramos aplicaciones legacy a arquitecturas modernas."
        ctaPrimary={{ text: 'Ver casos de éxito', href: '/proyectos' }}
        ctaSecondary={{ text: 'Solicitar presupuesto', href: '#contacto' }}
        minHeight="min-h-screen"
        visualElement={
          <div className="w-full max-w-lg mx-auto lg:mr-0">
            <ROICalculator />
          </div>
        }
      />

      <TrustBar />

      <RustServicesSection />

      <ProcessSection />

      <GuaranteesSection />
    </div>
  );
}
