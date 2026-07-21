'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PinSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const PinSection = ({ children, className = '' }: PinSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        pin: pinRef.current,
        pinSpacing: false, // Prevents adding massive empty space below the pinned element
        scrub: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative z-0 ${className}`}>
      <div ref={pinRef} className="w-full">
        {children}
      </div>
    </div>
  );
};
