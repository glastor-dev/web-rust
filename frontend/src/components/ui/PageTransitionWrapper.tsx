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

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        window.dispatchEvent(new Event('force-lenis-reset'));
      }}
    >
      <motion.div key={pathname} className="relative z-0">
        
        {/* Columnas Escalonadas (Brutalist Tech Style) */}
        <div className="fixed inset-0 pointer-events-none z-100 flex w-full h-screen">
          {[...Array(COLUMNS)].map((_, i) => (
            <motion.div
              key={`col-${i}`}
              custom={i}
              variants={columnVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative flex-1 bg-brand/80 backdrop-blur-sm border-r border-black/10 last:border-r-0"
            />
          ))}
        </div>

        {/* Page Content - Efecto Glitch/Desenfoque al entrar */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          className="will-change-[opacity,transform,filter] bg-[#050505] min-h-screen origin-top"
        >
          {children}
        </motion.div>
        
      </motion.div>
    </AnimatePresence>
  );
}
