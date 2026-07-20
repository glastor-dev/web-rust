'use client';

import { motion } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { GithubIcon, ArrowRight01Icon, BookOpen01Icon } from 'hugeicons-react';

const articles = [
  {
    title: 'Por qué Rust destruye a Node.js en latencia p99: Un caso de estudio Fintech',
    category: 'Arquitectura',
    readTime: '8 min read',
    date: 'Oct 12, 2026',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000',
    featured: true,
  },
  {
    title: 'Migrando de microservicios REST a gRPC en entornos de alta concurrencia',
    category: 'Sistemas Distribuidos',
    readTime: '5 min read',
    date: 'Sep 28, 2026',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000',
    featured: false,
  },
];

const ossRepos = [
  {
    name: 'glastor-core',
    description: 'Framework ultra-rápido para microservicios financieros en Rust.',
    stars: '1.2k',
    forks: '234',
  },
  {
    name: 'rust-aws-lambda-utils',
    description: 'Utilidades de zero-cost abstraction para despliegues Serverless.',
    stars: '856',
    forks: '112',
  },
];

export const EngineeringBlogSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#050505] border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeader
            title="Ingeniería y Open Source"
            subtitle="Nuestros arquitectos comparten descubrimientos técnicos, patrones de diseño y librerías open-source que usamos en producción."
          />
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-brand font-mono text-sm tracking-widest hover:text-white transition-colors"
          >
            Ver todo el Hub{' '}
            <ArrowRight01Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-7">
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group block relative h-full min-h-100 rounded-lg overflow-hidden border border-white/10 hover:border-brand/40 transition-colors"
            >
              <div className="absolute inset-0 bg-[#111]">
                <img
                  src={articles[0].image}
                  alt="Article"
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent" />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="flex items-center gap-4 mb-4 text-xs font-mono tracking-widest">
                  <span className="text-brand border border-brand/30 bg-brand/5 px-2 py-1 rounded">
                    {articles[0].category}
                  </span>
                  <span className="text-zinc-500">{articles[0].readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-4 group-hover:text-brand transition-colors">
                  {articles[0].title}
                </h3>
                <p className="text-zinc-400 text-sm">{articles[0].date}</p>
              </div>
            </motion.a>
          </div>

          {/* Right Column: Secondary Article & OSS */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.a
              href="#"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group block bg-[#0a0a0a] rounded-lg border border-white/10 p-6 hover:border-brand/40 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4 text-xs font-mono tracking-widest">
                <span className="text-zinc-300 border border-white/10 px-2 py-1 rounded">
                  {articles[1].category}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-brand transition-colors">
                {articles[1].title}
              </h3>
              <p className="text-zinc-500 text-sm mt-4">
                {articles[1].date} · {articles[1].readTime}
              </p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] rounded-lg border border-white/10 p-6 flex-1 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <GithubIcon className="w-6 h-6 text-white" />
                <h3 className="text-lg font-bold tracking-tight text-white">Contribuciones OSS</h3>
              </div>

              <div className="space-y-6 flex-1">
                {ossRepos.map((repo) => (
                  <div key={repo.name} className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-brand font-mono text-sm tracking-wide group-hover:underline">
                        {repo.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                        <span>★ {repo.stars}</span>
                        <span>⑂ {repo.forks}</span>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{repo.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
