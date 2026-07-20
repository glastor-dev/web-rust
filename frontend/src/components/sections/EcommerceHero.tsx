'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight01Icon, ZapIcon, Settings01Icon, BatteryFullIcon } from 'hugeicons-react';

export function EcommerceHero() {
  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-[#050505] overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('/images/noise.svg')" }}
      />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-brand/5 to-transparent z-0 pointer-events-none" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start pt-20 lg:pt-0"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-brand"></span>
            <span className="text-xs font-mono text-brand uppercase tracking-widest font-bold">
              Nuevo Lanzamiento
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-[0.85] mb-6"
          >
            POTENCIA <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-brand/70">
              SIN CABLES
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-sans leading-relaxed mb-10"
          >
            El nuevo taladro de impacto 18V Brushless. Diseñado para atravesar acero y concreto sin
            pestañear. Rendimiento de grado industrial, autonomía brutal.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 w-full">
            <Link
              href="/tienda/taladro-impacto-18v"
              className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-5 text-sm font-bold uppercase tracking-widest bg-brand text-black hover:bg-white transition-all duration-300"
            >
              Comprar Ahora
              <ArrowRight01Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/tienda"
              className="group flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-5 text-sm font-bold uppercase tracking-widest bg-transparent border-2 border-white/20 text-white hover:border-brand hover:text-brand transition-all duration-300"
            >
              Ver Especificaciones
            </Link>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            variants={containerVariants}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full border-t border-white/10 pt-8"
          >
            {[
              { icon: ZapIcon, label: 'Torque Máximo', value: '226 Nm' },
              { icon: Settings01Icon, label: 'Motor', value: 'Brushless' },
              { icon: BatteryFullIcon, label: 'Autonomía', value: '+8 Hrs' },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-brand mb-1">
                  <feature.icon className="w-5 h-5" />
                  <span className="text-xl font-bold font-mono text-white tracking-tight">
                    {feature.value}
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual / Image Content */}
        <motion.div
          className="lg:col-span-5 relative w-full aspect-4/5 lg:aspect-auto lg:h-175 flex items-center justify-center group"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Abstract placeholder mimicking a heavy-duty product / tool */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent border border-white/10 rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors duration-500" />

            {/* Decorative technical lines */}
            <div className="absolute top-4 right-4 text-xs font-mono text-zinc-600">MOD. 883-X</div>
            <div className="absolute bottom-4 left-4 text-xs font-mono text-brand">IN STOCK</div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />
            <div className="absolute left-1/2 top-0 w-px h-full bg-white/5" />

            <div className="w-full h-full flex items-center justify-center relative z-10">
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotateZ: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-3/4 aspect-square border-2 border-brand/30 relative flex items-center justify-center bg-black/50 backdrop-blur-sm shadow-[0_0_50px_rgba(0,255,102,0.1)]"
              >
                {/* Placeholder for actual product image */}
                <div className="flex flex-col items-center gap-4 text-center px-4">
                  <span className="font-mono text-sm text-zinc-500 uppercase tracking-widest">
                    [ Imagen de Producto ]
                  </span>
                  <span className="font-sans text-xs text-zinc-600">
                    Inserta aquí el render 3D o PNG del taladro
                  </span>
                </div>

                {/* Tech brackets */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-brand"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-brand"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-brand"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-brand"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
