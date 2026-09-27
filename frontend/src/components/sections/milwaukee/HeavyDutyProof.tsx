'use client';

import { motion, AnimatePresence } from 'motion/react';
import { PlayIcon, Shield01Icon, Settings02Icon, Cancel01Icon } from 'hugeicons-react';
import { useState } from 'react';
import { TextRevealGSAP } from '@/components/ui/TextRevealGSAP';

export function HeavyDutyProof() {
  const [isVideoInlineOpen, setIsVideoInlineOpen] = useState(false);

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-black overflow-hidden border-y-4 border-white/10">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-30 grayscale transition-opacity duration-1000"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
        >
          <source src="https://player.vimeo.com/external/498802283.sd.mp4?s=d9943dc6fce7c6ddcdb5ea8d3b73eb9b9e2c608b&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column - Copy */}
        <motion.div 
          className="max-w-2xl w-full lg:flex-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-1.5 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-white font-mono text-[10px] uppercase tracking-widest font-bold">
              NUEVO M18 FUEL™ ONE-KEY™
            </span>
          </div>

          <TextRevealGSAP 
            asH1={false}
            lines={[
              <span key="1">EXTRACTOR</span>,
              <span key="2" className="text-zinc-500">M-CLASS</span>,
              <span key="3" className="text-brand">AC/DC DUAL.</span>
            ]}
            className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6"
          />
          
          <p className="text-zinc-300 text-lg lg:text-xl max-w-lg mb-8 leading-relaxed">
            El extractor de polvo híbrido más avanzado de la industria. Potencia dual AC/DC, tecnología inalámbrica VACLINK™ y compatibilidad total con el sistema PACKOUT™.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsVideoInlineOpen(!isVideoInlineOpen)}
              className="group flex items-center justify-center gap-3 bg-brand text-black font-black uppercase tracking-widest px-8 py-4 text-sm hover:bg-white transition-all"
            >
              {isVideoInlineOpen ? (
                <>
                  <Cancel01Icon className="w-5 h-5 group-hover:scale-110 transition-transform" variant="solid" />
                  Cerrar Video
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform" variant="solid" />
                  Ver Prueba Real
                </>
              )}
            </button>
            <a
              href="/tienda"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-bold uppercase tracking-widest px-8 py-4 text-sm hover:border-white transition-colors backdrop-blur-sm bg-black/20"
            >
              Ver en Tienda
            </a>
          </div>
        </motion.div>

        {/* Right Column - Dynamic Content (Specs or Video) */}
        <div className="w-full lg:w-120 shrink-0 relative min-h-80">
          <AnimatePresence mode="wait">
            {!isVideoInlineOpen ? (
              <motion.div
                key="specs"
                className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <div className="border border-white/10 bg-black/60 backdrop-blur-md p-6 relative overflow-hidden group hover:border-brand/30 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 blur-2xl rounded-full group-hover:bg-brand/20 transition-colors" />
                  <Shield01Icon className="w-8 h-8 text-brand mb-4" />
                  <div className="text-4xl font-black text-white tracking-tighter mb-1">M-CLASS</div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Filtración Extrema
                  </div>
                </div>
                
                <div className="border border-white/10 bg-black/60 backdrop-blur-md p-6 relative overflow-hidden group hover:border-brand/30 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-colors" />
                  <Settings02Icon className="w-8 h-8 text-white mb-4" />
                  <div className="text-4xl font-black text-white tracking-tighter mb-1">VACLINK™</div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    Control Inalámbrico
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="video"
                className="w-full aspect-video border border-white/20 bg-black shadow-2xl relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
              >
                <video
                  className="w-full h-full object-cover bg-black"
                  autoPlay
                  controls
                  playsInline
                >
                  <source src="https://res.cloudinary.com/dzualplqi/video/upload/v1785157335/YTDown.com_YouTube_M18-ONE-KEY-FUEL-M-Class-AC-DC-Dust-Extr_Media_29432LPits8_001_1080p_pnzntr.mp4" type="video/mp4" />
                </video>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
