'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpIcon } from 'lucide-react';

export function FooterBottom() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6 relative">
      {/* Left: Copyright */}
      <div className="text-zinc-400 text-[10px] md:text-xs font-mono tracking-widest text-center lg:text-left flex flex-col gap-1 order-2 lg:order-1">
        <span>
          {new Date().getFullYear()} GLASTOR® es una marca registrada en Argentina (INPI — Reg.
          4559568 y 4559567, 19/08/2025).
        </span>
        <span>
          © 2010-{new Date().getFullYear()} GLASTOR-DEV, propiedad de GLASTOR®. Todos los
          derechos reservados.
        </span>
        <span className="text-zinc-400">
          Glastor Core v.{process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}
        </span>
      </div>

      {/* Right: Social, Legal & Payments */}
      <div className="flex flex-col items-center lg:items-end gap-3 order-1 lg:order-2 w-full lg:w-auto pr-0 lg:pr-16">
        {/* Legal Links */}
        <div className="flex gap-4 text-[10px] md:text-xs font-mono tracking-widest">
          <Link href="/legales" className="text-zinc-400 hover:text-brand transition-colors">
            Portal Legal / Compliance
          </Link>
        </div>

        {/* Medios de Pago */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <Image src="/icons/visa.svg" alt="Visa" width={40} height={24} className="h-6 object-contain" />
          <Image src="/icons/mastercard.svg" alt="Mastercard" width={40} height={24} className="h-6 object-contain" />
          <Image
            src="/icons/american-express.svg"
            alt="American Express"
            width={40}
            height={24}
            className="h-6 object-contain"
          />
          <div className="w-px h-5 bg-white/20 mx-1 hidden sm:block"></div>
          <Image src="/icons/bitcoin.svg" alt="Bitcoin" width={40} height={24} className="h-6 object-contain" />
          <Image src="/icons/tether.svg" alt="Tether" width={40} height={24} className="h-6 object-contain" />
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute top-0 right-0 lg:-top-4 lg:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 hover:border-brand hover:text-brand flex items-center justify-center text-zinc-400 transition-all duration-300 hover:-translate-y-2 group bg-black z-20"
        aria-label="Volver arriba"
      >
        <ArrowUpIcon size={18} className="group-hover:animate-bounce" />
      </button>
    </div>
  );
}
