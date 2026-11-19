import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { TrustBar } from '@/components/ui/TrustBar';
import { ROICalculator } from '@/components/ui/ROICalculator';

import { RustServicesSection } from '@/components/sections/RustServicesSection';
import ServicesListSection from '@/components/sections/ServicesListSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { GuaranteesSection } from '@/components/sections/GuaranteesSection';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Servicios de Ingeniería en Rust & Sistemas Críticos | Glastor',
  description:
    'Desarrollo de backend en Rust, optimización de infraestructura de alto rendimiento, migraciones de sistemas críticos y arquitectura cloud determinística.',
};

export default function Servicios() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Hero Dedicado con ROICalculator */}
      <PageHero
        badge="Servicios Técnicos & Consultoría"
        title={
          <span>
            SERVICIOS<span className="text-brand">.</span>
          </span>
        }
        titleClass="text-[clamp(2.5rem,8vw,5rem)]"
        description="Construimos sistemas críticos que escalan, optimizamos infraestructura que cuesta demasiado, y migramos aplicaciones legacy a arquitecturas modernas en Rust."
        ctaPrimary={{ text: 'Ver casos de éxito', href: '/proyectos' }}
        ctaSecondary={{ text: 'Solicitar presupuesto', href: '#contacto' }}
        visualElement={<ROICalculator />}
        minHeight="min-h-150"
      />

      <TrustBar variant="tech" />

      {/* 2. Catálogo General de Servicios */}
      <ServicesListSection />

      {/* 3. Deep Dive en nuestra ventaja tecnológica */}
      <RustServicesSection detailed={true} />

      {/* 4. Metodología de Trabajo */}
      <ProcessSection />

      {/* 5. Acuerdos y Garantías */}
      <GuaranteesSection />

      {/* 6. Llamada a la Acción B2B */}
      <FinalCTA />
    </div>
  );
}
