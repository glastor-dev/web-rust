'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { PageHero } from '@/components/ui/PageHero';
import { Clock, ArrowUpRight, BookOpen, Terminal, Mail, ChevronDown } from 'lucide-react';
import Link from 'next/link';

// Tipos
type TechFilter = 'todos' | 'rust' | 'docker' | 'oxc' | 'mongodb';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  tech: TechFilter;
  readTime: string;
  date: string;
  tags: string[];
}

// Editorial pillars / micro funnel modifiers
type Intent = 'evaluar' | 'migrar' | 'optimizar' | 'contratar';

interface EditorialItem {
  id: string;
  title: string;
  excerpt: string;
  tech: TechFilter;
  readTime: string;
  date: string;
  tags: string[];
  pillar: Intent;
}

const MOCK_DATA: EditorialItem[] = [
  {
    id: 'rust-memory',
    title: 'Gestión de memoria en Rust: Evitando leaks en Microservicios Críticos',
    excerpt:
      'Cómo el Borrow Checker asegura la concurrencia a nivel de compilador en clusters HFT sin depender de un Garbage Collector.',
    tech: 'rust',
    readTime: '12 min',
    date: '24 Jun, 2026',
    tags: ['#Memory-Safe', '#Performance'],
    pillar: 'evaluar',
  },
  {
    id: 'docker-optimization',
    title: 'Reduciendo imágenes Docker a 15MB con distroless y Alpine',
    excerpt:
      'Arquitectura de despliegue ultraligero para acelerar el Cold Start en entornos Kubernetes y AWS ECS.',
    tech: 'docker',
    readTime: '8 min',
    date: '15 Jun, 2026',
    tags: ['#DevOps', '#Kubernetes'],
    pillar: 'optimizar',
  },
  {
    id: 'oxc-ast',
    title: 'Parseo de AST ultrarrápido con Oxc en proyectos monolíticos JS',
    excerpt:
      'Sustituyendo Babel y ESLint por Oxc para reducir los tiempos de CI/CD de 20 minutos a 4 segundos.',
    tech: 'oxc',
    readTime: '10 min',
    date: '02 Jun, 2026',
    tags: ['#Tooling', '#CI/CD'],
    pillar: 'evaluar',
  },
  {
    id: 'mongodb-rust-driver',
    title: 'Optimizando el Rust Driver de MongoDB para 100k RPS',
    excerpt:
      'Configuración avanzada de Connection Pools y serialización BSON paralela para sistemas de alta concurrencia.',
    tech: 'mongodb',
    readTime: '15 min',
    date: '18 May, 2026',
    tags: ['#Database', '#Scaling'],
    pillar: 'optimizar',
  },
  {
    id: 'rust-websockets',
    title: 'WebSockets a escala masiva: Tokio + Axum en producción',
    excerpt:
      'Arquitectura event-driven para mantener 1 millón de conexiones concurrentes usando un solo nodo EC2.',
    tech: 'rust',
    readTime: '14 min',
    date: '05 May, 2026',
    tags: ['#Networking', '#Axum'],
    pillar: 'contratar',
  },
  {
    id: 'legacy-migration',
    title: 'Patrones para migrar Oracle/ERP Legacy con doble escritura y rollback',
    excerpt:
      'Estrategia de migración por capas con feature flags, replay de eventos y pruebas canario para plataformas críticas.',
    tech: 'rust',
    readTime: '11 min',
    date: '28 Apr, 2026',
    tags: ['#Migration', '#Reliability'],
    pillar: 'migrar',
  },
];

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

const ITEMS = MOCK_DATA;

const TECH_FILTERS: { id: TechFilter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'rust', label: 'Rust' },
  { id: 'docker', label: 'Docker' },
  { id: 'oxc', label: 'Oxc' },
  { id: 'mongodb', label: 'MongoDB' },
];

