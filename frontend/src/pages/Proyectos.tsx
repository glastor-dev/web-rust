import { useState, useMemo } from 'react';
import { PageHero } from '../components/ui/PageHero';
import { SEO } from '../components/SEO';
import { caseStudies } from '../lib/data/caseStudies';
import type { ProjectCategory } from '../lib/data/caseStudies';

import { ProjectsFilterSection } from '../components/sections/Proyectos/ProjectsFilterSection';
import { DetailedCaseStudy } from '../components/sections/Proyectos/DetailedCaseStudy';
import { GlobalMetricsSection } from '../components/sections/Proyectos/GlobalMetricsSection';
// Secciones antiguas (Desactivadas temporalmente según petición)
// import { MetricsSection } from '../components/sections/Proyectos/MetricsSection';
// import { PretextMasonryGrid } from '../components/sections/Proyectos/PretextMasonryGrid';

export default function Proyectos() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');

  const filteredStudies = useMemo(() => {
    if (activeCategory === 'Todos') return caseStudies;
    return caseStudies.filter((study) => study.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO
        title="Proyectos y Casos de Estudio | Glastor"
        description="Sistemas en producción desde 2010. Más de 15 años construyendo software crítico. Explora nuestros casos de éxito."
        url="https://glastor.es/proyectos"
      />

      {/* Hero */}
      <PageHero
        title={
          <>
            PROYECTOS
            <br />
            <span className="text-brand">.</span>
          </>
        }
        titleClass="text-[clamp(3rem,11vw,6rem)] lg:text-[clamp(3rem,4.5vw,6rem)]"
        description="Sistemas en producción desde 2010. Más de 15 años construyendo software crítico. Aquí tienes una muestra de lo que hacemos."
        ctaPrimary={{ text: 'Solicitar proyecto similar', href: '#contacto' }}
        minHeight="min-h-[50vh]"
      />

      {/* Nueva Sección de Filtros */}
      <ProjectsFilterSection activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      {/* Lista de Casos Detallados */}
      <div className="bg-[#0A0A0A]">
        {filteredStudies.length > 0 ? (
          filteredStudies.map((study, index) => (
            <DetailedCaseStudy key={study.id} study={study} index={index} />
          ))
        ) : (
          <div className="py-24 text-center text-zinc-500 font-mono">
            No se encontraron proyectos para esta categoría.
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
