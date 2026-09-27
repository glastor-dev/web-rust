'use client';

import { memo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const WebGLBackground = dynamic(() => import('./WebGLBackground').then(mod => mod.WebGLBackground), { 
  ssr: false,
});

interface PremiumBackgroundProps {
  baseColor?: string;
  textureUrl?: string;
  textureOpacity?: number;
}

export const PremiumBackground = memo(function PremiumBackground({
  baseColor = '#050505',
  textureUrl,
  textureOpacity = 0.3,
}: PremiumBackgroundProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop, { passive: true });
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden"
      style={{ backgroundColor: baseColor }}
    >
      {/* Texture with Vignette (Fade-out mask) */}
      {textureUrl && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url("${textureUrl}")`,
            backgroundRepeat: 'repeat',
            opacity: textureOpacity,
            // Mask to fade out at the edges (Vignette effect)
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
          }}
        />
      )}
      
      {/* Cinematic Noise Overlay (CSS fallback) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* WebGL Layer - Only loads on Desktop for performance */}
      {isDesktop && <WebGLBackground />}
    </div>
  );
});
