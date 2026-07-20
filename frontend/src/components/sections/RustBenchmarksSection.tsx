'use client';

import { motion } from 'motion/react';
import { AnimatedCounter } from '../ui/AnimatedCounter';

import { benchmarks, advantages } from '../../data/benchmarks.data';

export function RustBenchmarksSection() {
  return (
    <section className="py-24 relative bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/5 via-[#050505] to-[#050505] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 text-center">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Por qué Rust
          </div>
          <h2 className="text-fluid-h2 font-extrabold text-white mb-6 leading-none">
            Rust no es una Moda.
            <br />
            <span className="text-zinc-600">Es Ingeniería.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light mt-6">
            Elegimos Rust no porque sea popular, sino porque nos permite construir sistemas que
            otros lenguajes no pueden garantizar: rendimiento extremo con seguridad garantizada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Benchmarks Charts */}
          <div className="space-y-12 glass-panel p-6 md:p-10 border-editorial">
            {benchmarks.map((benchmark, bIdx) => (
              <div key={bIdx}>
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                  {benchmark.title}
                </h3>
                <div className="space-y-4">
                  {benchmark.items.map((item, iIdx) => {
                    const widthPercent = Math.max((item.value / item.max) * 100, 2); // min 2% width
                    return (
                      <div key={iIdx} className="flex items-center group">
                        <div className="w-24 md:w-32 text-sm font-mono text-zinc-400">
                          {item.name}
                        </div>
                        <div className="flex-grow h-8 bg-white/5 relative overflow-hidden rounded-r-sm">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${widthPercent}%` }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 1.5, delay: iIdx * 0.15, ease: 'easeOut' }}
                            className={`h-full ${item.color} flex items-center px-3`}
                          ></motion.div>
                        </div>
                        <div className="w-20 md:w-24 text-right text-sm font-mono text-white font-bold">
                          <AnimatedCounter
                            from={0}
                            to={item.value}
                            duration={1.5}
                            suffix={item.suffix}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Advantages & Security */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-8">
                ¿Qué significa esto para tu negocio?
              </h3>
              <ul className="space-y-6">
                {advantages.map((adv, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="mt-1 bg-brand/20 p-1 rounded-full mr-4">
                      <svg
                        className="w-4 h-4 text-brand"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <strong className="text-white block font-display tracking-wide">
                        {adv.title}
                      </strong>
                      <span className="text-zinc-400 text-sm">{adv.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-8 border-editorial bg-[#0A0A0A]">
              <h3 className="text-xl font-extrabold text-brand mb-4">Seguridad desde el diseño</h3>
              <p className="text-zinc-400 text-sm mb-6">
                Rust elimina problemas que otros lenguajes arrastran desde hace décadas:
              </p>
              <ul className="space-y-3 font-mono text-xs text-zinc-300">
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✕</span> Sin null pointer exceptions
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✕</span> Sin data races en concurrencia
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✕</span> Sin memory leaks
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✕</span> Sin buffer overflows
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✕</span> Sin undefined behavior
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10 text-sm text-white italic">
                "Tu sistema es seguro por diseño, no por esperanza."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
