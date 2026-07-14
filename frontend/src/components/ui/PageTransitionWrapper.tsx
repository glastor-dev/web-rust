import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const VARIANTS = {
  initial: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
  },
  animate: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(100% 0 0 0)',
  },
};

const TRANSITION = {
  duration: 0.55,
  ease: [0.76, 0, 0.24, 1] as const,
};

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  // Only animate when the route actually changes
  const isFirstRender = prevPathRef.current === pathname;

  useEffect(() => {
    prevPathRef.current = pathname;
  }, [pathname]);

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        window.dispatchEvent(new Event('force-lenis-reset'));
      }}
    >
      <motion.div
        key={pathname}
        variants={VARIANTS}
        initial={isFirstRender ? false : 'initial'}
        animate="animate"
        exit="exit"
        transition={TRANSITION}
        className="will-change-[clip-path,opacity]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
