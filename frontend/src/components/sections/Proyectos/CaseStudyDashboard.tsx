'use client';

import { motion } from 'motion/react';
import type { CaseStudy } from '../../../lib/data/caseStudies';
import {
  Alert01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
  Settings02Icon,
  Clock01Icon,
  Coins01Icon,
} from 'hugeicons-react';

export function CaseStudyDashboard({ study }: { study: CaseStudy }) {
  // Extract main results for the bottom cards
  const uptime = study.resultsInfra?.find((r) => r.includes('Uptime')) || '99.99% Uptime';
  const cost =
    study.resultsCost?.find((r) => r.includes('Costo') || r.includes('Servidores')) ||
    study.resultsInfra?.find((r) => r.includes('Costo') || r.includes('Servidores')) ||
    'Reducción Costos';
  const perf =
    study.resultsPerformance?.find(
      (r) => r.includes('Latencia') || r.includes('Throughput') || r.includes('Productividad'),
    ) || 'Mejora Rendimiento';

  const parseValue = (text: string) => {
    // Attempt to extract the "After" or final value from strings like "Old -> New" or "Label: New"
    const match =
      text.match(/→\s*(.*?)\s*\(/) ||
      text.match(/:\s*(.*?)→/) ||
      text.match(/→\s*(.*)/) ||
      text.match(/:\s*(.*)/);
    return match ? match[1].trim() : text;
  };

  const afterItems =
    study.solutionArchitecture ||
    study.solutionOptimizations ||
    study.solutionPhases?.[1]?.points ||
    study.solutionPhases?.[0]?.points ||
    [];

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel p-8 md:p-12 border-white/10 bg-[#0A0A0A] relative overflow-hidden my-16 shadow-[0_0_50px_rgba(0,255,102,0.03)]">
      {/* Decorative Blur */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-brand font-mono tracking-widest text-xs mb-2">Caso de Éxito</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {study.title}
          </h3>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            {study.solutionText}
          </p>
        </div>

        {/* Before / After Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#0A0A0A] p-2 rounded-full border border-white/10">
              <ArrowRight01Icon className="w-6 h-6 text-brand" />
            </div>
          </div>

          {/* Before (Red) */}
          <div className="p-6 md:p-8 border border-red-500/20 bg-linear-to-b from-red-950/10 to-transparent rounded-xl shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
            <h4 className="text-red-500 font-black tracking-widest text-center mb-6 border-b border-red-500/10 pb-4 text-lg">
              Antes
            </h4>
            <ul className="space-y-4">
              {study.challenge.slice(1, 5).map((point, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-zinc-300 text-sm font-mono bg-black p-3 rounded-md border border-white/5"
                >
                  <span className="truncate pr-4">{point.split(':')[0] || point}</span>
                  <Alert01Icon className="text-red-500 w-4 h-4 shrink-0" />
                </li>
              ))}
            </ul>
          </div>

          {/* After (Green) */}
          <div className="p-6 md:p-8 border border-brand/30 bg-linear-to-b from-brand/5 to-transparent rounded-xl shadow-[inset_0_0_20px_rgba(0,255,102,0.05)]">
            <h4 className="text-brand font-black tracking-widest text-center mb-6 border-b border-brand/10 pb-4 text-lg">
              Después
            </h4>
            <ul className="space-y-4">
              {afterItems.slice(0, 4).map((item, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-white text-sm font-mono bg-black/40 p-3 rounded-md border border-white/5"
                >
                  <span className="truncate pr-4">{item.split('con')[0] || item}</span>
                  <CheckmarkCircle01Icon className="text-brand w-4 h-4 shrink-0" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        {study.solutionPhases && (
          <div className="mb-16 relative mt-16 pt-8 border-t border-white/5">
            <div className="text-center mb-8 text-white font-black text-lg uppercase tracking-tighter">
              {study.duration}
            </div>

            {/* The line */}
            <div className="relative flex justify-between items-start px-4 md:px-12">
              <div className="absolute top-2 left-8 right-8 h-1 bg-zinc-800 z-0"></div>
              <div className="absolute top-2 left-8 right-8 h-1 bg-brand z-0 shadow-[0_0_10px_#00ff66]"></div>

              {study.solutionPhases.slice(0, 4).map((phase, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center w-1/4">
                  <div className="w-5 h-5 bg-black border-4 border-brand rounded-full shadow-[0_0_15px_#00ff66] mb-4"></div>
                  <div className="text-center px-2">
                    <div className="text-[10px] md:text-xs text-zinc-400 font-mono mb-1">
                      Fase {i + 1}
                    </div>
                    <div className="text-[10px] md:text-sm text-white font-bold leading-tight">
                      {phase.title.replace(/Fase \d+:\s*/, '')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-5 text-center border-white/5 bg-linear-to-b from-[#111] to-[#050505] shadow-lg rounded-xl hover:border-brand/30 transition-colors">
            <ArrowRight01Icon className="w-6 h-6 text-brand mx-auto mb-3" />
            <div className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1">
              {parseValue(uptime)}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Uptime
            </div>
          </div>
          <div className="glass-panel p-5 text-center border-white/5 bg-linear-to-b from-[#111] to-[#050505] shadow-lg rounded-xl hover:border-brand/30 transition-colors">
            <Settings02Icon className="w-6 h-6 text-brand mx-auto mb-3" />
            <div className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1">
              {parseValue(perf)}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Mejora Prod.
            </div>
          </div>
          <div className="glass-panel p-5 text-center border-white/5 bg-linear-to-b from-[#111] to-[#050505] shadow-lg rounded-xl hover:border-brand/30 transition-colors">
            <Clock01Icon className="w-6 h-6 text-brand mx-auto mb-3" />
            <div className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1">
              {study.roi ? study.roi.split(' ')[2] || '70%' : '70%'}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Retorno (ROI)
            </div>
          </div>
          <div className="glass-panel p-5 text-center border-white/5 bg-linear-to-b from-[#111] to-[#050505] shadow-lg rounded-xl hover:border-brand/30 transition-colors">
            <Coins01Icon className="w-6 h-6 text-brand mx-auto mb-3" />
            <div className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1">
              {parseValue(cost)}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Ahorro Infra.
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12 p-4 bg-white/5 rounded-lg border border-white/5">
          {['Frontend', 'Backend', 'Database', 'DevOps'].map((layer, idx) => {
            const techs = study.technologies.split(',');
            // Mock matching layer to tech just for visual
            const tech = techs[idx] || techs[0];
            return (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest w-16 text-right">
                  {layer}
                </span>
                <span className="text-xs font-mono text-white bg-black border border-white/10 px-4 py-1.5 rounded-sm flex-1 text-center">
                  {tech.trim()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
