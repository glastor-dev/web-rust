import { motion } from 'motion/react';
import type { CaseStudy } from '../../../lib/data/caseStudies';
import {
  CheckCircle2Icon,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Zap,
  Clock,
  Banknote,
  Quote,
  Building2,
  Calendar,
} from 'lucide-react';
import { Button } from '../../reutilizables/button';
import { ArchitectureDiagram } from '../../ui/ArchitectureDiagram';

// Función para parsear métricas (A → B) en Stat Cards masivas
const renderStatCard = (text: string, index: number) => {
  const match = text.match(/^(.*?):\s*(.*?)→(.*?)\s*\((.*?)\)$/);
  if (match) {
    const [, label, oldVal, newVal, highlight] = match;
    return (
      <div
        key={index}
        className="glass-panel p-6 border-white/5 bg-zinc-900/20 hover:border-brand/20 hover:bg-brand/5 transition-all"
      >
        <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
          {label.trim()}
        </div>
        <div className="flex flex-wrap items-baseline gap-3 mb-3">
          <span className="text-3xl lg:text-4xl font-black text-brand tracking-tighter">
            {newVal.trim()}
          </span>
          <span className="text-lg text-zinc-600 line-through font-mono">{oldVal.trim()}</span>
        </div>
        <div className="inline-block px-2 py-1 bg-brand/10 text-brand text-[10px] font-bold rounded-sm uppercase tracking-widest">
          {highlight.trim()}
        </div>
      </div>
    );
  }

  // Fallback para métricas simples o sin patrón exacto
  return (
    <div
      key={index}
      className="glass-panel p-4 border-editorial text-sm text-zinc-300 flex items-start gap-3 hover:border-white/20 transition-colors"
    >
      <CheckCircle2Icon className="w-4 h-4 text-brand/70 shrink-0 mt-0.5" />
      <span
        dangerouslySetInnerHTML={{
          __html: text.replace(/\*\*(.*?)\*\*/g, '<span class="text-brand font-bold">$1</span>'),
        }}
      />
    </div>
  );
};

interface DetailedCaseStudyProps {
  study: CaseStudy;
  index: number;
}

