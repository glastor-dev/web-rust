'use client';

import { useMemo, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import type { ProjectCategory } from '../../../lib/data/caseStudies';
import { caseStudies } from '../../../lib/data/caseStudies';

interface ProjectsFilterSectionProps {
  activeCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}

const categories: ProjectCategory[] = [
  'Todos',
  'Rust',
  'Servidores',
  'Migraciones',
  'Optimización',
  'Infraestructura',
];

export function ProjectsFilterSection({
  activeCategory,
  onSelectCategory,
}: ProjectsFilterSectionProps) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // Header se oculta, el filtro sube a top-0
    } else {
      setHidden(false); // Header visible, el filtro baja a top-14
    }
  });

  const counts = useMemo(() => {
    const map: Record<string, number> = { Todos: caseStudies.length };
    for (const study of caseStudies) {
      for (const cat of study.categories) {
        map[cat] = (map[cat] || 0) + 1;
      }
    }
    return map;
  }, []);

  return (
    <section 
      className={`py-6 border-b border-white/10 bg-[#050505] sticky z-40 transition-all duration-300 ${
        hidden ? 'top-0' : 'top-14'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-2 text-sm font-mono uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === category
                    ? 'border-brand text-brand bg-brand/5 shadow-[0_0_15px_rgba(0,255,102,0.15)]'
                    : 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {category}
                <span className="text-[10px] font-mono text-zinc-500 ml-2">
                  {counts[category] ?? 0}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 text-sm font-mono text-zinc-400 border-l border-white/10 pl-6">
            <div>
              <div className="text-white font-bold text-lg">150+</div>
              <div className="text-xs">proyectos</div>
            </div>
            <div>
              <div className="text-brand font-bold text-lg">99.97%</div>
              <div className="text-xs">uptime</div>
            </div>
            <div>
              <div className="text-brand font-bold text-lg">85%</div>
              <div className="text-xs">- latencia</div>
            </div>
            <div>
              <div className="text-brand font-bold text-lg">60%</div>
              <div className="text-xs">ahorro infra</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
