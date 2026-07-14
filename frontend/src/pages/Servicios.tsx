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
          <div className="lg:mt-12">
            SERVICIOS
            <br />
            <span className="text-brand">TÉCNICOS.</span>
          </div>
        }
        titleClass="text-[clamp(2.5rem,8vw,4.5rem)] lg:text-[clamp(2.5rem,3.5vw,4.5rem)]"
        description="Construimos sistemas críticos que escalan, optimizamos infraestructura que cuesta demasiado, y migramos aplicaciones legacy a arquitecturas modernas."
        ctaPrimary={{ text: 'Ver casos de éxito', href: '/proyectos' }}
        ctaSecondary={{ text: 'Solicitar presupuesto', href: '#contacto' }}
        minHeight="min-h-[600px]"
        visualElement={
          <div className="relative w-full h-[400px] lg:h-[450px] flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <ROICalculator />
            </div>
          </div>
        }
      />

      <TrustBar />

      <RustServicesSection detailed={true} />

      <ProcessSection />

      <GuaranteesSection />
    </div>
  );
}