export default function Recursos() {
  const searchParams = useSearchParams();
  const setSearchParams = (p: any) => {};
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

  const syncUrl = (nextTech: TechFilter, nextPillar: Intent) => {
    const params: Record<string, string> = {};
    if (nextTech !== 'todos') params.tech = nextTech;
    if (nextPillar !== 'todos') params.pillar = nextPillar;
    setSearchParams(params);
  };

  const visibleItems = ITEMS.filter((item) => {
    const matchesTech = tech === 'todos' || item.tech === tech;
    const matchesPillar = pillar === 'todos' || item.pillar === pillar;
    return matchesTech && matchesPillar;
  });

  const activeCounts = ITEMS.reduce<Record<string, number>>((acc, item) => {
    const key = item.pillar;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#050505] min-h-screen pb-32">
      <PageHero
        title={
          <div>
            Glastor <span className="text-brand">Labs.</span>
          </div>
        }
        description="Ingeniería pura, arquitectura sin filtros y deep-dives técnicos para CTOs y desarrolladores de élite."
        minHeight="min-h-[40vh]"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-4 space-y-6">
            <div className="border border-white/10 bg-[#0a0a0a] p-6">
              <div className="flex items-center gap-2 text-brand mb-4">
                <BookOpen className="w-4 h-4" />
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
                    onClick={() => {
                      const nextTech = tech === 'todos' ? 'todos' : tech;
                      const nextPillar = item.id as Intent;
                      if (item.id === 'todos') {
                        setPillar('todos');
                        syncUrl(tech, 'todos');
                        return;
                      }
                      if (pillar === item.id) {
                        setPillar('todos');
                        syncUrl(tech, 'todos');
                        return;
                      }
                      setTech('todos');
                      setPillar(nextPillar);
                      syncUrl('todos', nextPillar);
                    }}
                    className={`w-full text-left px-4 py-3 border flex items-center justify-between gap-3 transition-all duration-300 ${
                      pillar === item.id
                        ? 'border-brand bg-brand/10 text-white'
                        : 'border-white/10 hover:border-brand/50 text-zinc-300'
                    }`}
                  >
                    <span>
                      <span className="text-xs font-mono uppercase tracking-widest block">
                        {item.label}
                      </span>
                      <span className="text-[11px] text-zinc-500 leading-snug">
                        {item.description}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {activeCounts[item.id] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Link href="/contacto" className="block border border-white/10 bg-[#0a0a0a] p-6 group">
              <div className="flex items-center gap-2 text-brand mb-2">
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest">
                  ¿Tienes un problema ahora?
                </span>
              </div>
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                Si vienes desde un artículo técnico, podemos revisar tu caso en menos de 24h.
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 group-hover:text-brand transition-colors">
                <Mail className="w-3.5 h-3.5" />
                Hablar con un ingeniero
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-8 xl:col-span-8">
            <div className="flex flex-wrap items-center gap-3 mb-10 border-b border-white/10 pb-8">
              <span className="text-xs font-mono text-zinc-500 tracking-widest mr-2">
                Tecnología:
              </span>
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'rust', label: 'Rust' },
                { id: 'docker', label: 'Docker' },
                { id: 'oxc', label: 'Oxc' },
                { id: 'mongodb', label: 'MongoDB' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    const newTech = f.id as TechFilter;
                    setTech(newTech);
                    syncUrl(newTech, pillar);
                  }}
                  className={`px-4 py-2 font-mono text-xs tracking-widest border transition-all duration-300 ${
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
                  const titleNode = (
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 group-hover:text-brand transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>
                      <span className="mt-1 text-[9px] font-mono text-zinc-500 border border-white/10 px-2 py-1 uppercase tracking-widest leading-tight">
                        {pillarItem?.label}
                      </span>
                    </div>
                  );

                  return (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="group relative bg-[#0a0a0a] border border-white/10 p-8 hover:border-brand/50 transition-colors duration-500 flex flex-col h-full cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-2">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono text-brand uppercase tracking-widest px-2 py-1 bg-brand/5 border border-brand/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>

                      {titleNode}

                      <p className="text-zinc-400 font-mono text-sm mb-8 line-clamp-3 grow">
                        {article.excerpt}
                      </p>

                      <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-auto">
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                          {article.date}
                        </span>
                        <div className="flex items-center gap-3">
                          {article.pillar !== 'todos' && (
                            <span className="text-[10px] font-mono text-zinc-500 hidden md:inline-flex items-center gap-1">
                              <ChevronDown className="w-3 h-3" />
                              {article.pillar === 'contratar'
                                ? 'Siguiente paso: presupuesto'
                                : 'Acción recomendada'}
                            </span>
                          )}
                          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors duration-300">
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })
              ) : (
                <div className="col-span-full py-24 text-center border border-white/10 border-dashed md:col-span-2">
                  <p className="text-zinc-500 font-mono uppercase tracking-widest">
                    No hay artículos publicados en esta categoría todavía.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
