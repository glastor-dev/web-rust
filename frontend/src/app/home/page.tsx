import HeroSection from '@/components/HeroSection';
import { NavigationTeasersGrid } from '@/components/sections/NavigationTeasersGrid';
import { WhyGlastorSection } from '@/components/sections/WhyGlastorSection';


import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agencia de Ingeniería en Rust',
  description: 'Desarrollo de Backend en Rust, latencia baja, uptime alto y costos de infraestructura optimizados para empresas B2B.',
  openGraph: {
    title: 'Glastor-Dev B2B | Agencia de Ingeniería en Rust',
    description: 'Sistemas críticos y microservicios de alto rendimiento.',
    url: 'https://glastor.es/home',
  }
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Glastor-Dev B2B',
    image: 'https://glastor.es/images/glastor-logo.webp',
    description: 'Agencia de desarrollo web especializada en Rust, WebGL y Next.js.',
    url: 'https://glastor.es/home',
    priceRange: '$$$'
  };

  return (
    <main className="min-h-screen bg-[#050505] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <NavigationTeasersGrid />
      <WhyGlastorSection />

    </main>
  );
}
