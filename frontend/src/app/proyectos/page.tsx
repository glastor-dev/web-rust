'use client';

import { useState, useMemo, Fragment } from 'react';
import { PageHero } from '@/components/ui/PageHero';

import { caseStudies } from '@/lib/data/caseStudies';
import type { ProjectCategory } from '@/lib/data/caseStudies';

import { ProjectsFilterSection } from '@/components/sections/Proyectos/ProjectsFilterSection';
import { DetailedCaseStudy } from '@/components/sections/Proyectos/DetailedCaseStudy';
import { GlobalMetricsSection } from '@/components/sections/Proyectos/GlobalMetricsSection';

const INLINE_CONTACT_ID = 'contacto';
const INLINE_CTA_BEFORE_INDEXES = [1];

const scrollToContact = () => {
  const el = document.getElementById(INLINE_CONTACT_ID);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

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
        title={
          <span className="whitespace-nowrap pr-4">
            PROYECTOS<span className="text-brand">.</span>
          </span>
        }
        titleClass="text-[clamp(3rem,11vw,6rem)] lg:text-[clamp(3rem,4vw,5.5rem)]"
        description="Sistemas en producción desde 2010. Más de 15 años construyendo software crítico. Aquí tienes una muestra de lo que hacemos."
        ctaPrimary={{ text: 'Solicitar proyecto similar', href: '#contacto' }}
        minHeight="min-h-150"
        visualElement={
          <div className="relative w-full h-75 lg:h-112 flex items-center justify-center pb-20 lg:pb-0">
            {/* Ambient Glow behind image */}
            <img
              src="/images/P1.webp"
              alt="Muestra"
              className="absolute w-[45%] lg:w-[35%] rounded-xl shadow-2xl border border-white/5 opacity-50 transition-all duration-700 ease-out hover:opacity-100! hover:scale-110! hover:z-50 z-10 translate-x-[-50%] lg:translate-x-[-70%] translate-y-[20%] -rotate-6 group-hover:translate-x-[-60%] lg:group-hover:translate-x-[-90%] group-hover:-rotate-12"
            />

            {/* Siéntete libre de cambiar la imagen P1.webp por otra del catálogo si lo deseas */}
            <img
              src="/images/P1.webp"
              alt="Muestra de Proyecto"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,255,102,0.15)] hover:scale-105 transition-transform duration-700"
            />
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
              {index > 0 && INLINE_CTA_BEFORE_INDEXES.includes(index) ? (
                <div key={`inline-cta-${index}`} className="py-8">
                  <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="border border-white/10 bg-[#080808] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div>
                        <p className="text-brand font-mono text-xs uppercase tracking-widest mb-2">
                          Siguiente paso recomendado
                        </p>
                        <p className="text-white font-bold text-lg tracking-tight">
                          ¿Quieres un proyecto similar para tu stack?
                        </p>
                        <p className="text-zinc-400 text-sm mt-1">
                          Podemos estimar alcance, timeline y ROI real en una sesión técnica corta.
                        </p>
                      </div>
                      <button
                        onClick={scrollToContact}
                        className="shrink-0 bg-brand text-black font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-white transition-colors"
                      >
                        Agendar sesión técnica
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
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

      {/* Secciones antiguas desactivadas */}
      {/* <MetricsSection /> */}
      {/* <PretextMasonryGrid /> */}
    </div>
  );
}
