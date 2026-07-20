'use client';

import { useEffect, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function LoadingScreen() {
  const [phase, setPhase] = useState<'boot' | 'reveal' | 'done'>('boot');
  const [counter, setCounter] = useState('00000000');

  // EL FIX DEFINITIVO: Obligar a toda la página a clavarse en Top apenas nace el LoadingScreen
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = 'hidden'; // Bloquear scroll durante carga

    return () => {
      document.body.style.overflow = ''; // Restaurar al desmontar
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    // Binary counter animation
    const chars = '01';
    let tick = 0;
    const counterInterval = setInterval(() => {
      tick++;
      const random = Array.from({ length: 8 }, (_, i) => {
        if (tick > 12 + i * 2) return 'GLASTOR.'[i] ?? '0';
        return chars[Math.floor(Math.random() * 2)];
      }).join('');
      setCounter(random);
      if (tick > 26) clearInterval(counterInterval);
    }, 60);

    // Phase transitions
    const t1 = setTimeout(() => setPhase('reveal'), 1800);
    const t2 = setTimeout(() => setPhase('done'), 2500);

    return () => {
      clearInterval(counterInterval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-99999 bg-[#050505] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Top panel reveal */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-[#050505] z-10"
          initial={{ height: '50%' }}
          animate={{ height: phase === 'reveal' ? '0%' : '50%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Bottom panel reveal */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-[#050505] z-10"
          initial={{ height: '50%' }}
          animate={{ height: phase === 'reveal' ? '0%' : '50%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Logo SVG with stroke animation */}
        <div className="relative z-20 flex flex-col items-center gap-6">
          <motion.svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Hexagon outline — stroke draw-on */}
            <motion.path
              d="M32 4 L58 18 L58 46 L32 60 L6 46 L6 18 Z"
              stroke="#00ff66"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            {/* Inner G mark */}
            <motion.path
              d="M22 26 L32 20 L42 26 L42 38 L32 44 L22 38 Z"
              stroke="#00ff66"
              strokeWidth="1.5"
              fill="rgba(0,255,102,0.08)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeInOut' }}
            />
            {/* Center dot */}
            <motion.circle
              cx="32"
              cy="32"
              r="3"
              fill="#00ff66"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.3, type: 'spring' }}
            />
          </motion.svg>

          {/* Binary counter */}
          <motion.div
            className="font-mono text-xs tracking-[0.4em] text-brand uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {counter}
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            inicializando arquitectura...
          </motion.div>

          {/* Progress bar */}
          <motion.div className="w-32 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-brand"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
