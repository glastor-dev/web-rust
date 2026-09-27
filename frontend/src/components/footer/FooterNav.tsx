'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const MAIN_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Tienda', href: '/tienda' },
];

const GLASTOR_SUBMENU_LINKS = [
  { label: 'Inicio', href: '/home' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/nosotros' },
];

const RESOURCE_LINKS = [
  { label: 'Rust', href: '/recursos?tech=rust' },
  { label: 'Docker', href: '/recursos?tech=docker' },
  { label: 'Kubernetes', href: '/recursos?tech=kubernetes' },
  { label: 'PostgreSQL', href: '/recursos?tech=postgresql' },
];

export function FooterNav() {
  const [isGlastorOpen, setIsGlastorOpen] = useState(false);

  return (
    <nav aria-label="Navegación del pie de página" className="contents">
      {/* Columna 1: Navegación Principal */}
      <div>
        <p className="text-xs font-bold text-white tracking-widest mb-5">Navegación</p>
        <ul className="space-y-4">
          {MAIN_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-400 hover:text-brand transition-colors text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="space-y-2">
            <button
              onClick={() => setIsGlastorOpen(!isGlastorOpen)}
              aria-expanded={isGlastorOpen}
              aria-controls="glastor-submenu"
              className="text-zinc-300 hover:text-brand transition-colors text-sm flex items-center gap-2 font-medium w-full text-left"
            >
              Glastor-Dev
              <span className="bg-brand text-black text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
                B2B
              </span>
              <svg 
                className={`w-3.5 h-3.5 transition-transform duration-300 ${isGlastorOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {isGlastorOpen && (
                <motion.ul
                  id="glastor-submenu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="pl-4 ml-2 overflow-hidden flex flex-col gap-3 relative"
                >
                  <div className="absolute left-0 top-0 bottom-4 w-px bg-white/10" />
                  {GLASTOR_SUBMENU_LINKS.map((link, idx) => (
                    <li key={link.href} className={idx === 0 ? "pt-2" : ""}>
                      <Link
                        href={link.href}
                        className="text-zinc-400 hover:text-brand transition-colors text-sm block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li className="pt-2">
            <Link
              href="/arquitectura"
              className="text-brand hover:text-white transition-colors text-sm font-bold block"
            >
              Configurador B2B
            </Link>
          </li>
        </ul>
      </div>

      {/* Columna 2: Recursos */}
      <div>
        <p className="text-xs font-bold text-white tracking-widest mb-5">Recursos</p>
        <ul className="space-y-3">
          {RESOURCE_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-400 hover:text-brand transition-colors text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
            <a
              href="https://www.argentina.gob.ar/economia/industria-y-comercio/defensadelconsumidor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors text-xs font-bold tracking-widest"
            >
              Defensa del Consumidor
            </a>
            <Link
              href="/arrepentimiento"
              className="text-red-500 hover:text-brand transition-colors text-xs font-bold tracking-widest flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Botón de Arrepentimiento
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
