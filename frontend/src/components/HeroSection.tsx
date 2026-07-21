'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight01Icon } from 'hugeicons-react';

import { DataOrb } from './ui/DataOrb';
import { ClientMarquee } from './ui/ClientMarquee';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Constante para el titular
  const headlineParts = ['Desarrollo de', 'Backend en Rust'];

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
      {/* Noise Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('/images/noise.svg')" }}
      />

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
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 leading-[1.1]"
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
            className="mt-6 text-xl text-zinc-300 max-w-xl font-sans leading-relaxed"
          >
            Ingeniería B2B especializada en backend en Rust y servidores: latencia baja, uptime alto
            y costos infra más bajos desde la primera migración.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/arquitectura"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-widest bg-brand text-black hover:bg-white transition-colors duration-300"
            >
              Cotizar ahora
              <ArrowRight01Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest bg-transparent border border-white/20 text-white hover:border-brand hover:text-brand hover:shadow-[0_0_20px_rgba(0,255,102,0.2)] hover:bg-brand/5 backdrop-blur-sm transition-all duration-300"
            >
              Ver proyectos
            </Link>
            <Link
              href="/recursos"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest bg-transparent border border-white/20 text-white hover:border-brand hover:text-brand hover:shadow-[0_0_20px_rgba(0,255,102,0.2)] hover:bg-brand/5 backdrop-blur-sm transition-all duration-300"
            >
              Recursos técnicos
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-white/10 pt-6"
          >
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Empresa Certificada
            </span>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#"
                className="block bg-white/5 border border-white/10 px-2 py-1.5 rounded-sm opacity-60 hover:opacity-100 hover:border-brand/50 hover:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all duration-300 grayscale hover:grayscale-0"
              >
                <Image
                  src="https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_300/v1783915584/AWS-Partner-Advanced_1200x900_Lo_db1hgy.webp"
                  alt="AWS Advanced Partner"
                  width={150}
                  height={40}
                  className="h-6 md:h-10 w-auto object-contain"
                />
              </a>
              <a
                href="#"
                className="block bg-white/5 border border-white/10 px-2 py-1.5 rounded-sm opacity-60 hover:opacity-100 hover:border-brand/50 hover:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all duration-300 grayscale hover:grayscale-0"
              >
                <Image
                  src="https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_60/v1783566465/iso-27001_hzcz5n.webp"
                  alt="ISO 27001 Certified"
                  width={60}
                  height={40}
                  className="h-6 md:h-10 w-auto object-contain"
                />
              </a>
              <a
                href="#"
                className="block bg-white/5 border border-white/10 px-2 py-1.5 rounded-sm opacity-60 hover:opacity-100 hover:border-brand/50 hover:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all duration-300 grayscale hover:grayscale-0"
              >
                <Image
                  src="https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_300/v1783916112/Clutch_5_Star_Logo_PNG_SVG_Vector_abzk6x.svg"
                  alt="Clutch 5 Stars"
                  width={120}
                  height={40}
                  className="h-6 md:h-10 w-auto object-contain"
                />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: WebGL Interactive Orb or Static Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="relative w-full h-[30vh] md:h-[50vh] lg:h-[80vh] flex items-center justify-center pb-10 md:pb-20 lg:pb-0"
        >
          {/* Subtle Glow behind the Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-brand/10 blur-[100px] rounded-full transform-gpu pointer-events-none z-0" />

          {isMobile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 w-[45vw] min-w-[120px] max-w-[200px] aspect-square flex items-center justify-center"
            >
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  filter: [
                    'drop-shadow(0 0 15px rgba(0,255,102,0.2))',
                    'drop-shadow(0 0 25px rgba(0,255,102,0.4))',
                    'drop-shadow(0 0 15px rgba(0,255,102,0.2))',
                  ],
                }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="w-full h-full relative"
              >
                <Image
                  src="/images/isologo-copm.webp"
                  alt="Glastor"
                  fill
                  quality={60}
                  sizes="40px"
                  className="object-contain opacity-90"
                />
              </motion.div>
            </motion.div>
          ) : (
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
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20">
        <ClientMarquee />
      </div>
    </section>
  );
}
