'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZapIcon } from 'hugeicons-react';
import { TextRevealGSAP } from '@/components/ui/TextRevealGSAP';

export function CompareSystems() {
  const [activeSystem, setActiveSystem] = useState<'M12' | 'M18'>('M12');

  const systems = {
    M12: {
      name: 'M12 FUEL™',
      subtitle: 'AGILIDAD & PRECISIÓN',
      description: 'Líder de la industria en subcompactos. Ergonomía superior diseñada para espacios reducidos sin sacrificar rendimiento.',
      color: 'text-white',
      accent: 'text-zinc-400',
      specs: [
        { label: 'Peso prom.', value: '0.9 - 1.5 kg' },
        { label: 'Enfoque', value: 'Ergonomía' },
        { label: 'Opciones', value: '+125' },
      ],
      idealFor: ['Trabajos sobre cabeza', 'Espacios confinados', 'Instaladores HVAC'],
      image: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto/v1784390626/sec2_xz4f3u.webp',
      glow: 'bg-white/10'
    },
    M18: {
      name: 'M18 FUEL™',
      subtitle: 'POTENCIA EXTREMA',
      description: 'El sistema inalámbrico de 18V más avanzado. Diseñado para los trabajos más exigentes que antes requerían cables.',
      color: 'text-brand',
      accent: 'text-brand',
      specs: [
        { label: 'Torque máx.', value: 'Hasta 2,500 Nm' },
        { label: 'Enfoque', value: 'Potencia Bruta' },
        { label: 'Opciones', value: '+250' },
      ],
      idealFor: ['Construcción pesada', 'Montaje industrial', 'Mecánica pesada'],
      image: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto/v1784390894/sec1_ptmnqa.webp',
      glow: 'bg-brand/10'
    }
  };

  const current = systems[activeSystem];

  return (
    <section className="w-full bg-[#050505] py-24 md:py-32 relative overflow-hidden border-y border-white/5">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none opacity-[0.015] z-0">
        <h2 className="text-[25vw] font-black uppercase tracking-tighter italic whitespace-nowrap">
          {activeSystem}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header & Switcher */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-white/10 pb-8 gap-8">
          <div>
            <TextRevealGSAP 
              asH1={false}
              lines={[
                <span key="1">COMPARA</span>,
                <span key="2">LOS <span className="text-brand">SISTEMAS</span></span>
              ]}
              className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter italic mb-4"
            />
            <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest max-w-sm">
              Selecciona la plataforma que mejor se adapte a tu nivel de exigencia.
            </p>
          </div>

          {/* Techy Switcher */}
          <div className="flex gap-4">
            {(['M12', 'M18'] as const).map((sys) => (
              <button
                key={sys}
                onClick={() => setActiveSystem(sys)}
                className={`relative px-6 py-4 font-mono text-sm uppercase tracking-widest font-bold transition-all duration-300 border bg-black/50 backdrop-blur-md ${
                  activeSystem === sys 
                    ? 'border-brand text-brand' 
                    : 'border-white/10 text-zinc-500 hover:border-white/30 hover:text-white'
                }`}
              >
                {activeSystem === sys && (
                  <motion.div 
                    layoutId="active-indicator" 
                    className="absolute top-0 left-0 w-full h-1 bg-brand"
                  />
                )}
                {sys} FUEL™
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSystem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            >
              {/* Image Side (Left on Desktop to break the pattern) */}
              <div className="lg:col-span-7 relative h-[400px] md:h-[500px] flex items-center justify-center">
                {/* Glow effect behind tool */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 1 }}
                  className={`absolute w-[60%] h-[60%] blur-[100px] rounded-full ${current.glow}`}
                />
                <motion.img
                  src={current.image}
                  alt={current.name}
                  className="w-full max-w-[280px] md:max-w-md object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
                  initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 20 }}
                />
              </div>

              {/* Data Side (Right) */}
              <div className="lg:col-span-5">
                <div className="mb-10">
                  <div className={`font-mono text-xs tracking-widest uppercase mb-3 ${current.color}`}>
                    // {current.subtitle}
                  </div>
                  <h3 className={`text-6xl md:text-7xl font-black italic tracking-tighter mb-6 ${current.color}`}>
                    {current.name}
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Brutalist Specs Grid */}
                <div className="grid grid-cols-3 gap-0 border-y border-white/10 mb-10 bg-white/[0.02]">
                  {current.specs.map((spec, i) => (
                    <div key={i} className={`p-4 md:p-6 ${i !== 2 ? 'border-r border-white/10' : ''}`}>
                      <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 min-h-[2.5rem]">
                        {spec.label}
                      </div>
                      <div className="text-white font-black text-xl md:text-2xl tracking-tighter leading-none">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ideal For */}
                <div>
                  <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <ZapIcon className={`w-4 h-4 ${current.accent}`} /> Tareas Ideales
                  </div>
                  <ul className="space-y-4">
                    {current.idealFor.map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-zinc-300 font-medium text-sm md:text-base">
                        <span className={`w-1.5 h-1.5 rounded-full ${current.accent === 'text-brand' ? 'bg-brand' : 'bg-white'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
