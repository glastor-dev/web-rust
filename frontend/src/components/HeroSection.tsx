import { Suspense } from 'react';
import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router-dom';

import { DataOrb } from './ui/DataOrb';
import { ClientMarquee } from './ui/ClientMarquee';

export default function HeroSection() {
  // Constante para el titular
  const headlineParts = ['DESARROLLO', 'BACKEND EN RUST'];

  // Variantes para la animación del contenedor del titular (staggering)
  const containerVariants: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Variantes para la animación de cada línea del titular
  const itemVariants: Variants = {
    initial: { opacity: 0, y: 40 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Subtle Background Layer / Filter */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(0, 255, 102, 0.03) 0%, transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
          backgroundPosition: 'center center',
        }}
      />

      {/* Hero Content (Two Columns Layout) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-0 min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Text & CTA */}
        <div className="text-left pt-20 lg:pt-0">
          <motion.h1
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black uppercase tracking-tighter text-white leading-[0.85]"
          >
            {headlineParts.map((part, index) => (
              <motion.span key={index} className="block" variants={itemVariants}>
                {index === 1 ? <span className="text-brand">{part}</span> : part}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            className="mt-6 text-xl text-zinc-400 max-w-xl font-mono"
          >
            Construimos servidores de alto rendimiento y optimizamos infraestructura para empresas
            que necesitan velocidad, fiabilidad y escalabilidad real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/proyectos"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest bg-brand text-black hover:bg-white transition-colors duration-300"
            >
              Ver Proyectos
            </Link>
            <Link
              to="/#contacto"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest bg-transparent border border-white/20 text-white hover:border-brand hover:text-brand transition-colors duration-300"
            >
              Contactar
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-white/10 pt-6"
          >
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Empresa Certificada
            </span>
            <div className="flex flex-wrap items-center gap-6">
              {/* AWS Partner Badge */}
              <a
                href="#"
                className="block bg-zinc-100/90 px-2 py-1.5 rounded-sm opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
              >
                <img
                  src="https://res.cloudinary.com/dzualplqi/image/upload/v1783915584/AWS-Partner-Advanced_1200x900_Lo_db1hgy.webp"
                  alt="AWS Advanced Partner"
                  className="h-6 md:h-10 w-auto object-contain"
                />
              </a>
              {/* ISO 27001 Badge */}
              <a
                href="#"
                className="block bg-zinc-100/90 px-2 py-1.5 rounded-sm opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
              >
                <img
                  src="https://res.cloudinary.com/dzualplqi/image/upload/v1783566465/iso-27001_hzcz5n.webp"
                  alt="ISO 27001 Certified"
                  className="h-6 md:h-10 w-auto object-contain"
                />
              </a>
              {/* Clutch Badge */}
              <a
                href="#"
                className="block bg-zinc-100/90 px-2 py-1.5 rounded-sm opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
              >
                <img
                  src="https://res.cloudinary.com/dzualplqi/image/upload/v1783916112/Clutch_5_Star_Logo_PNG_SVG_Vector_abzk6x.svg"
                  alt="Clutch 5 Stars"
                  className="h-6 md:h-10 w-auto object-contain"
                />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: WebGL Interactive Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="relative w-full h-[50vh] lg:h-[80vh] flex items-center justify-center pb-20 lg:pb-0"
        >
          {/* Subtle Glow behind the Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-brand/10 blur-[100px] rounded-full transform-gpu pointer-events-none z-0" />

          <div className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-brand/50 font-mono text-sm animate-pulse">
                  Iniciando WebGL...
                </div>
              }
            >
              <DataOrb />
            </Suspense>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20">
        <ClientMarquee />
      </div>
    </section>
  );
}
