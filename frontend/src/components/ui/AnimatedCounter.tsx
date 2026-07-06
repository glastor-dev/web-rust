import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function AnimatedCounter({ from, to, duration, suffix = "", prefix = "", decimals = 0 }: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => 
    `${prefix}${latest.toFixed(decimals)}${suffix}`
  );
  
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration: duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, isInView, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
