import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { TrustBar } from '@/components/ui/TrustBar';
import { ROICalculator } from '@/components/ui/ROICalculator';

import { RustServicesSection } from '@/components/sections/RustServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { GuaranteesSection } from '@/components/sections/GuaranteesSection';
import { MultiStepContactForm } from '@/components/sections/MultiStepContactForm';

export const metadata: Metadata = {
  title: 'Servicios Industriales B2B | Glastor',
  description:
    'Construimos sistemas críticos que escalan, optimizamos infraestructura y migramos aplicaciones legacy a arquitecturas modernas.',
};

export default function Servicios() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Hero Dedicado con ROICalculator */}
      <PageHero
        title={
          <>
            Servicios
            <br />
            <span className="text-brand">Técnicos.</span>
          </>
        }
        titleClass="text-[clamp(2.5rem,8vw,4.5rem)] lg:text-[clamp(2.5rem,3.5vw,4.5rem)]"
        description="Construimos sistemas críticos que escalan, optimizamos infraestructura que cuesta demasiado, y migramos aplicaciones legacy a arquitecturas modernas."
        ctaPrimary={{ text: 'Ver casos de éxito', href: '/proyectos' }}
        ctaSecondary={{ text: 'Solicitar presupuesto', href: '#contacto' }}
        visualElement={<ROICalculator />}
        minHeight="min-h-150"
      />

      <TrustBar />

      <RustServicesSection detailed={true} />

      <ProcessSection />

      <GuaranteesSection />

      <MultiStepContactForm />
    </div>
  );
}
