'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { prepare, layout } from '@chenglou/pretext';
import { SectionHeader } from '../../ui/SectionHeader';

const projectsData = [
  {
    id: 1,
    title: 'Fintech Core',
    description:
      'Motor de procesamiento de pagos de ultra baja latencia construido en Rust. Capaz de manejar 10k TPS con p99 latency < 2ms. Implementa tolerancia a fallos tipo Raft para asegurar cero pérdida de transacciones.',
    tech: '',
    icons: ['/icons/rust.svg', '/icons/grpc.svg'],
    color: '#00ff66',
  },
  {
    id: 2,
    title: 'E-Commerce Headless',
    description:
      'Arquitectura frontend reactiva para tienda global. Renderizado estático masivo y animaciones de 60fps constantes. Incremento del 45% en retención de usuarios en la primera semana.',
    tech: '',
    icons: ['/icons/bun.svg', '/icons/react.svg'],
    color: '#3b82f6',
  },
  {
    id: 3,
    title: 'Plataforma IoT',
    description:
      'Ingesta de datos masiva para sensores industriales. Arquitectura distribuida usando Apache Kafka y microservicios ultra ligeros desarrollados nativamente en Rust.',
    tech: '',
    icons: ['/icons/rust.svg', '/icons/kafka.svg'],
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'Dashboard Analítico',
    description:
      'Panel de telemetría en tiempo real. Utiliza WebSockets nativos y un motor de renderizado custom basado en WebGL para evitar cuellos de botella en el DOM.',
    tech: '',
    icons: ['/icons/webgl.svg', '/icons/react.svg'],
    color: '#ec4899',
  },
  {
    id: 5,
    title: 'Motor de Búsqueda',
    description:
      'Búsqueda vectorial ultrarrápida (Vector Search) implementada desde cero en Rust con integración nativa a PostgreSQL. Tiempos de búsqueda reducidos en un 800%.',
    tech: '',
    icons: ['/icons/rust.svg', '/icons/postgresql.svg'],
    color: '#8b5cf6',
  },
];

export function PretextMasonryGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layoutInfo, setLayoutInfo] = useState({ containerHeight: 0, positions: [] as any[] });

  const preparedHandles = useRef<{ title: any; desc: any }[] | null>(null);

  useLayoutEffect(() => {
    if (!preparedHandles.current) {
      preparedHandles.current = projectsData.map((p) => ({
        title: prepare(p.title, '900 24px "Red Hat Display", system-ui, sans-serif'),
        desc: prepare(p.description, '400 16px "Red Hat Text", system-ui, sans-serif'),
      }));
    }

    const handleResize = () => {
      if (!containerRef.current || !preparedHandles.current) return;
      const containerWidth = containerRef.current.clientWidth;

      const cols = containerWidth < 768 ? 1 : containerWidth < 1024 ? 2 : 3;
      const gap = 32;
      const colWidth = (containerWidth - gap * (cols - 1)) / cols;

      const columnHeights = new Array(cols).fill(0);
      const positions = [];

      for (let i = 0; i < projectsData.length; i++) {
        let shortestColIndex = 0;
        let minHeight = columnHeights[0];
        for (let j = 1; j < cols; j++) {
          if (columnHeights[j] < minHeight) {
            minHeight = columnHeights[j];
            shortestColIndex = j;
          }
        }

        const x = shortestColIndex * (colWidth + gap);
        const y = minHeight;

        const padding = 64;
        const titleLayout = layout(preparedHandles.current[i].title, colWidth - padding, 32);
        const descLayout = layout(preparedHandles.current[i].desc, colWidth - padding, 24);

        // 32 (top p) + title + 16 (mb-4) + desc + 24 (mb-6) + 16 (pt-4) + 28 (icon h-7) + 32 (bottom p)
        const cardHeight = 32 + titleLayout.height + 16 + descLayout.height + 24 + 16 + 28 + 32;

        positions.push({ x, y, width: colWidth, height: cardHeight, item: projectsData[i] });
        columnHeights[shortestColIndex] += cardHeight + gap;
      }

      setLayoutInfo({
        containerHeight: Math.max(...columnHeights),
        positions,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative min-h-[50vh]">
      <SectionHeader
        title="Motor Masonry (Cero DOM Reflow)"
        subtitle="Impulsado por GLASTOR CORE para renderizado de 60fps."
      />

      <div
        ref={containerRef}
        className="relative w-full transition-all duration-300"
        style={{ height: layoutInfo.containerHeight }}
      >
        {layoutInfo.positions.map((pos, idx) => (
          <motion.div
            key={pos.item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, x: pos.x, y: pos.y }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: idx * 0.05,
            }}
            className="absolute top-0 left-0 hover:z-10"
            style={{ width: pos.width, height: pos.height }}
          >
            <div className="group relative h-full w-full bg-white/[0.01] backdrop-blur-md border border-white/10 hover:border-brand/40 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col p-8">
              {/* Ambient Glow */}
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-brand/10 blur-[60px] opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 pointer-events-none" />

              <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out bg-brand" />

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-extrabold tracking-tight text-white mb-4 group-hover:text-brand transition-colors duration-300">
                  {pos.item.title}
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-6 font-sans">
                  {pos.item.description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-white flex items-center gap-2 group-hover:text-brand transition-colors">
                    Ver Caso
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>

                  {pos.item.icons && (
                    <div className="flex gap-3">
                      {pos.item.icons.map((icon: string) => (
                        <div
                          key={icon}
                          className="bg-white/5 p-2 rounded-sm border border-white/10 group-hover:border-white/20 transition-colors"
                        >
                          <img
                            src={icon}
                            alt="Tech Icon"
                            className="h-5 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
