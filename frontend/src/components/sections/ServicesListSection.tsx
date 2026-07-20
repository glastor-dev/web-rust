'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeader } from '../ui/SectionHeader';
import { ChevronDown } from 'lucide-react';
import { ServiceDetail } from './ServiceDetail';
import { tabs, services } from '../../data/services.data';

export default function ServicesListSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(tabs[2]); // Default to "Sistemas Críticos"

  return (
    <section className="py-32 relative max-w-7xl mx-auto px-6 md:px-12" id="servicios">
      <SectionHeader
        title="Niveles de Escalado"
        subtitle="Nuestra Arquitectura Táctica"
        titleClassName="text-fluid-h3"
      />

      {/* Segmented Control / Pill Filters */}
      <div
        className="flex mb-16 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 relative min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-colors duration-300 z-10 ${
                  isActive ? 'text-black' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-brand rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {services
          .filter((s) => s.category === activeTab)
          .map((service) => {
            const Icon = service.icon;
            const isActive = activeService === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveService(isActive ? null : service.id)}
                className={`group relative bg-white/1 backdrop-blur-sm cursor-pointer transition-all duration-500 overflow-hidden 
                border-l-[6px] ${isActive ? 'border-brand bg-white/3' : 'border-transparent hover:border-brand/50 hover:bg-white/4'} 
                ${service.star ? 'border-y border-r border-brand/20 shadow-[0_0_40px_rgba(0,255,102,0.05)]' : 'border-y border-r border-white/10'}`}
              >
                {/* Ambient Glow */}
                <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-brand/10 blur-[80px] transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-150 pointer-events-none z-0" />

                {service.star && (
                  <div className="absolute top-0 right-0 px-6 py-2 bg-brand text-black text-[10px] font-black tracking-widest uppercase origin-top-right transform translate-x-2 -translate-y-1 shadow-lg z-20">
                    Módulo Estrella
                  </div>
                )}

                {/* Header Row */}
                <div className="p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                  <div className="flex items-center gap-6 md:w-5/12">
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-sm transition-colors duration-300 ${
                        isActive
                          ? 'bg-brand/20 text-brand'
                          : 'bg-white/5 text-zinc-500 group-hover:text-white group-hover:bg-white/10'
                      }`}
                    >
                      <Icon size={28} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 tracking-widest mb-2 block">
                        {service.level}
                      </span>
                      <h3
                        className={`text-xl md:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
                          isActive || service.star
                            ? 'text-white'
                            : 'text-zinc-400 group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="md:w-3/12 text-zinc-400 font-mono text-sm tracking-wide">
                    {service.short}
                  </div>

                  <div className="md:w-4/12 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                        Impacto Esperado
                      </span>
                      <span className="text-brand font-mono font-bold tracking-tight text-lg">
                        {service.metrics}
                      </span>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
                        isActive
                          ? 'border-brand text-brand rotate-180 bg-brand/10'
                          : 'border-white/10 text-zinc-500 group-hover:border-white/30 group-hover:text-white'
                      }`}
                    >
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                {/* Expanded Content (Hover/Click) */}
                <AnimatePresence>
                  {isActive && <ServiceDetail bullets={service.bullets} weeks={service.weeks} />}
                </AnimatePresence>
              </motion.div>
            );
          })}
      </div>
    </section>
  );
}
