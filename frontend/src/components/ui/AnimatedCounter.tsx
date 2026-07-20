'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useTransform, animate, motion, useInView } from 'motion/react';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  from,
  to,
  duration,
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  // Use framer-motion's useInView for reliable triggering (works with Lenis)
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Set initial value to 0 for animation, but if JS fails it would render `from`.
  // Actually, we bind the motion value to `from` initially.
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration, ease: 'easeOut' });
    }
  }, [count, isInView, to, duration]);

  // Si no hay javascript, esto idealmente se renderizaría en el servidor, pero al ser un componente cliente,
  // el initial state de count es `from`. Para SEO y evitar el 0 estancado, nos aseguramos que isInView detone la animación.
  return <motion.span ref={ref}>{rounded}</motion.span>;
}
