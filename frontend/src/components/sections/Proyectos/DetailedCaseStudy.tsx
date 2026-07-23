'use client';

import { motion } from 'motion/react';
import type { CaseStudy } from '../../../lib/data/caseStudies';
import { Building2, Calendar, Zap } from 'lucide-react';
import { ArchitectureDiagram } from '../../ui/ArchitectureDiagram';
import { CaseStudyDashboard } from './CaseStudyDashboard';
import { CaseStudyTestimonial } from './CaseStudyTestimonial';
import { CaseStudyCTA } from './CaseStudyCTA';

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
      className="py-24 md:py-32 border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* Left Column (Sticky Sidebar) */}
          <div className="xl:col-span-4 xl:sticky xl:top-32 shrink-0">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center gap-2 text-zinc-300 text-[10px] font-mono tracking-widest uppercase bg-white/5 px-3 py-1.5 border border-white/10">
                <Building2 className="w-3.5 h-3.5" />
                {study.industry}
              </span>
              {study.categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-brand text-[10px] font-mono tracking-widest uppercase bg-brand/5 px-3 py-1.5 border border-brand/20"
                >
                  {cat}
                </span>
              ))}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              {study.title}
            </h2>

            <p className="text-zinc-300 text-base md:text-lg mb-8 leading-relaxed">
              {study.solutionText}
            </p>

            <div className="flex flex-col gap-4 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-8 border-l-2 border-white/10 pl-4">
              <span className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-brand" />
                <span className="text-white">Tiempo:</span> {study.duration}
              </span>
              <span className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-brand" />
                <span className="text-white">Inversión:</span> {study.investment}
              </span>
              {study.roi && (
                <span className="flex items-center gap-3 mt-2 text-brand">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold border-b border-brand/30">ROI: {study.roi}</span>
                </span>
              )}
            </div>

            <p className="text-sm text-zinc-500 font-mono bg-white/5 p-4 rounded-sm border border-white/5 leading-relaxed">
              <strong className="block text-white mb-2">Tecnologías Clave:</strong>
              {study.technologies}
            </p>
          </div>

          {/* Right Column (Scrollable Content) */}
          <div className="xl:col-span-8 flex flex-col gap-16 md:gap-24 min-w-0">
            
            {/* High-Conversion Dashboard */}
            <div className="w-full">
              <CaseStudyDashboard study={study} />
            </div>

            {/* Architecture Diagram */}
            {study.architectureDiagram && (
              <div className="w-full mt-8">
                <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-black text-white mb-[clamp(1.5rem,4vw,2.5rem)] tracking-tighter">
                  Arquitectura del Sistema
                </h3>
                <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-[clamp(1rem,3vw,2rem)] relative shadow-[inset_0_0_30px_rgba(0,255,102,0.02)]">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[80px] pointer-events-none rounded-full"></div>
                  <div className="relative z-10 w-full">
                    <ArchitectureDiagram nodes={study.architectureDiagram} />
                  </div>
                </div>
              </div>
            )}

            {/* Testimonial Section */}
            {study.testimonial && (
              <div className="w-full">
                <CaseStudyTestimonial testimonial={study.testimonial} />
              </div>
            )}
          </div>
        </div>

        {/* High-Converting CTA (Full width at bottom) */}
        {index === 0 && (
          <div className="mt-24 w-full">
            <CaseStudyCTA />
          </div>
        )}
      </div>
    </motion.article>
  );
}
