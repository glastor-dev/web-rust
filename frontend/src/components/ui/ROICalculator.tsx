'use client';

import { useState, useEffect } from 'react';
import { animate } from 'motion/react';

export const ROICalculator = () => {
  const [users, setUsers] = useState(10000);

  // Display states
  const [costSavings, setCostSavings] = useState(0);
  const [latencySaved, setLatencySaved] = useState(0);

  // Constants
  const baseRustEfficiency = 0.85; // Rust uses ~85% less resources
  const msSavedPerRequest = 145; // Average ms saved vs Node.js

  const targetSavings = Math.floor(users * 2.5 * baseRustEfficiency);
  const targetLatency = Math.floor(users * msSavedPerRequest * 30); // Monthly projection

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const fallback = document.querySelector('[href="#contacto"]');
    if (fallback instanceof HTMLElement) {
      fallback.click();
    }
  };

  useEffect(() => {
    const controls1 = animate(costSavings, targetSavings, {
      duration: 0.8,
      onUpdate(value) {
        setCostSavings(Math.floor(value));
      },
    });

    const controls2 = animate(latencySaved, targetLatency, {
      duration: 0.8,
      onUpdate(value) {
        setLatencySaved(Math.floor(value));
      },
    });

    return () => {
      controls1.stop();
      controls2.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, targetSavings, targetLatency]);

  const formatCompact = (num: number) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace('.0', '').replace('.', ',') + 'B';
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace('.0', '').replace('.', ',') + 'M';
    }
    return num.toLocaleString('es-ES');
  };

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-8 shadow-2xl relative overflow-hidden group">
      {/* Dynamic Background gradient based on slider value */}
      <div
        className="absolute top-0 left-0 h-1 bg-brand transition-all duration-300"
        style={{ width: `${(users / 1000000) * 100}%` }}
      />
      <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <h3 className="text-xl font-bold tracking-tight text-white mb-8">
        Calculadora de ROI (Rust vs Node)
      </h3>

      <div className="mb-12 relative">
        <label className="block text-sm font-mono text-zinc-400 mb-4">
          Volumen Mensual de Peticiones:{' '}
          <span className="text-white font-bold">{users.toLocaleString('es-ES')}</span>
        </label>
        <input
          type="range"
          min="10000"
          max="1000000"
          step="10000"
          value={users}
          onChange={(e) => setUsers(Number(e.target.value))}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
        <div>
          <span className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
            Ahorro Servidores (Anual)
          </span>
          <div
            className="text-[clamp(1.5rem,4vw,3rem)] font-black text-brand tracking-tighter whitespace-nowrap"
            title={`+$${costSavings.toLocaleString('es-ES')}`}
          >
            +${formatCompact(costSavings)}
          </div>
        </div>
        <div>
          <span className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
            Reducción Latencia (Mensual)
          </span>
          <div
            className="text-[clamp(1.5rem,4vw,3rem)] font-black text-white tracking-tighter whitespace-nowrap"
            title={`-${latencySaved.toLocaleString('es-ES')}ms`}
          >
            -{formatCompact(latencySaved)}ms
          </div>
        </div>
      </div>

      {/* Lead Magnet Contextual */}
      <div className="mt-10 p-6 bg-brand/5 border border-brand/20 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group/cta hover:border-brand/40 transition-colors">
        <div className="absolute inset-0 bg-brand/5 blur-xl -z-10 opacity-0 group-hover/cta:opacity-100 transition-opacity"></div>
        <div>
          <h4 className="text-white font-bold text-lg mb-1 tracking-tight">
            {users > 500000
              ? '¿Escalando un sistema de alto volumen?'
              : '¿Quieres alcanzar estos números?'}
          </h4>
          <p className="text-zinc-400 text-sm">
            {users > 500000
              ? 'Descarga la Guía de Migración a Rust para reducir costes un 70% sin perder uptime.'
              : 'Agenda una auditoría técnica gratuita para evaluar el ROI real de tu infraestructura.'}
          </p>
        </div>
        <a
          href="#contacto"
          onClick={scrollToContact}
          className="shrink-0 bg-brand text-black font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-white transition-colors text-center"
        >
          Agendar Auditoría
        </a>
      </div>
    </div>
  );
};
