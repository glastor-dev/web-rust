'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const clientLogos: { src: string; alt: string }[] = [
  { src: '/images/Logo_Fonda_Espana.svg', alt: 'Fonda España' },
  { src: '/images/Logo_g2a_white.svg', alt: 'G2A' },
  { src: '/images/BCG_logo_ok.svg', alt: 'BCG' },
  { src: '/images/CompassInc_Logo.svg', alt: 'Compass Inc' },
  { src: '/images/DXOMARK_logo.svg', alt: 'DXOMARK' },
  { src: '/images/infiniti-logo-1.svg', alt: 'Infiniti' },
  { src: '/images/levis-1.svg', alt: 'Levis' },
  { src: '/images/yamaha-12.svg', alt: 'Yamaha' },
];

const duplicatedLogos = [
  ...clientLogos,
  ...clientLogos,
  ...clientLogos,
  ...clientLogos,
  ...clientLogos,
  ...clientLogos,
];

export function ClientMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: 'none',
          duration: 35,
          repeat: -1,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full border-t border-white/10 bg-[#050505]/60 backdrop-blur-md overflow-hidden py-5 md:py-7 relative">
      <div className="absolute top-2 left-4 md:left-12 text-[10px] font-mono text-zinc-500 tracking-widest pointer-events-none z-10">
        Trusted By
      </div>

      <div
        className="flex w-full overflow-hidden mt-4 md:mt-0 relative transform-gpu"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-16 md:gap-32 px-6 items-center">
          {duplicatedLogos.map((logo, idx) => (
            <div
              key={`logo-${idx}`}
              className="shrink-0 flex items-center justify-center h-8 md:h-12 w-32 md:w-40"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain brightness-0 invert opacity-40 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-500 hover:scale-110 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
