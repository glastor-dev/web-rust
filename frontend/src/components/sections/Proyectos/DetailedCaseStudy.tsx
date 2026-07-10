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
} from 'lucide-react';
import { Button } from '../../reutilizables/button';

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
          <div className="flex flex-wrap gap-2 mb-6">
            {study.categories.map((cat, i) => (
              <span
                key={i}
                className="text-brand text-xs font-mono tracking-widest uppercase bg-brand/5 px-3 py-1 border border-brand/20"
              >
                {cat}
              </span>
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            {study.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Challenge & Solution */}
          <div className="lg:col-span-7 space-y-16">
            {/* Challenge */}
            <section>
              <h3 className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest text-white mb-6 pb-2 border-b border-white/10">
                <AlertCircle className="text-red-500 w-6 h-6" />
                El Desafío
              </h3>
              <ul className="space-y-4">
                {study.challenge.map((point, i) => (
                  <li
                    key={i}
                    className="text-zinc-400 text-lg leading-relaxed flex items-start gap-3"
                  >
                    <span className="text-red-500/50 mt-1">●</span>
                    {point}
                  </li>
                ))}
              </ul>
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
                <div className="space-y-6">
                  {study.solutionPhases.map((phase, i) => (
                    <div key={i} className="glass-panel p-6 border-editorial">
                      <h4 className="text-white font-bold mb-4 uppercase tracking-tight">
                        {phase.title}
                      </h4>
                      <ul className="space-y-2">
                        {phase.points.map((point, j) => (
                          <li key={j} className="text-zinc-400 text-sm flex items-start gap-2">
                            <span className="text-brand mt-0.5">›</span>
                            {point}
                          </li>
                        ))}
                      </ul>
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

                <div className="space-y-8">
                  {study.resultsPerformance && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-widest">
                        Rendimiento
                      </h4>
                      <ul className="space-y-3">
                        {study.resultsPerformance.map((res, i) => (
                          <li
                            key={i}
                            className="text-sm text-white font-medium"
                            dangerouslySetInnerHTML={{
                              __html: res
                                .replace(/→/g, '<span class="text-brand mx-2">→</span>')
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<span class="text-brand font-bold">$1</span>',
                                ),
                            }}
                          />
                        ))}
                      </ul>
                    </div>
                  )}

                  {study.resultsInfra && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-widest">
                        Infraestructura
                      </h4>
                      <ul className="space-y-3">
                        {study.resultsInfra.map((res, i) => (
                          <li
                            key={i}
                            className="text-sm text-white font-medium"
                            dangerouslySetInnerHTML={{
                              __html: res
                                .replace(/→/g, '<span class="text-brand mx-2">→</span>')
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<span class="text-brand font-bold">$1</span>',
                                ),
                            }}
                          />
                        ))}
                      </ul>
                    </div>
                  )}

                  {study.resultsCost && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-widest">
                        Costos
                      </h4>
                      <ul className="space-y-3">
                        {study.resultsCost.map((res, i) => (
                          <li
                            key={i}
                            className="text-sm text-white font-medium"
                            dangerouslySetInnerHTML={{
                              __html: res
                                .replace(/→/g, '<span class="text-brand mx-2">→</span>')
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<span class="text-brand font-bold">$1</span>',
                                ),
                            }}
                          />
                        ))}
                      </ul>
                    </div>
                  )}

                  {study.resultsScalability && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-widest">
                        Escalabilidad
                      </h4>
                      <ul className="space-y-3">
                        {study.resultsScalability.map((res, i) => (
                          <li
                            key={i}
                            className="text-sm text-white font-medium"
                            dangerouslySetInnerHTML={{
                              __html: res
                                .replace(/→/g, '<span class="text-brand mx-2">→</span>')
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<span class="text-brand font-bold">$1</span>',
                                ),
                            }}
                          />
                        ))}
                      </ul>
                    </div>
                  )}

                  {study.resultsTech && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-widest">
                        Técnico
                      </h4>
                      <ul className="space-y-3">
                        {study.resultsTech.map((res, i) => (
                          <li
                            key={i}
                            className="text-sm text-white font-medium"
                            dangerouslySetInnerHTML={{
                              __html: res
                                .replace(/→/g, '<span class="text-brand mx-2">→</span>')
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<span class="text-brand font-bold">$1</span>',
                                ),
                            }}
                          />
                        ))}
                      </ul>
                    </div>
                  )}

                  {study.resultsOperative && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-widest">
                        Operativo
                      </h4>
                      <ul className="space-y-3">
                        {study.resultsOperative.map((res, i) => (
                          <li
                            key={i}
                            className="text-sm text-white font-medium"
                            dangerouslySetInnerHTML={{
                              __html: res
                                .replace(/→/g, '<span class="text-brand mx-2">→</span>')
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<span class="text-brand font-bold">$1</span>',
                                ),
                            }}
                          />
                        ))}
                      </ul>
                    </div>
                  )}

                  {study.resultsBusiness && (
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-500 mb-3 tracking-widest">
                        Negocio
                      </h4>
                      <ul className="space-y-3">
                        {study.resultsBusiness.map((res, i) => (
                          <li key={i} className="text-sm text-white font-medium">
                            <span className="text-brand mr-2 font-bold">+</span>
                            {res}
                          </li>
                        ))}
                      </ul>
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

        {/* Action (Only on last item ideally, but we can put it on all or just one) */}
        {index === 0 && (
          <div className="mt-16 text-center lg:text-left">
            <Button asChild variant="outline" className="w-full sm:w-auto justify-center">
              <a href="#contacto">Solicitar proyecto similar</a>
            </Button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
