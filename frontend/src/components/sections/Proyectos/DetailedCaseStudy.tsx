'use client';

import { motion } from 'motion/react';
import type { CaseStudy } from '../../../lib/data/caseStudies';
import { CheckCircle2Icon, Quote, Building2, Calendar, Zap } from 'lucide-react';
import { Button } from '../../reutilizables/button';
import { ArchitectureDiagram } from '../../ui/ArchitectureDiagram';
import { CaseStudyDashboard } from './CaseStudyDashboard';

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[0.9]">
            {study.title}
          </h2>

          <div className="mt-5 flex flex-wrap gap-6 text-xs font-mono text-zinc-400 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-brand" />
              {study.duration}
            </span>
            <span className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-brand" />
              {study.investment}
            </span>
            {study.roi && (
              <span className="flex items-center gap-2 border border-brand/20 bg-brand/5 text-brand px-2 py-1">
                <Zap className="w-3.5 h-3.5" />
                ROI: {study.roi}
              </span>
            )}
          </div>

          <p className="mt-4 text-sm text-zinc-400 font-mono">{study.technologies}</p>
        </div>

        {/* High-Conversion Dashboard (Business & Metrics First) */}
        <CaseStudyDashboard study={study} />

        {/* Architecture Diagram (Full Width - Technical Detail Second) */}
        {study.architectureDiagram && (
          <div className="mt-16 mb-16">
            <h3 className="flex items-center gap-3 text-xl font-bold tracking-widest text-white mb-6 pb-2 border-b border-white/10">
              <Zap className="text-brand w-6 h-6" />
              Arquitectura del Sistema
            </h3>
            <ArchitectureDiagram nodes={study.architectureDiagram} />
          </div>
        )}

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
            <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
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
