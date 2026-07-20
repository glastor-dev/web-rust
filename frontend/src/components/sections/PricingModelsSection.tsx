'use client';

import { motion } from 'motion/react';
import { Button } from '../reutilizables/button';
import { CheckCircle2Icon } from 'lucide-react';

import { models } from '../../data/pricing.data';

export function PricingModelsSection() {
  return (
    <section className="py-24 relative bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/5 via-[#050505] to-[#050505] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 text-center">
          <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
            Precios y Modelos
          </div>
          <h2 className="text-fluid-h2 font-extrabold text-white leading-none">
            Modelos de Trabajo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`glass-panel p-8 border-editorial flex flex-col relative ${model.featured ? 'border-brand/50 shadow-[0_0_30px_rgba(0,255,102,0.1)] -translate-y-4' : 'mt-4'}`}
            >
              {model.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-black font-bold uppercase tracking-widest text-[10px] px-4 py-1 rounded-full">
                  Recomendado
                </div>
              )}

              <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2">
                {model.title}
              </h3>
              <div className="text-brand text-sm font-mono mb-8 border-b border-white/10 pb-4">
                Ideal para: <span className="text-zinc-400">{model.idealFor}</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {model.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-zinc-300">
                    <CheckCircle2Icon className="w-5 h-5 text-brand mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{model.price}</span>
                  <span className="text-xs font-mono text-zinc-500">{model.priceUnit}</span>
                </div>
                <div className="text-xs text-zinc-500 font-mono mb-6 uppercase tracking-widest">
                  {model.timeline}
                </div>

                <Button
                  asChild
                  variant={model.featured ? 'default' : 'outline'}
                  className="w-full justify-center"
                >
                  <a href={model.link}>{model.cta}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
