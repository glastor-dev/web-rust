'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Clock, ArrowUpRight, BookOpen, Terminal, Mail, ChevronDown } from 'lucide-react';
import { TECH_ARTICLES, type TechFilter, type Intent } from '@/data/articles.data';

const PILLAR_ITEMS: { id: Intent; label: string; description: string }[] = [
  { id: 'todos', label: 'Todos', description: 'Explorar todo el laboratorio técnico.' },
  {
    id: 'evaluar',
    label: 'Evaluar tecnología',
    description: 'Benchmarks, trade-offs y arquitectura.',
  },
  { id: 'migrar', label: 'Migrar sistemas', description: 'Modernización sin cortes ni riesgo.' },
  {
    id: 'optimizar',
    label: 'Optimizar rendimiento',
    description: 'Latencia, memoria y throughput.',
  },
  {
    id: 'contratar',
    label: 'Contratar solución',
    description: 'Documentación técnica para involucrar a Glastor.',
  },
];

const TECH_FILTERS: { id: TechFilter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'rust', label: 'Rust' },
  { id: 'docker', label: 'Docker' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'postgresql', label: 'PostgreSQL' },
];

export default function Recursos() {
  const searchParams = useSearchParams();
  const initialTech = (searchParams.get('tech') as TechFilter) || 'todos';
  const initialPillar = (searchParams.get('pillar') as Intent) || 'todos';
  const [tech, setTech] = useState<TechFilter>(initialTech);
  const [pillar, setPillar] = useState<Intent>(initialPillar);

  useEffect(() => {
    const nextTech = ((searchParams.get('tech') as TechFilter) || 'todos') as TechFilter;
    const nextPillar = ((searchParams.get('pillar') as Intent) || 'todos') as Intent;
    setTech(nextTech);
    setPillar(nextPillar);
  }, [searchParams]);

  const visibleItems = TECH_ARTICLES.filter((item) => {
    const matchesTech = tech === 'todos' || item.tech === tech;
    const matchesPillar = pillar === 'todos' || item.pillar === pillar;
    return matchesTech && matchesPillar;
  });

  const activeCounts = TECH_ARTICLES.reduce<Record<string, number>>((acc, item) => {
    const key = item.pillar;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-transparent min-h-screen pb-32">
      <PageHero
        badge="Glastor Labs & RFDs Técnicos"
        title={
          <span>
            RECURSOS<span className="text-brand">.</span>
          </span>
        }
        titleClass="text-[clamp(2.5rem,8vw,5rem)]"
        description="Ingeniería pura, arquitectura sin filtros y deep-dives técnicos en Rust para CTOs y desarrolladores de élite."
        minHeight="min-h-[40vh]"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-4 space-y-6">
            <div className="border border-white/10 bg-[#0a0a0a] p-6">
              <div className="flex items-center gap-2 text-brand mb-4">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span className="text-[10px] font-mono uppercase tracking-widest">
                  Ruta sugerida
                </span>
              </div>
              <p className="text-zinc-300 text-sm mb-5 leading-relaxed">
                Elige tu objetivo y accede primero a deep-dives tácticos, no solo contenido teórico.
              </p>
              <div className="space-y-2">
                {PILLAR_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const nextPillar = item.id as Intent;
                      if (item.id === 'todos' || pillar === item.id) {
                        setPillar('todos');
                        return;
                      }
                      setTech('todos');
                      setPillar(nextPillar);
                    }}
                    className={`w-full text-left px-4 py-3 border flex items-center justify-between gap-3 transition-all duration-300 cursor-pointer ${
                      pillar === item.id
                        ? 'border-brand bg-brand/10 text-white'
                        : 'border-white/10 hover:border-brand/50 text-zinc-300'
                    }`}
                  >
                    <span>
                      <span className="text-xs font-mono uppercase tracking-widest block">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-zinc-400 leading-snug">
                        {item.description}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {item.id === 'todos' ? TECH_ARTICLES.length : activeCounts[item.id] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <a
              href="mailto:founder@glastor.es"
              className="block border border-white/10 bg-[#0a0a0a] p-6 group hover:border-brand/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-brand mb-2">
                <Terminal className="w-4 h-4" aria-hidden="true" />
                <span className="text-[10px] font-mono uppercase tracking-widest">
                  ¿Tienes un problema ahora?
                </span>
              </div>
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                Si vienes desde un artículo técnico, podemos revisar tu caso en menos de 24h.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 group-hover:text-brand transition-colors">
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                Hablar con un ingeniero
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </a>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-8 xl:col-span-8">
            <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-white/10 pb-8">
              <span className="text-xs font-mono text-zinc-400 tracking-widest mr-2">
                Tecnología:
              </span>
              {TECH_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setTech(f.id)}
                  className={`px-4 py-2 font-mono text-xs tracking-widest border transition-all duration-300 cursor-pointer ${
                    tech === f.id
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-white/20 text-zinc-400 hover:border-brand hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {visibleItems.length > 0 ? (
                visibleItems.map((article, index) => {
                  const pillarItem = PILLAR_ITEMS.find((item) => item.id === article.pillar);

                  return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="h-full"
                    >
                      <Link
                        href={`/recursos/${article.id}`}
                        className="group relative bg-[#0a0a0a] border border-white/10 p-8 hover:border-brand/50 transition-colors duration-500 flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <div className="flex justify-between items-start gap-2 mb-6">
                          <div className="flex flex-wrap gap-2">
                            <span className="text-[10px] font-mono text-black bg-brand font-bold uppercase tracking-widest px-2 py-1">
                              {article.rfdId}
                            </span>
                            {article.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono text-brand uppercase tracking-widest px-2 py-1 bg-brand/5 border border-brand/20"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-zinc-400 font-mono text-[10px] uppercase tracking-widest shrink-0">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {article.readTime}
                          </div>
                        </div>

                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h3 className="text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-brand transition-colors duration-300 line-clamp-2">
                            {article.title}
                          </h3>
                          <span className="mt-1 text-[9px] font-mono text-zinc-400 border border-white/10 px-2 py-1 uppercase tracking-widest leading-tight shrink-0">
                            {pillarItem?.label}
                          </span>
                        </div>

                        <p className="text-zinc-400 font-mono text-sm mb-8 line-clamp-3 grow">
                          {article.excerpt}
                        </p>

                        <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-auto">
                          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                            {article.date}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-zinc-400 group-hover:text-brand transition-colors hidden md:inline-flex items-center gap-1">
                              <ChevronDown className="w-3 h-3 -rotate-90" aria-hidden="true" />
                              Leer RFD completo
                            </span>
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors duration-300">
                              <ArrowUpRight
                                className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-24 text-center border border-white/10 border-dashed md:col-span-2">
                  <p className="text-zinc-400 font-mono uppercase tracking-widest">
                    No hay artículos publicados en esta categoría todavía.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cierre y Conversión */}
      <FinalCTA />
    </div>
  );
}
