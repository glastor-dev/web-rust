import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Static Imports (Above the fold or lightweight UI)
import { HeroMilwaukee } from '@/components/sections/milwaukee/HeroMilwaukee';
import { TrustBar } from '@/components/ui/TrustBar';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { AccessoriesGrid } from '@/components/sections/milwaukee/AccessoriesGrid';

// Dynamic Imports for Code Splitting (Below the fold)
const InfiniteTicker = dynamic(() => import('@/components/sections/milwaukee/InfiniteTicker').then(mod => mod.InfiniteTicker));
const PipelineCarousel = dynamic(() => import('@/components/sections/milwaukee/PipelineCarousel').then(mod => mod.PipelineCarousel));
const ShopByTrade = dynamic(() => import('@/components/sections/milwaukee/ShopByTrade').then(mod => mod.ShopByTrade));

// Dynamic Imports for Heavy Sections (with loading skeletons to prevent Layout Shift)
const HeavyDutyProof = dynamic(
  () => import('@/components/sections/milwaukee/HeavyDutyProof').then(mod => mod.HeavyDutyProof),
  { loading: () => <HeavyDutySkeleton /> }
);
const CompareSystems = dynamic(
  () => import('@/components/sections/milwaukee/CompareSystems').then(mod => mod.CompareSystems),
  { loading: () => <CompareSystemsSkeleton /> }
);
const PackoutBanner = dynamic(
  () => import('@/components/sections/milwaukee/PackoutBanner').then(mod => mod.PackoutBanner),
  { loading: () => <PackoutBannerSkeleton /> }
);
const OneKeySection = dynamic(
  () => import('@/components/sections/milwaukee/OneKeySection').then(mod => mod.OneKeySection),
  { loading: () => <OneKeySkeleton /> }
);
const DealerBanner = dynamic(() => import('@/components/sections/milwaukee/DealerBanner').then(mod => mod.DealerBanner));

// --- PRECISE SKELETONS FOR CLS 0 ---

function HeavyDutySkeleton() {
  return (
    <div className="w-full min-h-[80vh] bg-black border-y-4 border-white/10 flex items-center justify-center py-20 px-6 md:px-12">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 w-full max-w-2xl">
          <div className="w-48 h-8 bg-white/5 animate-pulse mb-6" />
          <div className="w-full h-32 md:h-40 bg-white/5 animate-pulse mb-6" />
          <div className="w-3/4 h-20 bg-white/5 animate-pulse mb-8" />
          <div className="w-64 h-14 bg-white/5 animate-pulse" />
        </div>
        <div className="w-full lg:w-120 shrink-0 min-h-80 bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}

function CompareSystemsSkeleton() {
  return (
    <div className="w-full min-h-200 bg-[#050505] py-24 md:py-32 border-y border-white/5 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-16 md:mb-24 pb-8 gap-8 border-b border-white/5">
          <div className="w-full max-w-md h-32 bg-white/5 animate-pulse" />
          <div className="w-full max-w-xs h-14 bg-white/5 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 h-100 md:h-125 bg-white/5 animate-pulse" />
          <div className="lg:col-span-5 flex flex-col gap-6">
             <div className="w-full h-48 bg-white/5 animate-pulse" />
             <div className="w-full h-32 bg-white/5 animate-pulse" />
             <div className="w-full h-40 bg-white/5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PackoutBannerSkeleton() {
  return (
    <div className="w-full min-h-125 md:min-h-140 bg-black flex items-center py-12 px-6 md:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="max-w-2xl flex flex-col gap-4">
          <div className="w-32 h-6 bg-white/10 animate-pulse mb-2" />
          <div className="w-full h-24 md:h-32 bg-white/10 animate-pulse" />
          <div className="w-full h-24 bg-white/10 animate-pulse mt-4" />
          <div className="w-64 h-14 bg-white/10 animate-pulse mt-4" />
        </div>
      </div>
    </div>
  );
}

function OneKeySkeleton() {
  return (
    <div className="w-full bg-[#050505] py-20 md:py-32 border-y border-white/5 px-6 md:px-12 min-h-150">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <div className="w-32 h-12 bg-white/5 animate-pulse" />
          <div className="w-full h-32 bg-white/5 animate-pulse" />
          <div className="w-3/4 h-16 bg-white/5 animate-pulse" />
          <div className="w-full h-32 bg-white/5 animate-pulse" />
        </div>
        <div className="h-80 md:h-125 w-full bg-white/5 animate-pulse rounded-full" />
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <section className="w-full bg-[#0a0a0a] py-16 border-t border-brand/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="w-32 h-4 bg-white/10 animate-pulse mb-3" />
            <div className="w-64 h-10 bg-white/10 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-3/4 bg-white/5 animate-pulse border border-white/10" />
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Distribuidor de Herramientas Industriales',
  description: 'Glastor Tienda B2B. Equipamiento premium para la industria pesada en Argentina. Distribuidor oficial.',
  openGraph: {
    title: 'Glastor Tienda B2B | Herramientas Industriales',
    description: 'Equipamiento premium para la industria pesada en Argentina.',
    url: 'https://glastor.es/',
  }
};

// Removed searchParams to allow Next.js to statically generate this page (SSG/ISR)
export default function Home2Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HardwareStore',
    name: 'Glastor Tienda B2B',
    image: 'https://glastor.es/images/glastor-logo.webp',
    description: 'Distribuidor oficial B2B de herramientas premium industriales en Argentina.',
    url: 'https://glastor.es',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AR'
    }
  };

  return (
    <main className="min-h-screen font-sans relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">COMPRA GLASTOR® — Distribución B2B & Equipamiento Industrial</h1>
      <HeroMilwaukee />
      <InfiniteTicker />
      <TrustBar />
      
      <PipelineCarousel />
      <ShopByTrade />
      <HeavyDutyProof />
      <CompareSystems />
      <PackoutBanner />
      
      <Suspense fallback={<SkeletonGrid />}>
        {/* Category is undefined to fetch overall bestsellers statically */}
        <AccessoriesGrid />
      </Suspense>
      
      <OneKeySection />
      <DealerBanner />
      <FloatingContact />
    </main>
  );
}
