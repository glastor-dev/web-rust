'use client';

import Link from 'next/link';

const NAVIGATION_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Configurador B2B', href: '/arquitectura' },
];

const RESOURCE_LINKS = [
  {
    label: 'Organización @glastor-core (OSS)',
    href: 'https://github.com/glastor-core',
    external: true,
  },
  { label: 'Ecosistema Rust', href: '/recursos?tech=rust' },
  { label: 'Docker & Microservicios', href: '/recursos?tech=docker' },
  { label: 'Kubernetes & Clústeres', href: '/recursos?tech=kubernetes' },
  { label: 'PostgreSQL & Persistencia', href: '/recursos?tech=postgresql' },
  { label: 'Portal Legal', href: '/legales' },
];

export function FooterNav() {
  return (
    <nav aria-label="Navegación del pie de página" className="contents">
      {/* Columna 1: Navegación Principal */}
      <div>
        <p className="text-xs font-bold text-white tracking-widest uppercase mb-5">
          Ingeniería & Soluciones
        </p>
        <ul className="space-y-3">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-400 hover:text-brand transition-colors text-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Columna 2: Recursos Técnicos & Stack */}
      <div>
        <p className="text-xs font-bold text-white tracking-widest uppercase mb-5">
          Stack & Recursos
        </p>
        <ul className="space-y-3">
          {RESOURCE_LINKS.map((link) => (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-brand transition-colors text-sm flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] font-mono text-brand opacity-60 group-hover:opacity-100">
                    ↗
                  </span>
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-zinc-400 hover:text-brand transition-colors text-sm"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
