'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const COLUMNS = 5;

const columnVariants = {
  initial: { scaleY: 1, originY: 0 }, // Anclado arriba, empieza en 100% de altura
  animate: (i: number) => ({
    scaleY: 0, // Se encoge hacia arriba
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05,
    },
  }),
  exit: (i: number) => ({
    scaleY: [0, 1], // Arranca invisible, crece hasta 100%
    originY: 1, // Anclado abajo, crece hacia arriba
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: i * 0.05,
    },
  }),
};

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Reset scroll and lenis on navigation
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    window.dispatchEvent(new Event('force-lenis-reset'));
  }, [pathname]);

  return <div className="relative z-0 min-h-screen bg-[#050505]">{children}</div>;
}
