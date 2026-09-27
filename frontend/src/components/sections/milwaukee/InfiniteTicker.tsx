'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TICKER_TEXTS = [
  '// M18 FUEL™',
  '// MOTOR BRUSHLESS',
  '// 5 AÑOS DE GARANTÍA',
  '// BATERÍAS REDLITHIUM™',
  '// PROTECCIÓN REDLINK PLUS™',
  '// HEAVY DUTY',
  '// RENDIMIENTO NEUMÁTICO',
  '// ECOSISTEMA PACKOUT™',
];

export function InfiniteTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const content = [...TICKER_TEXTS, ...TICKER_TEXTS, ...TICKER_TEXTS, ...TICKER_TEXTS];

  useEffect(() => {
    let ctx = gsap.context(() => {
      let xPos = 0;
      let lastScrollY = window.scrollY;
      
      const update = () => {
        let speed = 0.04; // Base speed
        
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;
        
        // Accelerate based on scroll speed (delta)
        if (Math.abs(delta) > 0) {
          speed += Math.abs(delta) / 50;
        }
        
        xPos -= speed;
        // Since we have 4 copies, we reset when we reach -50% to create a seamless loop
        if (xPos <= -50) xPos = 0;
        
        if (tickerRef.current) {
          gsap.set(tickerRef.current, { x: `${xPos}%` });
        }
      };
      
      gsap.ticker.add(update);
      return () => gsap.ticker.remove(update);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-brand py-3 overflow-hidden flex items-center relative border-y-2 border-black/20">
      <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-brand to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-brand to-transparent z-10 pointer-events-none" />
      
      <div
        ref={tickerRef}
        className="flex whitespace-nowrap gap-8"
      >
        {content.map((text, i) => (
          <span
            key={i}
            className="text-black font-black font-mono text-sm uppercase tracking-widest px-4 shrink-0"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
