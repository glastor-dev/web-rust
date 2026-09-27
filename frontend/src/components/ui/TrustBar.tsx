'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const trustSignals = [
  { name: 'CERTIFICACIÓN ISO 9001' },
  { name: 'ENVÍOS EN 24/48H' },
  { name: 'GARANTÍA OFICIAL' },
  { name: 'PAGOS B2B SEGUROS' },
  { name: 'INTEGRACIÓN ERP' },
  { name: 'SOPORTE TÉCNICO 24/7' },
  { name: 'CATÁLOGOS PUNCHOUT' },
  { name: 'STOCK PERMANENTE' },
  { name: 'DEVOLUCIÓN 30 DÍAS' },
];

const techSignals = [
  { name: 'RUST', icon: '/icons/rust.svg' },
  { name: 'POSTGRESQL', icon: '/icons/postgresql.svg' },
  { name: 'REDIS', icon: '/icons/redis.svg' },
  { name: 'KAFKA', icon: '/icons/kafka.svg' },
  { name: 'gRPC', icon: '/icons/grpc.svg' },
  { name: 'KUBERNETES', icon: '/icons/kubernetes.svg' },
  { name: 'WEBGL', icon: '/icons/webgl.svg' },
];

export function TrustBar({ variant = 'trust' }: { variant?: 'trust' | 'tech' }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const activeSignals = variant === 'trust' ? trustSignals : techSignals;
  const duplicatedSignals = [...activeSignals, ...activeSignals, ...activeSignals, ...activeSignals];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: 'none',
          duration: 120, // 120 segundos para un scroll super suave y lento
          repeat: -1,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full border-y border-white/10 bg-black overflow-hidden py-12 relative flex items-center group">
      {/* Sombras en los bordes para desvanecimiento suave */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex w-full whitespace-nowrap overflow-hidden">
        <div ref={marqueeRef} className="flex w-max items-center px-4">
          {duplicatedSignals.map((signal, idx) => (
            <div
              key={idx}
              className="flex items-center group-hover:opacity-100 opacity-80 hover:opacity-100! transition-opacity duration-300"
            >
              <div className="flex items-center gap-8 md:gap-24 pl-8 md:pl-24">
                {variant === 'tech' && 'icon' in signal && signal.icon ? (
                  <div className="flex items-center gap-4 md:gap-6">
                    <img src={signal.icon} alt={signal.name} className="w-10 h-10 md:w-14 md:h-14 object-contain" />
                    <span
                      className="text-2xl md:text-4xl font-extrabold tracking-tight transition-colors duration-500 text-white/10 cursor-default block py-1 leading-normal"
                      style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.6)' }}
                    >
                      {signal.name}
                    </span>
                  </div>
                ) : (
                  <span
                    className="text-2xl md:text-4xl font-extrabold tracking-tight transition-colors duration-500 text-white/10 cursor-default block py-1 leading-normal"
                    style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.6)' }}
                  >
                    {signal.name}
                  </span>
                )}
                <span className="text-brand opacity-60 text-2xl">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
