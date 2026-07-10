import { Suspense, lazy } from "react";
import { motion, Variants } from "motion/react";
import { Link } from "react-router-dom";

// Lazy load for OffBrandOrb (heavy canvas component)
const OffBrandOrb = lazy(() => import("@/components/OffBrandOrb"));

const clientLogos = [
  { src: "/images/Apex_Husain_Group.svg", alt: "Apex Husain Group" },
  { src: "/images/BCG_logo_ok.svg", alt: "BCG" },
  { src: "/images/CompassInc_Logo.svg", alt: "Compass Inc" },
  { src: "/images/Dick_Smith_(retailer)_Logo.svg", alt: "Dick Smith" },
  { src: "/images/DXOMARK_logo.svg", alt: "DXOMARK" },
  { src: "/images/infiniti-logo-1.svg", alt: "Infiniti" },
  { src: "/images/ktm-logo-1.svg", alt: "KTM" },
  { src: "/images/levis-1.svg", alt: "Levis" },
  { src: "/images/yamaha-12.svg", alt: "Yamaha" },
];

export default function HeroSection() {
  // Constante para el titular, mejora la mantenibilidad.
  const headlineParts = ["INGENIERÍA", "QUE INSPIRA", "RESULTADOS."];

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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Background Orb con Suspense para una mejor gestión de la carga */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
            <div className="w-64 h-64 rounded-full bg-brand/10 animate-pulse" />
          </div>
        }
      >
        <div
          className="absolute inset-0 z-0"
          aria-label="Animación de orbe interactivo en el fondo"
          role="presentation"
        >
          <OffBrandOrb />
        </div>
      </Suspense>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 md:px-12 py-24">
        <motion.h1
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="text-fluid-display font-black uppercase tracking-tighter text-white leading-[0.85] max-w-5xl mx-auto"
        >
          {headlineParts.map((part, index) => (
            <motion.span key={index} className="block" variants={itemVariants}>
              {part}
            </motion.span>
          ))}
        </motion.h1>

        {/* Call to Action (CTA) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }} // El delay se ajusta para sincronizar con el stagger
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="mt-12"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold uppercase tracking-widest bg-brand text-black hover:bg-brand/80 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          >
            Comenzar Proyecto
          </Link>
        </motion.div>
      </div>

      {/* Nuestros Clientes - Trusted by Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-[#050505]/60 backdrop-blur-md overflow-hidden py-5 md:py-7 z-20"
      >
        <div className="absolute top-2 left-4 md:left-12 text-[10px] font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
          Trusted By
        </div>
        <div 
          className="flex w-full overflow-hidden mt-4 md:mt-0"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <motion.div
            className="flex items-center gap-16 md:gap-32 w-max px-8 md:px-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.alt}
                className="h-6 md:h-8 w-auto object-contain opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 hover:scale-105 cursor-pointer"
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}