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
      {/* Left: Copyright - PC Version */}
      <div className="hidden lg:flex text-zinc-400 text-xs font-mono tracking-widest flex-col gap-1 order-2 lg:order-1">
        <span>© 2010-{new Date().getFullYear()} GLASTOR®. Todos los derechos reservados.</span>
        <span>GLASTOR® es una marca registrada en Argentina ante el INPI (Reg. N° 4559568 y 4559567 del 19/08/2025).</span>
        <span>Los precios están expresados en moneda local e incluyen IVA.</span>
        <span>Emitimos Factura Electrónica A y B según corresponda.</span>
        <span>CUIT 23-25316566-9 | Responsable Inscripto | Ingresos Brutos: Convenio Multilateral</span>
        <span className="text-zinc-500 mt-2">GLASTOR-DEV (División de Desarrollo) | GLASTOR® Core v.{process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}</span>
      </div>

      {/* Left: Copyright - Mobile Version */}
      <div className="flex lg:hidden text-zinc-400 text-[10px] sm:text-xs font-mono tracking-widest text-center flex-col gap-1 order-2">
        <span>© 2010-{new Date().getFullYear()} GLASTOR®. Marca registrada ante el INPI (Reg. 4559568 y 4559567).</span>
        <span>CUIT 23-25316566-9 | Resp. Inscripto | IB: Convenio Multilateral.</span>
        <span>Precios en moneda local con IVA. Emitimos Factura A/B.</span>
        <span className="text-zinc-500 mt-2">GLASTOR-DEV | Core v.{process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}</span>
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
        className="group absolute top-0 right-0 lg:-top-4 lg:-right-4 w-12 h-12 md:w-14 md:h-14 bg-[#050505] border border-white/10 hover:border-brand flex flex-col items-center justify-center text-zinc-500 hover:text-black transition-colors duration-300 overflow-hidden z-20 rounded-md"
        aria-label="Volver arriba"
      >
        <span className="absolute inset-0 bg-brand w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <ArrowUpIcon size={16} className="relative z-10 mb-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        <span className="relative z-10 text-[8px] md:text-[9px] font-mono font-bold tracking-widest uppercase">TOP</span>
      </button>
    </div>
  );
}
