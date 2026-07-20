'use client';

import { motion } from 'motion/react';

const trustSignals = [
  { name: 'CERTIFICACIÓN ISO 9001' },
  { name: 'ENVÍOS EN 24/48H' },
  { name: 'GARANTÍA OFICIAL' },
  { name: 'PAGOS B2B SEGUROS' },
  { name: 'INTEGRACIÓN ERP' },
  { name: 'SOPORTE TÉCNICO 24/7' },
  { name: 'CATÁLOGOS PUNCHOUT' },
  { name: 'STOCK PERMANENTE' },
  { name: 'DEVOLUCIÓN 30 DÍAS' },
];

// Triplicar para asegurar el bucle continuo sin saltos visuales en pantallas anchas
const duplicatedSignals = [...trustSignals, ...trustSignals, ...trustSignals, ...trustSignals];

export function TrustBar() {
  return (
    <div className="w-full border-y border-white/10 bg-black overflow-hidden py-12 relative flex items-center group">
      {/* Sombras en los bordes para desvanecimiento suave */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex items-center gap-8 md:gap-24 px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 40,
            repeat: Infinity,
          }}
        >
          {duplicatedSignals.map((signal, idx) => (
            <div
              key={idx}
              className="flex items-center gap-8 md:gap-24 group-hover:opacity-100 opacity-80 hover:opacity-100! transition-opacity duration-300"
            >
              <div className="flex items-center gap-6">
                <span
                  className="text-2xl md:text-4xl font-extrabold tracking-tight transition-colors duration-500 text-transparent cursor-default block py-1 leading-normal"
                  style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)' }}
                >
                  {signal.name}
                </span>
              </div>
              <span className="text-brand opacity-60 text-2xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
