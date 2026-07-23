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
  const uptime = study.resultsInfra?.find((r) => r.toLowerCase().includes('uptime')) || 
                 study.resultsTech?.find((r) => r.toLowerCase().includes('uptime')) ||
                 'Uptime: 99.99%';
                 
  const cost =
    study.resultsCost?.find((r) => r.toLowerCase().includes('costo') || r.toLowerCase().includes('servidor')) ||
    study.resultsInfra?.find((r) => r.toLowerCase().includes('costo') || r.toLowerCase().includes('servidor')) ||
    study.resultsBusiness?.find((r) => r.toLowerCase().includes('costo')) ||
    'Costo: -40%';
    
  const perf =
    study.resultsPerformance?.find((r) => r.toLowerCase().includes('latencia') || r.toLowerCase().includes('throughput')) ||
    study.resultsTech?.find((r) => r.toLowerCase().includes('tiempo de respuesta')) ||
    'Rendimiento: 10x';

  const parseValue = (text: string) => {
    const match =
      text.match(/→\s*(.*?)\s*\(/) ||
      text.match(/→\s*(.*)/) ||
      text.match(/:\s*(.*?)\s*→/) ||
      text.match(/:\s*(.*)/);
      
    let val = match ? match[1].trim() : text;
    // Safety net: if it's too long, just take the first word/number to prevent overflow
    if (val.length > 8) {
      val = val.split(' ')[0];
    }
    return val;
  };

  const getRoi = () => {
    if (!study.roi) return '4x';
    const num = study.roi.match(/\d+/);
    if (!num) return '10x';
    if (study.roi.toLowerCase().includes('mes')) return num[0] + 'm';
    if (study.roi.toLowerCase().includes('x')) return num[0] + 'x';
    if (study.roi.includes('%')) return num[0] + '%';
    return num[0];
  };

  const afterItems =
    study.solutionArchitecture ||
    study.solutionOptimizations ||
    study.solutionPhases?.[1]?.points ||
    study.solutionPhases?.[0]?.points ||
    [];

  return (
    <div className="w-full flex flex-col gap-[clamp(4rem,8vw,6rem)] my-8">
      
      {/* Before / After Panel */}
      <div>
        <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-black text-white mb-[clamp(1.5rem,4vw,2.5rem)] tracking-tighter">
          El Desafío vs. La Solución
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(1rem,3vw,1.5rem)] relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#050505] p-3 rounded-full border border-white/10 shadow-xl">
              <ArrowRight01Icon className="w-[clamp(1.2rem,2vw,1.5rem)] h-[clamp(1.2rem,2vw,1.5rem)] text-brand" />
            </div>
          </div>

          {/* Before (Red) */}
          <div className="p-[clamp(1.5rem,4vw,2.5rem)] border border-red-500/20 bg-linear-to-b from-red-950/10 to-transparent rounded-2xl shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
            <h4 className="text-red-500 font-black tracking-widest mb-[clamp(1.5rem,3vw,2rem)] border-b border-red-500/10 pb-[clamp(0.5rem,1vw,1rem)] text-[clamp(1rem,2vw,1.125rem)]">
              Antes del Proyecto
            </h4>
            <ul className="space-y-[clamp(0.75rem,2vw,1.25rem)]">
              {study.challenge.slice(1, 5).map((point, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-[clamp(0.5rem,2vw,1rem)] text-zinc-300 text-[clamp(0.875rem,1.5vw,1rem)] font-mono bg-black/40 p-[clamp(0.75rem,2vw,1rem)] rounded-xl border border-white/5"
                >
                  <span className="flex-1 min-w-0 break-words leading-snug whitespace-normal">
                    {point.split(':')[0] || point}
                  </span>
                  <Alert01Icon className="text-red-500 w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] shrink-0" />
                </li>
              ))}
            </ul>
          </div>

          {/* After (Green) */}
          <div className="p-[clamp(1.5rem,4vw,2.5rem)] border border-brand/30 bg-linear-to-b from-brand/10 to-transparent rounded-2xl shadow-[inset_0_0_20px_rgba(0,255,102,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[80px] pointer-events-none rounded-full"></div>
            <h4 className="text-brand font-black tracking-widest relative z-10 mb-[clamp(1.5rem,3vw,2rem)] border-b border-brand/10 pb-[clamp(0.5rem,1vw,1rem)] text-[clamp(1rem,2vw,1.125rem)]">
              Después de Glastor
            </h4>
            <ul className="space-y-[clamp(0.75rem,2vw,1.25rem)] relative z-10">
              {afterItems.slice(0, 4).map((item, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-[clamp(0.5rem,2vw,1rem)] text-white text-[clamp(0.875rem,1.5vw,1rem)] font-mono bg-black/60 backdrop-blur-md p-[clamp(0.75rem,2vw,1rem)] rounded-xl border border-white/10 shadow-lg"
                >
                  <span className="flex-1 min-w-0 break-words leading-snug whitespace-normal">
                    {item.split('con')[0] || item}
                  </span>
                  <CheckmarkCircle01Icon className="text-brand w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] shrink-0" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ROI Metrics - Editorial Naked Style */}
      <div className="border-y border-white/10 py-[clamp(2rem,5vw,4rem)]">
        <h3 className="text-[clamp(1rem,1.5vw,1.25rem)] font-mono text-zinc-500 mb-[clamp(2rem,4vw,3rem)] uppercase tracking-widest">
          Impacto y Resultados
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(2rem,4vw,3rem)]">
          {[
            { icon: ArrowRight01Icon, value: uptime, label: 'Uptime' },
            { icon: Settings02Icon, value: perf, label: 'Mejora Prod.' },
            { icon: Clock01Icon, value: getRoi(), label: 'Retorno (ROI)' },
            { icon: Coins01Icon, value: cost, label: 'Ahorro Infra.' }
          ].map((card, i) => (
            <div key={i} className="flex flex-col relative">
              <card.icon className="w-[clamp(1.2rem,2vw,1.5rem)] h-[clamp(1.2rem,2vw,1.5rem)] text-brand mb-[clamp(1rem,2vw,1.5rem)]" />
              <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-black text-white tracking-tighter leading-none mb-3 truncate">
                {card.label === 'Retorno (ROI)' ? card.value : parseValue(card.value)}
              </div>
              <div className="text-[clamp(0.6rem,1vw,0.75rem)] font-mono text-zinc-400 uppercase tracking-widest">
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      {study.solutionPhases && (
        <div>
          <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-black text-white mb-[clamp(1.5rem,4vw,2.5rem)] tracking-tighter">
            Cronograma de Ejecución
          </h3>
          <div className="relative pt-[clamp(2rem,5vw,3rem)] pb-[clamp(1rem,3vw,2rem)] border border-white/5 bg-white/[0.02] rounded-3xl p-[clamp(1.5rem,4vw,3rem)]">
            <div className="text-center mb-[clamp(2rem,5vw,3rem)] text-brand font-black text-[clamp(1rem,2vw,1.25rem)] uppercase tracking-widest bg-brand/10 inline-block px-6 py-2 rounded-full mx-auto flex items-center justify-center w-max">
              {study.duration}
            </div>

            {/* The line */}
            <div className="relative flex justify-between items-start">
              <div className="absolute top-[clamp(0.5rem,1.5vw,0.75rem)] left-0 right-0 h-1 bg-zinc-800 z-0 rounded-full"></div>
              <div className="absolute top-[clamp(0.5rem,1.5vw,0.75rem)] left-0 right-1/2 h-1 bg-linear-to-r from-transparent to-brand z-0 shadow-[0_0_15px_#00ff66]"></div>

              {study.solutionPhases.slice(0, 4).map((phase, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center w-1/4">
                  <div className="w-[clamp(1.25rem,3.5vw,1.5rem)] h-[clamp(1.25rem,3.5vw,1.5rem)] bg-[#050505] border-[4px] border-brand rounded-full shadow-[0_0_20px_#00ff66] mb-[clamp(1rem,2.5vw,1.5rem)] transition-transform hover:scale-125"></div>
                  <div className="text-center px-1 md:px-4">
                    <div className="text-[clamp(0.6rem,1.2vw,0.75rem)] text-zinc-500 font-mono mb-2 uppercase tracking-widest">
                      Fase {i + 1}
                    </div>
                    <div className="text-[clamp(0.75rem,1.5vw,1rem)] text-white font-bold leading-tight">
                      {phase.title.replace(/Fase \d+:\s*/, '')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
