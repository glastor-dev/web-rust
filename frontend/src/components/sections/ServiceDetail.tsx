'use client';

import { motion } from 'motion/react';

interface ServiceDetailProps {
  bullets: string[];
  weeks: { w: string; text: string }[];
}

export function ServiceDetail({ bullets, weeks }: ServiceDetailProps) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-white/5"
    >
      <div className="p-6 md:p-10 flex flex-col md:flex-row gap-16 bg-black/50">
        {/* Bullets */}
        <div className="md:w-1/2">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
            Beneficios Clave
          </h4>
          <ul className="space-y-6">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="text-brand font-mono text-lg mt-[-2px]">✦</span>
                <span className="text-zinc-400 text-sm md:text-base leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline Accordion */}
        <div className="md:w-1/2">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
            Roadmap Táctico
          </h4>
          <div className="space-y-4">
            {weeks.map((week, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-4 rounded-sm bg-white/2 border border-white/5 hover:border-brand/30 transition-colors"
              >
                <span className="text-brand font-mono text-xs whitespace-nowrap pt-1 uppercase tracking-widest w-32">
                  {week.w}
                </span>
                <span className="text-zinc-300 text-sm">{week.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
