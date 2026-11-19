'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from 'hugeicons-react';
import { Button } from './reutilizables/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Scroll physics: Hide when scrolling down rapidly, reveal when scrolling up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Glassmorphism state after 50px
    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);

    // Hide if scrolling down quickly, reveal if scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Recursos', path: '/recursos' },
  ];

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden && !mobileMenuOpen ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2'
            : 'bg-transparent border-b border-transparent py-4'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-14' : 'h-20'
          }`}
        >
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group select-none"
            onClick={closeMenu}
          >
            <div
              className={`flex items-center justify-center transition-all duration-500 group-hover:scale-105 relative ${
                isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 h-8 sm:w-10 sm:h-10'
              }`}
            >
              <Image
                src="/images/isologo-copm.webp"
                alt="Glastor"
                fill
                quality={60}
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-display font-black tracking-tight text-white leading-none transition-all duration-300 ${
                  isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                }`}
              >
                GLASTOR
                <span className="text-[0.55em] font-bold align-top leading-none ml-0.5 relative top-[0.15em]">
                  ®
                </span>
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-brand uppercase font-bold">
                Rust Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Active from xl (1280px+) to avoid tablet clipping */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative text-sm font-bold tracking-widest uppercase transition-colors group py-2 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* CSS Animated Underline */}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-brand origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs - Active from xl (1280px+) */}
          <div className="hidden xl:flex items-center gap-4">
            <a
              href="https://github.com/glastor-core"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub @glastor-core"
              className="p-2 text-zinc-400 hover:text-white transition-colors flex items-center gap-2 font-mono text-xs border border-white/10 hover:border-brand/40 px-3 py-1.5"
            >
              <GithubIcon className="w-4 h-4 text-brand" />
              <span>@glastor-core</span>
            </a>

            <Button
              asChild
              variant="default"
              size="sm"
              className="px-6 tracking-widest text-xs font-bold uppercase rounded-none h-10 bg-brand text-black hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,255,102,0.15)] hover:shadow-[0_0_25px_rgba(0,255,102,0.3)] transition-all flex items-center gap-2"
            >
              <Link href="/arquitectura">
                Configurador B2B
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          {/* Compact / Mobile Actions & Menu Toggle (shown below xl) */}
          <div className="xl:hidden flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="default"
              size="sm"
              className="px-3 sm:px-4 h-8 sm:h-9 text-[10px] sm:text-xs font-mono uppercase tracking-widest bg-brand text-black font-bold rounded-none hover:bg-white hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Link href="/arquitectura">
                <span>Cotizar</span>
                <ArrowUpRight className="w-3 h-3 hidden sm:inline" />
              </Link>
            </Button>

            <button
              className="text-zinc-400 hover:text-white p-2 min-w-11 min-h-11 flex items-center justify-center z-50 relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand border border-white/10 hover:border-white/20 bg-[#050505]/40"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-overlay"
            >
              {mobileMenuOpen ? <X size={22} className="text-brand" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - Fullscreen Brutalist HUD Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de Navegación"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#050505] z-40 flex flex-col justify-between pt-24 pb-8 px-6 sm:px-12 overflow-y-auto"
          >
            {/* Ambient Technical Grid / Lines */}
            <div className="absolute top-0 left-6 sm:left-12 w-px h-full bg-linear-to-b from-brand/0 via-brand/20 to-brand/0 pointer-events-none" />
            <div className="absolute top-0 right-6 sm:right-12 w-px h-full bg-linear-to-b from-white/0 via-white/5 to-white/0 pointer-events-none" />

            {/* Navigation Routes */}
            <nav className="flex flex-col gap-4 sm:gap-6 my-auto pl-4 sm:pl-8">
              <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-2">
                // ÍNDICE DE NAVEGACIÓN
              </div>

              {navLinks.map((link, idx) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + idx * 0.05 }}
                  >
                    <Link
                      href={link.path}
                      onClick={closeMenu}
                      className={`group flex items-baseline gap-3 sm:gap-4 text-[clamp(1.75rem,7vw,3.25rem)] font-black tracking-tighter uppercase leading-tight transition-all ${
                        isActive ? 'text-brand' : 'text-white hover:text-brand hover:translate-x-2'
                      }`}
                    >
                      <span className="font-mono text-xs sm:text-sm text-brand tracking-widest select-none">
                        0{idx + 1}.
                      </span>
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="text-[10px] font-mono px-2 py-0.5 border border-brand/40 text-brand uppercase tracking-widest self-center ml-2">
                          ACTIVO
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile B2B Action */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + navLinks.length * 0.05 }}
                className="mt-6 sm:mt-8 max-w-md"
              >
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="w-full h-12 sm:h-14 text-xs sm:text-sm font-bold uppercase tracking-widest bg-brand text-black hover:bg-white rounded-none flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.2)]"
                  onClick={closeMenu}
                >
                  <Link href="/arquitectura">
                    <span>Configurar Arquitectura B2B</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            </nav>

            {/* Bottom HUD: Telemetry & Direct Contact */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pl-4 sm:pl-8 text-[11px] font-mono tracking-wider text-zinc-400">
              {/* Telemetry Status */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                </span>
                <span className="text-zinc-300">SYSTEM STATUS: NOMINAL</span>
                <span className="text-zinc-400 hidden sm:inline">|</span>
                <span className="text-zinc-400 hidden sm:inline">RUST 1.85+</span>
              </div>

              {/* Direct links */}
              <div className="flex items-center gap-4 text-xs">
                <a
                  href="mailto:founder@glastor.es"
                  className="hover:text-brand transition-colors underline underline-offset-4"
                >
                  founder@glastor.es
                </a>
                <span className="text-zinc-400">·</span>
                <a
                  href="https://github.com/glastor-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors"
                >
                  GitHub @glastor-core ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
