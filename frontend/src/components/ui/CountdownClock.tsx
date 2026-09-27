'use client';

import { useState, useEffect } from 'react';

export function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const cycleDuration = 48 * 60 * 60 * 1000; // 48 horas en milisegundos
      const now = Date.now();
      const remaining = cycleDuration - (now % cycleDuration);

      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 48);
      const minutes = Math.floor((remaining / 1000 / 60) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 border border-brand/30 bg-brand/5 px-2 py-0.5 md:px-3 md:py-1 rounded-sm">
        <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
        <div className="text-brand font-mono text-sm md:text-base font-bold tracking-widest">
          --:--:--
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border border-brand/30 bg-brand/5 px-2 py-0.5 md:px-3 md:py-1 rounded-sm" title="Las ofertas se renuevan cada 48 horas">
      <span className="w-2 h-2 rounded-full bg-brand animate-pulse" style={{ boxShadow: '0 0 8px #00ff66' }}></span>
      <div className="text-zinc-400 text-[9px] md:text-[10px] font-mono uppercase tracking-widest hidden md:block mt-0.5">
        Renueva en
      </div>
      <div className="text-brand font-mono text-sm md:text-base font-bold tracking-widest">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  );
}
