'use client';

import { motion } from 'motion/react';
import { Card } from '../../reutilizables/card';
import { CheckIcon, Search, Filter } from 'lucide-react';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function ModuleGrid() {
  const {
    availableModules,
    selectedModuleIds,
    toggleModule,
    searchQuery,
    categoryFilter,
    setSearchQuery,
    setCategoryFilter,
  } = useConfiguratorStore();

  const categories = Array.from(new Set(availableModules.map((m) => m.category))).sort();

  const visibleModules = availableModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || module.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-4 bg-[#0a0a0a] border border-white/10 rounded-none">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar módulo por título o descripción..."
              className="w-full bg-black border border-white/10 rounded-none py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-brand font-mono text-xs uppercase tracking-widest"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`whitespace-nowrap px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors border ${
                categoryFilter === 'all'
                  ? 'bg-brand text-black border-brand'
                  : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`whitespace-nowrap px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors border ${
                  categoryFilter === cat
                    ? 'bg-brand text-black border-brand'
                    : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleModules.map((module) => {
          const isSelected = selectedModuleIds.includes(module.id);
          return (
            <motion.div
              key={module.id}
              layout
              onClick={() => toggleModule(module.id)}
              className="cursor-pointer h-full"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Card
                className={`h-full p-6 transition-all duration-300 border-2 rounded-none relative overflow-hidden flex flex-col ${
                  isSelected
                    ? 'border-brand bg-brand/5 shadow-[0_0_30px_rgba(0,255,102,0.15)]'
                    : 'border-white/10 bg-black hover:border-white/30'
                }`}
              >
                <div
                  className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-brand bg-brand text-black' : 'border-white/20'
                  }`}
                >
                  {isSelected && <CheckIcon size={14} strokeWidth={4} />}
                </div>

                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
                  {module.category}
                </div>

                <h3
                  className={`text-xl font-extrabold tracking-tight mb-3 transition-colors ${
                    isSelected ? 'text-white' : 'text-zinc-300'
                  }`}
                >
                  {module.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8 grow">
                  {module.description}
                </p>

                <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                      Base
                    </span>
                    <span
                      className={`font-mono font-bold ${isSelected ? 'text-brand' : 'text-zinc-300'}`}
                    >
                      ${module.base_price.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                      Tiempo
                    </span>
                    <span className="text-zinc-300 text-sm font-bold">
                      {module.min_weeks}-{module.max_weeks} Semanas
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
