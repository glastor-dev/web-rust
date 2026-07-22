'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('glastor_splash_seen');
    if (!hasSeenSplash) {
      setShow(true);
      // Wait for animation, then hide
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('glastor_splash_seen', 'true');
      }, 2500);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Simple Logo SVG */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-6"
            >
              <motion.path
                d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
                stroke="#00ff66"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.path
                d="M50 10 L50 90 M10 30 L90 70 M10 70 L90 30"
                stroke="rgba(0, 255, 102, 0.2)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-brand font-display font-black text-2xl tracking-widest uppercase"
            >
              GLASTOR
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-2"
            >
              SISTEMAS B2B INICIALIZANDO
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
