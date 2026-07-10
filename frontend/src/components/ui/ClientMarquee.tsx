import { motion } from 'motion/react';

const clientLogos: { src: string; alt: string; sizeClass?: string }[] = [
  { src: '/images/Apex_Husain_Group.svg', alt: 'Apex Husain Group', sizeClass: 'h-10 md:h-14' },
  { src: '/images/BCG_logo_ok.svg', alt: 'BCG' },
  { src: '/images/CompassInc_Logo.svg', alt: 'Compass Inc' },
  { src: '/images/DXOMARK_logo.svg', alt: 'DXOMARK' },
  { src: '/images/infiniti-logo-1.svg', alt: 'Infiniti' },
  { src: '/images/levis-1.svg', alt: 'Levis' },
  { src: '/images/yamaha-12.svg', alt: 'Yamaha' },
];

export function ClientMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="w-full border-t border-white/10 bg-[#050505]/60 backdrop-blur-md overflow-hidden py-5 md:py-7"
    >
      <div className="absolute top-2 left-4 md:left-12 text-[10px] font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
        Trusted By
      </div>
      <div
        className="flex w-full overflow-hidden mt-4 md:mt-0"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <motion.div
          className="flex items-center gap-16 md:gap-32 w-max px-8 md:px-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
        >
          {[...clientLogos, ...clientLogos].map((logo, idx) => (
            <img
              key={idx}
              src={logo.src}
              alt={logo.alt}
              className={`${logo.sizeClass || 'h-6 md:h-8'} w-auto object-contain brightness-0 invert opacity-40 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-500 hover:scale-105 cursor-pointer`}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
