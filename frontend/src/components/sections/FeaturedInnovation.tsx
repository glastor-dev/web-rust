'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight01Icon, ZapIcon, BatteryFullIcon, Shield01Icon } from 'hugeicons-react';

export function FeaturedInnovation() {
  return (
    <section className="w-full bg-[#050505] py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border border-white/10 bg-[#0a0a0a] p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row gap-12 items-center">
          {/* Tech overlay in background of card */}
          <div
            className="absolute inset-0 z-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: "url('/images/noise.svg')" }}
          />

          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[80px]" />

          {/* Left: Text Content */}
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-bold">
                Innovación Destacada
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter mb-6 leading-tight">
              Batería de Litio <br className="hidden md:block" /> X-CORE 18V
            </h2>

            <p className="text-zinc-400 text-lg mb-8 max-w-xl">
              Nuestra nueva tecnología de celdas de alta densidad proporciona hasta un 50% más de
              autonomía y protección contra sobrecalentamiento en los entornos más abusivos.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                { icon: BatteryFullIcon, text: '50% más de capacidad de carga' },
                { icon: ZapIcon, text: 'Entrega de energía sin caídas' },
                { icon: Shield01Icon, text: 'Carcasa reforzada anti-impactos' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-brand">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-zinc-300 font-bold">{item.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/tecnologia/baterias"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-brand transition-colors duration-300 group"
            >
              Descubrir X-CORE
              <ArrowRight01Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Right: Visual / Hardware Diagram abstract */}
          <div className="relative z-10 w-full lg:w-1/2 h-[400px] border border-white/10 bg-black/50 p-6 flex items-center justify-center group cursor-pointer">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30" />

            <div className="w-full h-full relative overflow-hidden flex flex-col justify-center gap-6 items-center">
              {/* Fake Battery Visual */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-48 h-64 border-4 border-zinc-800 bg-zinc-900 relative rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)]"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-800 border-x-4 border-t-4 border-zinc-800 rounded-t-sm" />
                <div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-between">
                  <div className="w-full h-2 bg-brand/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '20%' }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                      className="h-full bg-brand shadow-[0_0_10px_#00ff66]"
                    />
                  </div>

                  <div className="text-center font-black text-6xl text-zinc-800 tracking-tighter">
                    18V
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="font-mono text-xs text-brand font-bold tracking-widest">
                      X-CORE
                    </span>
                    <span className="font-mono text-xs text-zinc-600">5.0Ah</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
