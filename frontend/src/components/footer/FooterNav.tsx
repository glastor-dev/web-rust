import Link from 'next/link';

export function FooterNav() {
  return (
    <>
      {/* Columna 1: Navegación Principal */}
      <div>
        <h3 className="text-xs font-bold text-white tracking-widest mb-5">Navegación</h3>
        <ul className="space-y-3">
          <li>
            <Link
              href="/"
              className="text-zinc-400 hover:text-brand transition-colors text-sm"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/servicios"
              className="text-zinc-400 hover:text-brand transition-colors text-sm"
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              href="/proyectos"
              className="text-zinc-400 hover:text-brand transition-colors text-sm"
            >
              Proyectos
            </Link>
          </li>
          <li>
            <Link
              href="/nosotros"
              className="text-zinc-400 hover:text-brand transition-colors text-sm"
            >
              Nosotros
            </Link>
          </li>
          <li>
            <Link
              href="/tienda"
              className="text-zinc-400 hover:text-brand transition-colors text-sm flex items-center gap-2"
            >
              Tienda en Acción
              <span className="bg-brand text-black text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
                B2B
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/arquitectura"
              className="text-brand hover:text-white transition-colors text-sm font-bold"
            >
              Configurador B2B
            </Link>
          </li>
        </ul>
      </div>

      {/* Columna 2: Recursos */}
      <div>
        <h3 className="text-xs font-bold text-white tracking-widest mb-5">Recursos</h3>
        <ul className="space-y-3">
          <li>
            <Link
              href="/recursos?tech=rust"
              className="text-zinc-400 hover:text-brand transition-colors text-sm"
            >
              Rust
            </Link>
          </li>
          <li>
            <Link
              href="/recursos?tech=docker"
              className="text-zinc-400 hover:text-brand transition-colors text-sm"
            >
              Docker
            </Link>
          </li>
          <li>
            <Link
              href="/recursos?tech=oxc"
              className="text-zinc-400 hover:text-brand transition-colors text-sm"
            >
              Oxc
            </Link>
          </li>
          <li>
            <Link
              href="/recursos?tech=mongodb"
              className="text-zinc-400 hover:text-brand transition-colors text-sm"
            >
              MongoDB
            </Link>
          </li>
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
    </>
  );
}
