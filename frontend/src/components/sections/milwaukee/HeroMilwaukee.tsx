'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight01Icon, ArrowLeft01Icon } from 'hugeicons-react';

export function HeroMilwaukee() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/hero21.webp',
      title: (
        <>
          POTENCIA EXTREMA. <br />
          MARTILLO SDS MAX <br />
          M18 FUEL™ DE 1-9/16"
        </>
      ),
      link: '/producto/martillo',
      tag: 'LANZAMIENTO M18™',
      price: 'Desde USD 499',
      bullets: ['Despacho en 24h', 'Garantía de 3 Años', 'Stock Inmediato'],
    },
    {
      image: '/images/hero22.webp',
      title: (
        <>
          CORTES 30% MÁS RÁPIDOS. <br />
          SIERRA CIRCULAR <br />
          M18 FUEL™ DE 7-1/4"
        </>
      ),
      link: '/producto/sierra',
      tag: 'INNOVACIÓN FUEL™',
      price: 'PRECIO B2B',
      bullets: ['Compra por Volumen', 'Soporte Técnico', 'Línea de Crédito'],
    },
    {
      image: '/images/hero23.webp',
      title: (
        <>
          TORQUE INSUPERABLE. <br />
          LLAVE DE IMPACTO <br />
          M18 FUEL™ DE 1/2"
        </>
      ),
      link: '/producto/impacto',
      tag: 'BEST SELLER',
      price: 'Desde USD 385',
      bullets: ['Ecosistema PACKOUT™', 'Demo en Obra', 'Garantía de Retorno'],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full bg-[#0a0a0a]">
      <div className="relative w-full h-[500px] md:h-[640px] overflow-hidden flex items-center">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt={typeof slides[currentSlide].title === 'string' ? slides[currentSlide].title : "Milwaukee Tool"}
              fill
              priority
              fetchPriority="high"
              quality={60}
              sizes="100vw"
              className="object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-l from-black/80 via-black/40 to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-end">
          <div className="max-w-xl text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                  },
                  exit: {
                    opacity: 0,
                    x: -20,
                    transition: { duration: 0.3 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="inline-block bg-brand text-black font-sans font-black uppercase tracking-widest text-xs md:text-sm px-6 py-1 transform -skew-x-12 mb-5"
                >
                  <span className="block transform skew-x-12">{slides[currentSlide].tag}</span>
                </motion.div>

                <motion.h1
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-5 drop-shadow-lg"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="flex flex-wrap items-center justify-end gap-3 mb-7"
                >
                  <span className="text-brand font-mono text-sm font-bold uppercase tracking-widest">
                    {slides[currentSlide].price}
                  </span>
                  <span className="hidden md:inline-block w-px h-4 bg-white/20" />
                  <span className="text-zinc-300 text-xs font-bold uppercase tracking-widest">
                    {slides[currentSlide].bullets[0]}
                  </span>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="inline-flex flex-wrap justify-end gap-3"
                >
                  <Link
                    href="/tienda"
                    className="inline-flex items-center gap-2 border-2 border-white text-white bg-black/30 backdrop-blur-sm font-bold uppercase tracking-widest px-8 py-3 text-xs md:text-sm hover:bg-white hover:text-black transition-colors group"
                  >
                    Comprar ahora
                    <ArrowRight01Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="mailto:ventas@glastor.es?subject=Cotización%20desde%20Hero%20Milwaukee"
                    className="inline-flex items-center gap-2 border-2 border-brand text-black bg-brand/90 font-bold uppercase tracking-widest px-8 py-3 text-xs md:text-sm hover:bg-brand transition-colors"
                  >
                    Cotizar
                  </a>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="mt-6 flex items-center justify-end gap-4 text-[11px] font-mono text-zinc-300"
                >
                  {slides[currentSlide].bullets.slice(1).map((text) => (
                    <span key={text} className="hidden sm:inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                      {text}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={prevSlide}
          aria-label="Diapositiva anterior"
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-brand hover:text-black transition-colors text-white z-20 group"
        >
          <ArrowLeft01Icon className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Siguiente diapositiva"
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-brand hover:text-black transition-colors text-white z-20 group"
        >
          <ArrowRight01Icon className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-colors ${currentSlide === i ? 'bg-brand scale-110' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Ir a la diapositiva ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20">
          <motion.div
            key={currentSlide}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-full bg-brand origin-left"
          />
        </div>
      </div>
    </section>
  );
}
