'use client';

import { useState, useMemo, Fragment } from 'react';
import { PageHero } from '@/components/ui/PageHero';

import { caseStudies } from '@/lib/data/caseStudies';
import type { ProjectCategory } from '@/lib/data/caseStudies';

import { ProjectsFilterSection } from '@/components/sections/Proyectos/ProjectsFilterSection';
import { DetailedCaseStudy } from '@/components/sections/Proyectos/DetailedCaseStudy';
import { GlobalMetricsSection } from '@/components/sections/Proyectos/GlobalMetricsSection';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Proyectos() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');

  const filteredStudies = useMemo(() => {
    if (activeCategory === 'Todos') return caseStudies;
    return caseStudies.filter((study) => study.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero */}
      <PageHero
        badge="Casos de Éxito & OSS"
        title={
          <span>
            PROYECTOS<span className="text-brand">.</span>
          </span>
        }
        titleClass="text-[clamp(2.5rem,8vw,5rem)]"
        description="Arquitectura Dual-Core en producción: Proyectos insignia del ecosistema open-source @glastor-core e implementaciones críticas de alta concurrencia en Rust."
        ctaPrimary={{ text: 'Solicitar proyecto similar', href: '#contacto' }}
        minHeight="min-h-150"
        visualElement={
          <div className="relative w-full h-75 lg:h-112 flex items-center justify-center pb-20 lg:pb-0">
            {/* Ambient Glow */}
            <div className="absolute w-72 h-72 bg-brand/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 w-full max-w-md p-6 bg-[#080808] border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,255,102,0.08)]">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                  <span className="text-[10px] font-mono text-zinc-500 ml-2">
                    glastor-core v1.0.0
                  </span>
                </div>
                <span className="text-[9px] font-mono text-brand bg-brand/10 px-2 py-0.5 border border-brand/20">
                  SIMD AVX-512
                </span>
              </div>
              <div className="font-mono text-xs text-zinc-300 space-y-2">
                <p className="text-zinc-500">// Benchmarks en caliente</p>
                <p>
                  <span className="text-brand">$</span> hyper64::encode_simd(payload)
                </p>
                <p className="text-zinc-400 pl-4">
                  → Throughput: <span className="text-white font-bold">25.4 GiB/s</span> [PASSED]
                </p>
                <p>
                  <span className="text-brand">$</span> glastor-core::dispatch_pipeline()
                </p>
                <p className="text-zinc-400 pl-4">
                  → Latencia p99: <span className="text-white font-bold">0.42 ms</span>{' '}
                  [DETERMINISTIC]
                </p>
                <p>
                  <span className="text-brand">$</span> byte-gauge::checksec_audit()
                </p>
                <p className="text-zinc-400 pl-4">
                  → Hardening: <span className="text-brand font-bold">100% RELRO/CANARY/PIE</span>
                </p>
              </div>
            </div>
          </div>
        }
      />

      {/* Nueva Sección de Filtros */}
      <ProjectsFilterSection activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      {/* Lista de Casos Detallados */}
      <div className="bg-[#0A0A0A]">
        {filteredStudies.length > 0 ? (
          filteredStudies.map((study, index) => (
            <Fragment key={`study-wrapper-${study.id}`}>
              <DetailedCaseStudy key={study.id} study={study} index={index} />
            </Fragment>
          ))
        ) : (
          <div className="py-24 text-center text-zinc-500 font-mono">
            No se encontraron proyectos para esta categoría.
            <br />
            <button
              onClick={() => setActiveCategory('Todos')}
              className="mt-4 text-brand hover:text-white transition-colors"
            >
              Ver todos los proyectos
            </button>
          </div>
        )}
      </div>

      {/* Métricas Globales */}
      <GlobalMetricsSection />

      {/* Cierre Comercial & Contacto */}
      <FinalCTA />
    </div>
  );
}
