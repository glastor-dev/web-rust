import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/ui/PageHero';
import { SEO } from '../components/SEO';
import { Clock, ArrowUpRight } from 'lucide-react';

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

// Mock Data de Deep Dives
const ARTICLES: Article[] = [
  {
    id: 'rust-memory',
    title: 'Gestión de memoria en Rust: Evitando leaks en Microservicios Críticos',
    excerpt:
      'Cómo el Borrow Checker asegura la concurrencia a nivel de compilador en clusters HFT sin depender de un Garbage Collector.',
    tech: 'rust',
    readTime: '12 min',
    date: '24 Jun, 2026',
    tags: ['#Memory-Safe', '#Performance'],
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
  },
];

export default function Recursos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = (searchParams.get('tech') as TechFilter) || 'todos';
  const [filter, setFilter] = useState<TechFilter>(initialFilter);

  // Sync state with URL if URL changes (e.g. user clicks footer link again while on page)
  useEffect(() => {
    const tech = searchParams.get('tech') as TechFilter;
    if (tech && tech !== filter) {
      setFilter(tech);
    }
  }, [searchParams, filter]);

  // Update URL when filter changes
  const handleFilterChange = (newFilter: TechFilter) => {
    setFilter(newFilter);
    setSearchParams(newFilter === 'todos' ? {} : { tech: newFilter });
  };

  const filteredArticles =
    filter === 'todos' ? ARTICLES : ARTICLES.filter((article) => article.tech === filter);

  const filters: { id: TechFilter; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'rust', label: 'Rust' },
    { id: 'docker', label: 'Docker' },
    { id: 'oxc', label: 'Oxc' },
    { id: 'mongodb', label: 'MongoDB' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#050505] min-h-screen pb-32">
      <SEO
        title="Glastor Labs | Engineering Hub & Deep Dives"
        description="Thought Leadership técnico. Casos de estudio y guías profundas sobre Rust, Docker, Oxc y arquitectura de sistemas distribuidos."
        url="https://glastor.es/recursos"
      />

      <PageHero
        title={
          <div>
            GLASTOR <span className="text-brand">LABS.</span>
          </div>
        }
        description="Ingeniería pura, arquitectura sin filtros y deep-dives técnicos para CTOs y desarrolladores de élite."
        minHeight="min-h-[40vh]"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-16 border-b border-white/10 pb-8">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mr-4">
            Filtrar por Tecnología:
          </span>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all duration-300 ${
                filter === f.id
                  ? 'border-brand bg-brand/10 text-brand'
                  : 'border-white/20 text-zinc-400 hover:border-brand hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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

                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-zinc-100 mb-4 group-hover:text-brand transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-zinc-400 font-mono text-sm mb-8 line-clamp-3 grow">
                  {article.excerpt}
                </p>

                <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-auto">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    {article.date}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-24 text-center border border-white/10 border-dashed">
              <p className="text-zinc-500 font-mono uppercase tracking-widest">
                No hay artículos publicados en esta categoría todavía.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
