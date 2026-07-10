import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealGSAPProps {
  /** Texto plano para dividir por palabras */
  text?: string;
  /** Arreglo de líneas (ReactNode) para estructurar saltos manuales */
  lines?: React.ReactNode[];
  className?: string;
  delay?: number;
  /** Define qué tan abajo debe estar el elemento antes de animarse (ej: 'top 85%') */
  start?: string;
  /** If true, wraps content in an h1 tag */
  asH1?: boolean;
  /** If true, animates immediately on mount (for above-the-fold elements) */
  immediate?: boolean;
}

export function TextRevealGSAP({
  text,
  lines,
  className = '',
  delay = 0,
  start = 'top 90%',
  asH1 = false,
  immediate = false,
}: TextRevealGSAPProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.reveal-inner');

    // Initial state: Pushed down and slightly rotated for a physical effect
    gsap.set(elements, { yPercent: 120, rotateZ: 2, opacity: 0 });

    if (immediate) {
      // For above-the-fold: animate immediately after a brief delay
      gsap.to(elements, {
        yPercent: 0,
        rotateZ: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.05,
        delay: delay + 0.3,
      });
    } else {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: start,
        onEnter: () => {
          gsap.to(elements, {
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.04,
            delay: delay,
          });
        },
        once: true,
      });
    }
  }, [delay, start, immediate]);

  let content;
  if (text) {
    const words = text.split(' ');
    content = words.map((word, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden mr-[0.25em] align-bottom pb-[0.1em] pt-[0.1em]"
      >
        <span className="reveal-inner inline-block origin-bottom-left will-change-transform">
          {word}
        </span>
      </span>
    ));
  } else if (lines) {
    content = lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.1em] pt-[0.1em]">
        <span className="reveal-inner block origin-bottom-left will-change-transform">{line}</span>
      </span>
    ));
  }

  const inner = (
    <div ref={containerRef} className={className}>
      {content}
    </div>
  );

  if (asH1) {
    return <h1>{inner}</h1>;
  }

  return inner;
}
