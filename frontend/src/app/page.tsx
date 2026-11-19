import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import { IronCoreSection } from '@/components/sections/IronCoreSection';
import { RustBenchmarksSection } from '@/components/sections/RustBenchmarksSection';
import { GlastorCoreEcosystemSection } from '@/components/sections/GlastorCoreEcosystemSection';
import { NavigationTeasersGrid } from '@/components/sections/NavigationTeasersGrid';
import { WhyGlastorSection } from '@/components/sections/WhyGlastorSection';

export const metadata: Metadata = {
  title: 'Glastor | Ingeniería de Software en Rust & Creadores de @glastor-core',
  description:
    'Consultora de ingeniería de software en Rust. Creadores del ecosistema open-source GLASTOR® Core: motores SIMD (hyper64), runtimes de sub-milisegundo y arquitecturas backend de misión crítica.',
  openGraph: {
    title: 'Glastor | Ingeniería de Software en Rust & Ecosistema GLASTOR® Core',
    description:
      'Arquitectura Dual-Core: Fundaciones open-source en Rust (@glastor-core) e ingeniería backend B2B de alto rendimiento.',
    url: 'https://glastor.es/',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Glastor',
    alternateName: 'Glastor Core',
    image: 'https://glastor.es/images/glastor-logo.webp',
    description:
      'Consultora e ingeniería de software especializada en desarrollo backend en Rust y creadores del ecosistema open-source GLASTOR Core.',
    url: 'https://glastor.es',
    sameAs: ['https://github.com/glastor-core', 'https://github.com/glastor-dev'],
    priceRange: '$$$$',
    knowsAbout: [
      'Rust',
      'SIMD Vectorization',
      'Distributed Systems',
      'Backend Architecture',
      'DevSecOps',
      'Linux Kernel & eBPF',
      'High Performance Computing',
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] font-sans selection:bg-brand selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">
        GLASTOR® — Consultora de Software en Rust y Creadores de GLASTOR Core
      </h1>
      <HeroSection />
      <IronCoreSection />
      <RustBenchmarksSection />
      <GlastorCoreEcosystemSection />
      <NavigationTeasersGrid />
      <WhyGlastorSection />
    </main>
  );
}
