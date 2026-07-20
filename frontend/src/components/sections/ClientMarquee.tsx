'use client';

import { motion } from 'motion/react';

const clients = [
  { name: 'BAJAJ AUTO', icon: '/icons/bajaj-auto.svg' },
  { name: 'ZEBRA', icon: '/icons/zebra-technologies.svg' },
  { name: 'DELL', icon: '/icons/dell.svg' },
  { name: 'ANKER', icon: '/icons/anker.svg' },
  { name: 'SANTANDER', icon: '/icons/santander.svg' },
  { name: 'ZOOM', icon: '/icons/zoom-2025.svg' },
  { name: 'HOTELS.COM', icon: '/icons/hotelsdotcom.svg' },
  { name: 'BEST BUY', icon: '/icons/best-buy.svg' },
  { name: 'ALDI', icon: '/icons/aldi-nord.svg' },
  { name: 'BEST WESTERN', icon: '/icons/best-western.svg' },
  { name: '1PANEL', icon: '/icons/1panel.svg' },
  { name: '3M', icon: '/icons/3m.svg' },
];

// Duplicate for infinite scroll
const duplicatedClients = [...clients, ...clients, ...clients];

export function ClientMarquee() {
  return (
    <section className="py-12 border-y border-white/10 overflow-hidden bg-black relative">
      {/* Gradients for smooth fade out at edges */}
      <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h4 className="text-zinc-400 text-xs font-mono uppercase tracking-widest text-center">
          Sistemas críticos impulsados por nuestra infraestructura
        </h4>
      </div>

      <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-32 px-6 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 35,
            repeat: Infinity,
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex items-center gap-6 group opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={client.icon}
                alt={client.name}
                className="h-10 md:h-12 w-auto max-w-none object-contain brightness-0 invert opacity-50 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
