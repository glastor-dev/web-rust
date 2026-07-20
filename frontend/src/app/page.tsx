import { HeroMilwaukee } from '@/components/sections/milwaukee/HeroMilwaukee';
import { PipelineCarousel } from '@/components/sections/milwaukee/PipelineCarousel';
import { SystemsExplorer } from '@/components/sections/milwaukee/SystemsExplorer';
import { PackoutBanner } from '@/components/sections/milwaukee/PackoutBanner';
import { AccessoriesGrid } from '@/components/sections/milwaukee/AccessoriesGrid';
import { OneKeySection } from '@/components/sections/milwaukee/OneKeySection';
import { DealerBanner } from '@/components/sections/milwaukee/DealerBanner';
import { TrustBar } from '@/components/ui/TrustBar';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { Suspense } from 'react';

function SkeletonGrid() {
  return (
    <section className="w-full bg-[#050505] py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="w-32 h-4 bg-white/10 animate-pulse mb-3" />
            <div className="w-64 h-10 bg-white/10 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse border border-white/10" />
          ))}
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  title: 'Home Milwaukee-Style - Glastor',
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home2Page({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const tab = typeof resolvedParams.tab === 'string' ? resolvedParams.tab : undefined;

  return (
    <main className="min-h-screen bg-[#050505] font-sans">
      <HeroMilwaukee />
      <TrustBar />
      <PipelineCarousel />
      <SystemsExplorer />
      <PackoutBanner />
      <Suspense fallback={<SkeletonGrid />}>
        <AccessoriesGrid category={tab} />
      </Suspense>
      <OneKeySection />
      <DealerBanner />
      <FloatingContact />
    </main>
  );
}
