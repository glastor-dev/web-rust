'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export function ScrambleText({ text, className = '', duration = 800, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < delay) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const activeElapsed = elapsed - delay;
      const progress = Math.min(activeElapsed / duration, 1);

      if (progress === 1) {
        setDisplayText(text);
        return;
      }

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          // As progress increases, more characters settle to their actual value from left to right
          const charProgress = (progress * text.length) - index;
          if (charProgress > 0) return char;
          // Random character
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayText(scrambled);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [text, duration, delay]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {displayText}
    </motion.span>
  );
}
