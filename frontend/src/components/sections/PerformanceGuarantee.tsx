'use client';

import { motion } from 'motion/react';

export function PerformanceGuarantee() {
  return (
    <section className="w-full bg-brand overflow-hidden py-16 md:py-24">
      {/* Marquee effect */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-12">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center mx-4">
                <span className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter text-black leading-none">
                  HEAVY DUTY GUARANTEE
                </span>
                <span className="text-6xl md:text-[8rem] font-black text-black/20 mx-8 leading-none">
                  /
                </span>
              </div>
            ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight mb-6">
            Construido para <br />
            sobrevivir
          </h2>
          <p className="text-black/80 text-lg font-bold max-w-lg mb-8">
            Nuestros equipos no son de exhibición. Están forjados para soportar caídas, polvo
            extremo y agua. Si tu trabajo es pesado, nuestras herramientas responden.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 border-t border-black/20 pt-8">
            <div>
              <span className="block text-4xl font-black text-black">5 Años</span>
              <span className="text-sm font-bold uppercase tracking-widest text-black/70 mt-1 block">
                Garantía Total
              </span>
            </div>
            <div className="hidden sm:block w-px h-16 bg-black/20" />
            <div>
              <span className="block text-4xl font-black text-black">IP68</span>
              <span className="text-sm font-bold uppercase tracking-widest text-black/70 mt-1 block">
                Polvo y Agua
              </span>
            </div>
          </div>
        </div>

        {/* Abstract graphic */}
        <div className="relative h-64 md:h-full min-h-[300px] bg-black rounded-sm overflow-hidden flex items-center justify-center border-4 border-black group">
          <div className="absolute inset-0 bg-brand/5 opacity-50" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,102,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,102,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />

          {/* Simulating a rugged shield or gear */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="relative z-10 w-48 h-48 border-dashed border-4 border-brand/80 rounded-full flex items-center justify-center"
          >
            <div className="w-32 h-32 bg-black rounded-full border-4 border-brand flex items-center justify-center shadow-[0_0_50px_rgba(0,255,102,0.5)]">
              <span className="font-black text-4xl text-brand">HD</span>
            </div>
          </motion.div>

          <div className="absolute bottom-4 right-4 text-brand font-mono text-xs font-bold tracking-widest">
            TESTED: TOUGH
          </div>
        </div>
      </div>
    </section>
  );
}
