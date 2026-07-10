import type { ProjectCategory } from '../../../lib/data/caseStudies';

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
  return (
    <section className="py-12 border-b border-white/10 bg-[#050505] sticky top-[72px] z-40 backdrop-blur-xl bg-opacity-90">
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
