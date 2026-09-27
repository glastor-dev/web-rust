'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stackData = [
  {
    id: "01",
    title: "RUST: SEGURO POR DISEÑO",
    content: "Rust no es solo un lenguaje rápido; garantiza matemáticamente la seguridad de la memoria y la ausencia de condiciones de carrera. Lo usamos para los microservicios core donde un error en producción cuesta millones. Es la definición de \"Dormir tranquilo\"."
  },
  {
    id: "02",
    title: "BUN: VELOCIDAD EXTREMA EN JS",
    content: "Reemplazamos Node.js por Bun. Los tiempos de arranque bajaron de segundos a milisegundos. Instalación de paquetes instantánea. Un servidor HTTP integrado 4 veces más rápido. La experiencia de desarrollo es tan fluida que parece magia."
  },
  {
    id: "03",
    title: "WEBGL: EXPERIENCIAS INMERSIVAS",
    content: "El DOM HTML tiene límites físicos. Cuando necesitamos que la web se sienta como un videojuego AAA o mostrar 10,000 partículas en tiempo real sin quemar la GPU, cruzamos la frontera hacia WebGL y Shaders GLSL. Rendimiento crudo directo al navegador."
  }
];

export default function PhilosophySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-32 relative max-w-7xl mx-auto px-6 md:px-12 border-t border-editorial">
      <div className="mb-32 flex flex-col md:flex-row md:items-start gap-12 md:gap-24">
        <div className="md:w-1/3">
          <h2 className="text-sm font-mono text-brand uppercase tracking-widest mb-6">
            Nuestra Filosofía
          </h2>
          <div className="border-l-2 border-brand/40 pl-6 py-1">
            <p className="text-white text-2xl md:text-3xl font-medium leading-snug font-sans tracking-tight">
              El código no debe interponerse entre tú y tu idea.
            </p>
          </div>
        </div>
        <div className="md:w-2/3 md:pt-12">
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-6">
            Si tu herramienta te hace esperar, te está robando fluidez. Nuestra obsesión no es la
            tecnología; es{' '}
            <strong className="text-white font-normal">eliminar la fricción absoluta.</strong>
          </p>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
            Cuando la tecnología funciona con la precisión de un reloj suizo, tú puedes dedicarte a
            lo que verdaderamente importa: liderar tu industria y transformar tu negocio.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            El Stack de Hierro
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-brand/50 to-transparent ml-6"></div>
        </div>

        <div className="w-full flex flex-col gap-2">
          {stackData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={item.id} 
                className="group relative overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-300"
              >
                {/* Glow Effect */}
                <div 
                  className={`absolute left-0 top-0 w-1 h-full transition-colors duration-500 ${isActive ? 'bg-brand shadow-[0_0_15px_rgba(0,255,102,0.5)]' : 'bg-transparent group-hover:bg-brand/20'}`} 
                />
                
                <button 
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="w-full text-left py-6 pl-8 pr-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 relative z-10"
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-sm md:text-lg font-mono tracking-widest transition-colors duration-300 ${isActive ? 'text-brand' : 'text-zinc-600 group-hover:text-brand/50'}`}>
                      {item.id}
                    </span>
                    <h4 className={`text-xl md:text-3xl font-black uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-white translate-x-2' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${isActive ? 'border-brand text-brand rotate-45 bg-brand/10 shadow-[0_0_15px_rgba(0,255,102,0.2)]' : 'border-white/10 text-white/50 group-hover:border-brand/50 group-hover:text-brand/50'}`}>
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-[4.5rem] pr-6 pb-8 md:pl-[6.5rem] max-w-4xl">
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
