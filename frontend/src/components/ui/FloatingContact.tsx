'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export function FloatingContact() {
  const { scrollY } = useScroll();

  // Appear after 600px of scroll
  const opacity = useTransform(scrollY, [500, 600], [0, 1]);
  const y = useTransform(scrollY, [500, 600], [20, 0]);
  const pointerEvents = useTransform(scrollY, (val) => (val > 550 ? 'auto' : 'none'));

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
    >
      <a
        href="mailto:ventas@glastor.es?subject=Contacto%20B2B"
        className="group relative flex items-center justify-center w-14 h-14 bg-brand text-black rounded-full shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:scale-110 transition-transform duration-300"
      >
        <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute right-full mr-4 bg-[#0a0a0a] text-white text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 border border-white/10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap pointer-events-none">
          Contactar B2B
        </span>
      </a>
    </motion.div>
  );
}
