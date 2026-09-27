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
    initial: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
    animate: {
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
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
        <div className="text-left pt-32 pb-32 lg:pt-24 lg:pb-40">
          <motion.h1
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="text-fluid-display font-extrabold tracking-tight text-zinc-100 leading-[1.1]"
          >
            {headlineParts.map((part, index) => (
              <motion.span key={index} className="block" variants={itemVariants}>
                {index === 1 ? <span className="text-brand">{part}</span> : part}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, clipPath: 'inset(10% 0 10% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
            className="mt-6 text-xl text-zinc-300 max-w-xl font-sans leading-relaxed"
          >
            Ingeniería B2B especializada en backend en Rust y servidores: latencia baja, uptime alto
            y costos infra más bajos desde la primera migración.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(10% 0 10% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/cotizador"
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
            initial={{ opacity: 0, clipPath: 'inset(10% 0 10% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1 }}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-white/10 pt-6"
          >
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Empresa Certificada
            </span>
            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              <div
                className="block opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer text-white"
                title="AWS Advanced Partner"
              >
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" x="0" y="0" viewBox="0 0 304 182" className="h-7 md:h-9 w-auto">
                  <path fill="#ffffff" d="m86 66 2 9c0 3 1 5 3 8v2l-1 3-7 4-2 1-3-1-4-5-3-6c-8 9-18 14-29 14-9 0-16-3-20-8-5-4-8-11-8-19s3-15 9-20c6-6 14-8 25-8a79 79 0 0 1 22 3v-7c0-8-2-13-5-16-3-4-8-5-16-5l-11 1a80 80 0 0 0-14 5h-2c-1 0-2-1-2-3v-5l1-3c0-1 1-2 3-2l12-5 16-2c12 0 20 3 26 8 5 6 8 14 8 25v32zM46 82l10-2c4-1 7-4 10-7l3-6 1-9v-4a84 84 0 0 0-19-2c-6 0-11 1-15 4-3 2-4 6-4 11s1 8 3 11c3 2 6 4 11 4zm80 10-4-1-2-3-23-78-1-4 2-2h10l4 1 2 4 17 66 15-66 2-4 4-1h8l4 1 2 4 16 67 17-67 2-4 4-1h9c2 0 3 1 3 2v2l-1 2-24 78-2 4-4 1h-9l-4-1-1-4-16-65-15 64-2 4-4 1h-9zm129 3a66 66 0 0 1-27-6l-3-3-1-2v-5c0-2 1-3 2-3h2l3 1a54 54 0 0 0 23 5c6 0 11-2 14-4 4-2 5-5 5-9l-2-7-10-5-15-5c-7-2-13-6-16-10a24 24 0 0 1 5-34l10-5a44 44 0 0 1 20-2 110 110 0 0 1 12 3l4 2 3 2 1 4v4c0 3-1 4-2 4l-4-2c-6-2-12-3-19-3-6 0-11 0-14 2s-4 5-4 9c0 3 1 5 3 7s5 4 11 6l14 4c7 3 12 6 15 10s5 9 5 14l-3 12-7 8c-3 3-7 5-11 6l-14 2z"/><path d="M274 144A220 220 0 0 1 4 124c-4-3-1-6 2-4a300 300 0 0 0 263 16c5-2 10 4 5 8z" fill="#f90"/><path d="M287 128c-4-5-28-3-38-1-4 0-4-3-1-5 19-13 50-9 53-5 4 5-1 36-18 51-3 2-6 1-5-2 5-10 13-33 9-38z" fill="#f90"/>
                </svg>
              </div>
              <div
                className="block opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer text-white"
                title="Certificación Tecnológica"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#008fe2" className="h-7 md:h-9 w-auto">
                  <path d="M13.98 11.08h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19h-2.12a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.95-5.43h2.12a.19.19 0 0 0 .18-.19V3.57a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m0 2.71h2.12a.19.19 0 0 0 .18-.18V6.29a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.89c0 .1.09.18.19.18m-2.93 0h2.12a.19.19 0 0 0 .18-.18V6.29a.18.18 0 0 0-.18-.18H8.1a.18.18 0 0 0-.18.18v1.89c0 .1.08.18.18.18m-2.96 0h2.11a.19.19 0 0 0 .19-.18V6.29a.18.18 0 0 0-.19-.18H5.14a.19.19 0 0 0-.19.18v1.89c0 .1.08.18.19.18m5.89 2.72h2.12a.19.19 0 0 0 .18-.19V9.01a.19.19 0 0 0-.18-.19h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m-2.93 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H8.1a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.96 0h2.11a.18.18 0 0 0 .19-.19V9.01a.18.18 0 0 0-.18-.19H5.14a.19.19 0 0 0-.19.19v1.88c0 .1.08.19.19.19m-2.92 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H2.22a.18.18 0 0 0-.19.18v1.9c0 .1.08.18.19.18m21.54-1.19c-.06-.05-.67-.51-1.95-.51-.34 0-.68.03-1.01.09a3.77 3.77 0 0 0-1.72-2.57l-.34-.2-.23.33a4.6 4.6 0 0 0-.6 1.43c-.24.97-.1 1.88.4 2.66a4.7 4.7 0 0 1-1.75.42H.76a.75.75 0 0 0-.76.75 11.38 11.38 0 0 0 .7 4.06 6.03 6.03 0 0 0 2.4 3.12c1.18.73 3.1 1.14 5.28 1.14.98 0 1.96-.08 2.93-.26a12.25 12.25 0 0 0 3.82-1.4 10.5 10.5 0 0 0 2.61-2.13c1.25-1.42 2-3 2.55-4.4h.23c1.37 0 2.21-.55 2.68-1 .3-.3.55-.66.7-1.06l.1-.28Z"/>
                </svg>
              </div>
              <div
                className="block opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer text-white"
                title="GitKraken"
              >
                <svg fill="#179287" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-7 md:h-9 w-auto"><title>GitKraken</title><path d="M23.225 6.252a.478.478 0 00-.923.171c0 .053.013.119.026.171 2.15 5.71-.751 12.077-6.46 14.226a10.9 10.9 0 01-2.426.607v-5.155c.33-.066.646-.158.962-.264v4.338c5.445-1.332 8.794-6.817 7.463-12.262a10.147 10.147 0 00-4.958-6.487.472.472 0 00-.646.185.472.472 0 00.185.646c4.443 2.452 6.051 8.056 3.6 12.499a9.13 9.13 0 01-4.681 4.1v-3.836a1.472 1.472 0 001.028-1.398c0-.527-.264-1.002-.725-1.266.343-3.309 1.859-2.439 1.859-3.493v-.62c0-1.582-3.665-6.737-5.38-6.856h-.316c-1.714.119-5.379 5.274-5.379 6.856v.62c0 1.054 1.503.184 1.859 3.493a1.461 1.461 0 00-.725 1.266c0 .646.422 1.2 1.028 1.398v3.836C3.91 17.168 1.59 11.83 3.448 7.11a9.24 9.24 0 014.1-4.68.479.479 0 00.185-.66.487.487 0 00-.422-.237.444.444 0 00-.224.065 10.142 10.142 0 00-3.982 13.791 10.147 10.147 0 006.487 4.958V16.02c.316.106.633.198.962.264v5.155C4.503 20.636.257 15.085 1.062 9.034a10.9 10.9 0 01.606-2.426.489.489 0 00-.277-.62.494.494 0 00-.62.277c-2.333 6.21.805 13.131 7.015 15.452 1.2.448 2.452.699 3.73.751v-6.09c.172.012.489.012.489.012s.316 0 .488-.013v6.078c6.631-.277 11.773-5.867 11.496-12.499a12.458 12.458 0 00-.764-3.704zm-9.019 6.842a.995.995 0 011.398 0 .995.995 0 010 1.398.995.995 0 01-1.398 0 .988.988 0 010-1.398zm-4.43 1.398a.979.979 0 01-1.384 0 .995.995 0 010-1.398.995.995 0 011.398 0 .983.983 0 01-.013 1.398z"/></svg>
              </div>
              <div
                className="block opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer text-white"
                title="Partner Alliance"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 224 224" className="h-7 md:h-9 w-auto"><path fill="#fff" d="M218.46 109.358l-9.062-5.614c-.076-.882-.162-1.762-.258-2.642l7.803-7.265a3.107 3.107 0 00.933-2.89 3.093 3.093 0 00-1.967-2.312l-9.97-3.715c-.25-.863-.512-1.72-.781-2.58l6.214-8.628a3.114 3.114 0 00-.592-4.263 3.134 3.134 0 00-1.431-.637l-10.507-1.709a80.869 80.869 0 00-1.263-2.353l4.417-9.7a3.12 3.12 0 00-.243-3.035 3.106 3.106 0 00-2.705-1.385l-10.671.372a85.152 85.152 0 00-1.685-2.044l2.456-10.381a3.125 3.125 0 00-3.762-3.763l-10.384 2.456a88.996 88.996 0 00-2.047-1.684l.373-10.671a3.11 3.11 0 00-1.385-2.704 3.127 3.127 0 00-3.034-.246l-9.681 4.417c-.782-.429-1.567-.854-2.353-1.265l-1.713-10.506a3.098 3.098 0 00-1.887-2.373 3.108 3.108 0 00-3.014.35l-8.628 6.213c-.85-.27-1.703-.53-2.56-.778l-3.716-9.97a3.111 3.111 0 00-2.311-1.97 3.134 3.134 0 00-2.89.933l-7.266 7.802a93.746 93.746 0 00-2.643-.258l-5.614-9.082A3.125 3.125 0 00111.97 4c-1.09 0-2.085.56-2.642 1.478l-5.615 9.081a93.32 93.32 0 00-2.642.259l-7.266-7.802a3.13 3.13 0 00-2.89-.933 3.106 3.106 0 00-2.312 1.97l-3.715 9.97c-.857.247-1.71.506-2.56.778L73.7 12.588a3.101 3.101 0 00-3.014-.35A3.127 3.127 0 0068.8 14.61l-1.713 10.506c-.79.41-1.575.832-2.353 1.265l-9.681-4.417a3.125 3.125 0 00-4.42 2.95l.372 10.67c-.69.553-1.373 1.115-2.048 1.685l-10.383-2.456a3.143 3.143 0 00-2.93.832 3.124 3.124 0 00-.833 2.93l2.436 10.383a93.897 93.897 0 00-1.68 2.043l-10.672-.372a3.138 3.138 0 00-2.704 1.385 3.126 3.126 0 00-.246 3.035l4.418 9.7c-.43.779-.855 1.563-1.266 2.353l-10.507 1.71a3.097 3.097 0 00-2.373 1.886 3.117 3.117 0 00.35 3.013l6.214 8.628a89.12 89.12 0 00-.78 2.58l-9.97 3.715a3.117 3.117 0 00-1.035 5.202l7.803 7.265c-.098.879-.184 1.76-.258 2.642l-9.062 5.614A3.122 3.122 0 004 112.021c0 1.092.56 2.084 1.478 2.642l9.062 5.614c.074.882.16 1.762.258 2.642l-7.803 7.265a3.117 3.117 0 001.034 5.201l9.97 3.716a110 110 0 00.78 2.58l-6.212 8.627a3.112 3.112 0 00.6 4.27c.419.33.916.547 1.443.63l10.507 1.709c.407.792.83 1.576 1.265 2.353l-4.417 9.68a3.126 3.126 0 002.95 4.42l10.65-.374c.553.69 1.115 1.372 1.685 2.047l-2.435 10.383a3.09 3.09 0 00.831 2.91 3.117 3.117 0 002.931.83l10.384-2.436a82.268 82.268 0 002.047 1.68l-.371 10.671a3.11 3.11 0 001.385 2.704 3.125 3.125 0 003.034.241l9.681-4.416c.779.432 1.563.854 2.353 1.265l1.713 10.505a3.147 3.147 0 001.887 2.395 3.111 3.111 0 003.014-.349l8.628-6.213c.853.271 1.71.535 2.58.783l3.716 9.969a3.112 3.112 0 002.312 1.967 3.112 3.112 0 002.89-.933l7.266-7.802c.877.101 1.761.186 2.642.264l5.615 9.061a3.12 3.12 0 002.642 1.478 3.165 3.165 0 002.663-1.478l5.614-9.061c.884-.078 1.765-.163 2.643-.264l7.265 7.802a3.106 3.106 0 002.89.933 3.105 3.105 0 002.312-1.967l3.716-9.969c.863-.248 1.719-.512 2.58-.783l8.629 6.213a3.12 3.12 0 004.9-2.045l1.713-10.506c.793-.411 1.577-.838 2.353-1.265l9.681 4.416a3.13 3.13 0 003.035-.241 3.126 3.126 0 001.385-2.704l-.372-10.671a81.794 81.794 0 002.046-1.68l10.383 2.436a3.123 3.123 0 003.763-3.74l-2.436-10.382a84.588 84.588 0 001.68-2.048l10.672.374a3.104 3.104 0 002.704-1.385 3.118 3.118 0 00.244-3.035l-4.417-9.68c.43-.779.852-1.563 1.263-2.353l10.507-1.709a3.08 3.08 0 002.373-1.886 3.11 3.11 0 00-.35-3.014l-6.214-8.627c.272-.857.532-1.717.781-2.58l9.97-3.716a3.109 3.109 0 001.967-2.311 3.107 3.107 0 00-.933-2.89l-7.803-7.265c.096-.88.182-1.761.258-2.642l9.062-5.614a3.11 3.11 0 001.478-2.642 3.157 3.157 0 00-1.476-2.663h-.064zm-60.687 75.337c-3.468-.747-5.656-4.169-4.913-7.637a6.412 6.412 0 017.617-4.933c3.468.741 5.676 4.169 4.933 7.637a6.414 6.414 0 01-7.617 4.933h-.02zm-3.076-20.847c-3.158-.677-6.275 1.334-6.936 4.5l-3.22 15.026c-9.929 4.5-21.055 7.018-32.614 7.018-11.89 0-23.12-2.622-33.234-7.328l-3.22-15.026c-.677-3.158-3.778-5.18-6.936-4.499l-13.273 2.848a80.222 80.222 0 01-6.853-8.091h64.61c.731 0 1.218-.132 1.218-.797v-22.91c0-.665-.487-.797-1.218-.797H94.133v-14.469h20.415c1.864 0 9.97.533 12.551 10.898.811 3.179 2.601 13.54 3.818 16.863 1.214 3.715 6.152 11.146 11.415 11.146h32.202c.365 0 .755-.041 1.166-.116a80.56 80.56 0 01-7.307 8.587l-13.583-2.911-.113.058zm-89.38 20.537a6.407 6.407 0 01-7.617-4.933c-.74-3.467 1.462-6.894 4.934-7.637a6.417 6.417 0 017.617 4.933c.74 3.468-1.464 6.894-4.934 7.637zm-24.564-99.28a6.438 6.438 0 01-3.261 8.484c-3.241 1.438-7.019-.025-8.464-3.261-1.445-3.237.025-7.039 3.262-8.483a6.416 6.416 0 018.463 3.26zM33.22 102.94l13.83-6.15c2.952-1.311 4.294-4.769 2.972-7.72l-2.848-6.44H58.36v50.362h-22.5a79.158 79.158 0 01-3.014-21.672c0-2.869.155-5.697.452-8.483l-.08.103zm60.687-4.892v-14.86h26.629c1.376 0 9.722 1.59 9.722 7.822 0 5.18-6.399 7.038-11.663 7.038h-24.77.082zm96.811 13.375c0 1.973-.072 3.922-.216 5.862h-8.113c-.811 0-1.137.532-1.137 1.327v3.715c0 8.752-4.934 10.671-9.268 11.146-4.129.464-8.691-1.726-9.248-4.252-2.436-13.684-6.482-16.595-12.881-21.672 7.948-5.036 16.204-12.487 16.204-22.498 0-10.753-7.369-17.523-12.385-20.847-7.059-4.644-14.862-5.572-16.968-5.572H52.899c11.374-12.673 26.835-21.673 44.174-24.975l9.887 10.361a5.849 5.849 0 008.278.19l11.064-10.568c23.119 4.314 42.729 18.721 54.082 38.598l-7.576 17.09c-1.306 2.951.027 6.419 2.973 7.72l14.573 6.48c.255 2.607.383 5.224.384 7.843l-.021.052zM106.912 24.94a6.398 6.398 0 019.062.209 6.437 6.437 0 01-.213 9.082 6.396 6.396 0 01-9.062-.21 6.436 6.436 0 01.213-9.083v.002zm75.137 60.476a6.402 6.402 0 018.463-3.26 6.425 6.425 0 013.261 8.482 6.402 6.402 0 01-8.463 3.261 6.425 6.425 0 01-3.261-8.483z"/></svg>
              </div>
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
              className="relative z-10 w-[45vw] min-w-30 max-w-50 aspect-square flex items-center justify-center"
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
