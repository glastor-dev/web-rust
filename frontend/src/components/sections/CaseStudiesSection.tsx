'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function CaseStudiesSection() {
  return (
    <section className="py-24 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-brand font-mono tracking-widest text-sm uppercase mb-4">
              Casos de Éxito
            </div>
            <h2 className="text-fluid-h2 font-extrabold text-white mb-4 leading-none">
              Proyectos en
              <br />
              <span className="text-zinc-500">Producción.</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl text-lg font-light mt-6">
              Más de 150 proyectos completados desde 2010. Aquí tienes una muestra de lo que hacemos
              y los resultados que conseguimos.
            </p>
          </div>
          <a
            href="/proyectos"
            className="inline-flex items-center text-sm font-mono text-brand hover:text-white transition-colors"
          >
            Ver todos los casos <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

        <div className="relative w-full h-87.5 lg:h-137.5 flex items-center justify-center perspective-[2000px] group mt-16 mb-8">
          {/* Ambient Glow behind images */}
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[60%] h-[60%] bg-brand/20 blur-[120px] rounded-full transform-gpu pointer-events-none z-0" />

          {/* Proyecto 4 - Fondo Izquierda */}
          <img
            src="/images/proyecto-4.webp"
            alt="Proyecto 4"
            className="absolute w-[45%] lg:w-[35%] rounded-xl shadow-2xl border border-white/5 opacity-50 transition-all duration-700 ease-out hover:opacity-100! hover:scale-110 hover:z-50 z-10 translate-x-[-50%] lg:translate-x-[-70%] translate-y-[20%] -rotate-6 group-hover:translate-x-[-60%] lg:group-hover:translate-x-[-90%] group-hover:-rotate-12"
          />

          {/* Proyecto 5 - Fondo Derecha */}
          <img
            src="/images/proyecto-5.webp"
            alt="Proyecto 5"
            className="absolute w-[45%] lg:w-[35%] rounded-xl shadow-2xl border border-white/5 opacity-50 transition-all duration-700 ease-out hover:opacity-100! hover:scale-110 hover:z-50 z-10 translate-x-[50%] lg:translate-x-[70%] translate-y-[15%] rotate-6 group-hover:translate-x-[60%] lg:group-hover:translate-x-[90%] group-hover:rotate-12"
          />

          {/* Proyecto 2 - Medio Izquierda */}
          <img
            src="/images/proyecto-2.webp"
            alt="Proyecto 2"
            className="absolute w-[55%] lg:w-[45%] rounded-xl shadow-2xl border border-white/10 opacity-75 transition-all duration-700 ease-out hover:opacity-100! hover:scale-110 hover:z-50 z-20 translate-x-[-25%] lg:translate-x-[-35%] translate-y-[-10%] -rotate-3 group-hover:translate-x-[-35%] lg:group-hover:translate-x-[-45%] group-hover:-rotate-6"
          />

          {/* Proyecto 3 - Medio Derecha */}
          <img
            src="/images/proyecto-3.webp"
            alt="Proyecto 3"
            className="absolute w-[55%] lg:w-[45%] rounded-xl shadow-2xl border border-white/10 opacity-75 transition-all duration-700 ease-out hover:opacity-100! hover:scale-110 hover:z-50 z-20 translate-x-[25%] lg:translate-x-[35%] translate-y-[-5%] rotate-3 group-hover:translate-x-[35%] lg:group-hover:translate-x-[45%] group-hover:rotate-6"
          />

          {/* Proyecto 1 - Frente Centro */}
          <img
            src="/images/proyecto-1.webp"
            alt="Proyecto Principal"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="absolute w-[65%] lg:w-[55%] rounded-xl shadow-2xl border border-white/20 transition-all duration-700 ease-out hover:scale-105 hover:z-50 z-30 translate-y-0 group-hover:-translate-y-4 drop-shadow-[0_0_40px_rgba(0,255,102,0.2)]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <a
            href="/proyectos"
            className="inline-flex items-center text-xs font-mono text-white border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 hover:border-brand hover:text-brand hover:bg-brand/5 transition-all uppercase tracking-widest cursor-pointer"
          >
            Ver más proyectos <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
