'use client';

import { motion } from 'motion/react';
import * as HugeIcons from 'hugeicons-react';
export interface ArchitectureNode {
  iconName: keyof typeof HugeIcons;
  label: string;
}

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
}

export function ArchitectureDiagram({ nodes }: ArchitectureDiagramProps) {
  return (
    <div
      className="w-full overflow-x-auto touch-pan-x snap-x pb-8 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-brand/30 transition-colors"
    >
      <div className="flex items-center gap-2 min-w-max pr-[clamp(2rem,5vw,4rem)]">
        {nodes.map((node, index) => {
          // Obtener el icono dinámicamente de HugeIcons
          const Icon = (HugeIcons as any)[node.iconName] || HugeIcons.SquareIcon;

          return (
            <div key={index} className="flex items-center">
              {/* Nodo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="flex flex-col items-center justify-center bg-linear-to-b from-zinc-900/80 to-black border-t-white/20 border-x-white/5 border-b-white/5 border p-5 rounded-md min-w-35 relative group hover:border-brand/50 transition-colors shadow-lg"
              >
                <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></div>
                <Icon className="w-8 h-8 text-brand mb-3 relative z-10 drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]" />
                <span className="text-[11px] font-bold font-mono text-zinc-300 uppercase tracking-widest text-center relative z-10">
                  {node.label}
                </span>
              </motion.div>

              {/* Conector Animado (Si no es el último nodo) */}
              {index < nodes.length - 1 && (
                <div className="flex items-center mx-4 w-16 md:w-24 relative">
                  {/* Línea base punteada */}
                  <div className="w-full h-px border-t border-dashed border-zinc-700"></div>

                  {/* Flujo de datos animado (Laser beam) */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.4,
                        ease: 'linear',
                      }}
                      className="absolute h-0.5 w-full top-1/2 -translate-y-1/2 bg-linear-to-r from-transparent via-brand to-transparent shadow-[0_0_8px_#00ff66] z-10"
                    />
                  </div>

                  {/* Flecha final */}
                  <HugeIcons.ArrowRight01Icon className="w-4 h-4 text-zinc-600 absolute -right-2 top-1/2 -translate-y-1/2" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
