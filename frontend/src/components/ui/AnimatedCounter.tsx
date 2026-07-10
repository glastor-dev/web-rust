import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useTransform, animate, motion } from 'motion/react';

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
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`);

  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    // Use native IntersectionObserver — works correctly with Lenis
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          animate(count, to, { duration, ease: 'easeOut' });
          observer.disconnect();
        }
      },
      {
        // rootMargin: positive value to trigger slightly before element is fully visible
        rootMargin: '0px 0px -80px 0px',
        threshold: 0,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [count, to, duration, hasAnimated]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
