'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const PAGE_VARIANTS = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4, // Wait for curtain to go up
    } as any,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    } as any,
  },
};

const CURTAIN_VARIANTS = {
  initial: {
    top: '100%',
  },
  animate: {
    top: '100%',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    top: '0%',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  const isFirstRender = prevPathRef.current === pathname;

  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  return (
    <>
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          window.dispatchEvent(new Event('force-lenis-reset'));
        }}
      >
        <motion.div
          key={pathname}
          variants={PAGE_VARIANTS}
          initial={isFirstRender ? false : 'initial'}
          animate="animate"
          exit="exit"
          className="will-change-[opacity,transform]"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Curtains - These run outside AnimatePresence so they don't get unmounted with the page */}
      <motion.div
        key={`curtain-brand-${pathname}`}
        initial={{ top: '100%' }}
        animate={{ top: '-100%' }}
        exit={{ top: '0%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.1 }}
        className="fixed left-0 w-full h-screen bg-brand z-50 pointer-events-none"
      />
      <motion.div
        key={`curtain-black-${pathname}`}
        initial={{ top: '100%' }}
        animate={{ top: '-100%' }}
        exit={{ top: '0%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as any, delay: 0.2 }}
        className="fixed left-0 w-full h-screen bg-[#050505] z-50 pointer-events-none shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      />
    </>
  );
}