export function DetailedCaseStudy({ study, index }: DetailedCaseStudyProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="py-24 border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 max-w-4xl">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="flex items-center gap-2 text-zinc-300 text-xs font-mono tracking-widest uppercase bg-white/5 px-3 py-1.5 border border-white/10">
              <Building2 className="w-3.5 h-3.5" />
              {study.industry}
            </span>
            {study.categories.map((cat, i) => (
              <span
                key={i}
                className="text-brand text-xs font-mono tracking-widest uppercase bg-brand/5 px-3 py-1.5 border border-brand/20"
              >
                {cat}
              </span>
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            {study.title}
          </h2>
        </div>

        {/* Architecture Diagram (Full Width) */}
        {study.architectureDiagram && (
          <div className="mb-16">
            <h3 className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest text-white mb-6 pb-2 border-b border-white/10">
              <Zap className="text-brand w-6 h-6" />
              Arquitectura del Sistema
            </h3>
            <ArchitectureDiagram nodes={study.architectureDiagram} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Challenge & Solution */}
          <div className="lg:col-span-7 space-y-16">
            {/* Challenge */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest text-white mb-6 pb-2 border-b border-white/10">
                <AlertCircle className="text-red-500 w-6 h-6" />
                El Desafío
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.challenge.map((point, i) => (
                  <div
                    key={i}
                    className="glass-panel p-5 border-red-500/20 bg-red-950/10 hover:bg-red-950/20 transition-colors flex items-start gap-4 rounded-md"
                  >
                    <div className="bg-red-500/10 p-2 rounded-full shrink-0 mt-1">
                      <AlertCircle className="text-red-500 w-4 h-4" />
                    </div>
                    <span className="text-zinc-300 text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Solution */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest text-white mb-6 pb-2 border-b border-white/10">
                <CheckCircle2Icon className="text-brand w-6 h-6" />
                La Solución
              </h3>
              <p className="text-zinc-300 text-lg mb-8">{study.solutionText}</p>

              {study.solutionArchitecture && (
                <div className="mb-8">
                  <h4 className="text-sm font-mono uppercase text-brand mb-4 tracking-widest">
                    Arquitectura:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {study.solutionArchitecture.map((item, i) => (
                      <li
                        key={i}
                        className="glass-panel p-4 border-editorial text-sm text-zinc-300 flex items-start gap-2"
                      >
                        <ArrowRight className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {study.solutionOptimizations && (
                <div className="mb-8">
                  <h4 className="text-sm font-mono uppercase text-brand mb-4 tracking-widest">
                    Optimizaciones clave:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {study.solutionOptimizations.map((item, i) => (
                      <li
                        key={i}
                        className="glass-panel p-4 border-editorial text-sm text-zinc-300 flex items-start gap-2"
                      >
                        <Zap className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {study.solutionPhases && (
                <div className="mt-12 relative border-l-2 border-zinc-800/50 ml-4 space-y-8 pb-4">
                  {study.solutionPhases.map((phase, i) => (
                    <div key={i} className="relative pl-8 group">
                      {/* Nodo Brillante */}
                      <div className="absolute w-4 h-4 rounded-full bg-zinc-800 border-2 border-[#0A0A0A] left-[-9px] top-1 group-hover:bg-brand group-hover:shadow-[0_0_12px_#00ff66] transition-all duration-300 z-10" />

                      <div className="glass-panel p-6 border-editorial group-hover:border-brand/30 transition-colors shadow-lg">
                        <h4 className="text-white font-bold mb-4 uppercase tracking-tight text-sm flex items-center gap-3">
                          <span className="text-brand font-mono bg-brand/10 px-2 py-1 rounded-sm text-xs">
                            Fase 0{i + 1}
                          </span>
                          {phase.title.replace(/Fase \d+:\s*/, '')}{' '}
                          {/* Limpiamos el texto duplicado si existe */}
                        </h4>
                        <ul className="space-y-3">
                          {phase.points.map((point, j) => (
                            <li key={j} className="text-zinc-400 text-sm flex items-start gap-3">
                              <CheckCircle2Icon className="w-4 h-4 text-brand/70 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Results & Meta */}
          <div className="lg:col-span-5">
            <div className="sticky top-40 space-y-8">
              {/* Results Panel */}
              <div className="glass-panel p-8 border-brand/30 shadow-[0_0_30px_rgba(0,255,102,0.05)] bg-[#0A0A0A]">
                <h3 className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest text-white mb-8 pb-4 border-b border-white/10">
                  <TrendingUp className="text-brand w-6 h-6" />
                  Resultados
                </h3>

                <div className="space-y-10">
                  {study.resultsPerformance && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-4 tracking-widest border-b border-white/5 pb-2">
                        Rendimiento
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {study.resultsPerformance.map((res, i) => renderStatCard(res, i))}
                      </div>
                    </div>
                  )}

                  {study.resultsInfra && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-4 tracking-widest border-b border-white/5 pb-2">
                        Infraestructura
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {study.resultsInfra.map((res, i) => renderStatCard(res, i))}
                      </div>
                    </div>
                  )}

                  {study.resultsCost && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-4 tracking-widest border-b border-white/5 pb-2">
                        Costos
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {study.resultsCost.map((res, i) => renderStatCard(res, i))}
                      </div>
                    </div>
                  )}

                  {study.resultsScalability && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-4 tracking-widest border-b border-white/5 pb-2">
                        Escalabilidad
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {study.resultsScalability.map((res, i) => renderStatCard(res, i))}
                      </div>
                    </div>
                  )}

                  {study.resultsTech && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-4 tracking-widest border-b border-white/5 pb-2">
                        Técnico
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {study.resultsTech.map((res, i) => renderStatCard(res, i))}
                      </div>
                    </div>
                  )}

                  {study.resultsOperative && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-4 tracking-widest border-b border-white/5 pb-2">
                        Operativo
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {study.resultsOperative.map((res, i) => renderStatCard(res, i))}
                      </div>
                    </div>
                  )}

                  {study.resultsBusiness && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-4 tracking-widest border-b border-white/5 pb-2">
                        Negocio
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {study.resultsBusiness.map((res, i) => renderStatCard(res, i))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Meta Panel */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-6 border-editorial flex flex-col gap-2">
                  <Clock className="w-5 h-5 text-zinc-500" />
                  <span className="text-xs font-mono uppercase text-zinc-500">Duración</span>
                  <span className="text-sm text-white font-medium">{study.duration}</span>
                </div>
                <div className="glass-panel p-6 border-editorial flex flex-col gap-2">
                  <Banknote className="w-5 h-5 text-zinc-500" />
                  <span className="text-xs font-mono uppercase text-zinc-500">Inversión</span>
                  <span className="text-sm text-white font-medium">{study.investment}</span>
                </div>
              </div>

              {study.roi && (
                <div className="glass-panel p-6 border-brand/50 bg-brand/5 text-center">
                  <span className="text-brand font-bold block mb-1">ROI:</span>
                  <span className="text-sm text-white">{study.roi}</span>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-widest">
                  Stack Tecnológico
                </h4>
                <p className="text-sm font-mono text-zinc-300 leading-relaxed">
                  {study.technologies}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        {study.testimonial && (
          <div className="mt-20 glass-panel p-8 md:p-12 border-editorial relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 text-white/5 rotate-12 group-hover:text-brand/5 transition-colors duration-700">
              <Quote size={200} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <Quote className="w-8 h-8 text-brand mx-auto mb-6" />
              <p className="text-xl md:text-3xl font-medium text-white italic leading-relaxed mb-8">
                "{study.testimonial.quote}"
              </p>
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-brand font-bold uppercase tracking-widest font-mono text-sm">
                  {study.testimonial.author}
                </span>
                <span className="text-zinc-400 text-sm">{study.testimonial.role}</span>
              </div>
            </div>
          </div>
        )}

        {/* High-Converting CTA (Only on last item ideally, but we can put it on all or just one) */}
        {index === 0 && (
          <div className="mt-24 p-8 md:p-16 bg-brand text-black rounded-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 leading-tight">
                ¿Tu infraestructura actual es un cuello de botella?
              </h3>
              <p className="text-black/70 text-lg font-medium">
                Hablemos de cómo reducir tu latencia, optimizar costes y escalar tu sistema en los
                próximos 30 días.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Button
                asChild
                size="lg"
                className="bg-black text-brand hover:bg-zinc-900 border-none rounded-none uppercase font-bold tracking-widest flex items-center gap-3 w-full sm:w-auto"
              >
                <a href="#contacto">
                  <Calendar className="w-5 h-5" />
                  Agendar Sesión Técnica
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
