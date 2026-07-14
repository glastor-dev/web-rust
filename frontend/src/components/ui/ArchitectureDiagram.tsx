import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
export interface ArchitectureNode {
  iconName: keyof typeof LucideIcons;
  label: string;
}

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
}

export function ArchitectureDiagram({ nodes }: ArchitectureDiagramProps) {
  return (
    <div className="w-full bg-black/40 border border-white/5 rounded-md p-8 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center gap-2 min-w-max">
        {nodes.map((node, index) => {
          // Obtener el icono dinámicamente de Lucide
          const Icon = (LucideIcons as any)[node.iconName] || LucideIcons.Box;

          return (
            <div key={index} className="flex items-center">
              {/* Nodo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="flex flex-col items-center justify-center bg-linear-to-b from-zinc-900/80 to-black border-t-white/20 border-x-white/5 border-b-white/5 border p-5 rounded-md min-w-[140px] relative group hover:border-brand/50 transition-colors shadow-lg"
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

                  {/* Partícula de datos animada (Orbe brillante) */}
                  <motion.div
                    initial={{ left: 0, opacity: 0 }}
                    animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: 'easeInOut',
                    }}
                    className="absolute h-2 w-2 bg-brand shadow-[0_0_12px_#00ff66,0_0_24px_#00ff66] top-1/2 -translate-y-1/2 rounded-full z-10 -ml-1"
                  />

                  {/* Flecha final */}
                  <LucideIcons.ChevronRight className="w-4 h-4 text-zinc-600 absolute -right-2 top-1/2 -translate-y-1/2" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
