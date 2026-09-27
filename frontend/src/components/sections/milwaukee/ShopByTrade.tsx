'use client';

import { motion } from 'motion/react';
import { ArrowRight01Icon } from 'hugeicons-react';
import Link from 'next/link';

const TRADES = [
  {
    id: 'electrician',
    name: 'ELECTRICISTAS',
    tools: ['Pelacables M12', 'Multímetro digital', 'Pinza amperimétrica'],
    bgImage: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto/v1785161068/m12-1_kakk4s.webp',
    link: '/tienda?category=electricistas',
  },
  {
    id: 'plumbing',
    name: 'PLOMEROS',
    tools: ['Cortatubos M12', 'Cámara de inspección', 'Destapadora M18'],
    bgImage: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto/v1785161068/m12-2_dm6kng.webp',
    link: '/tienda?category=plomeros',
  },
  {
    id: 'mechanics',
    name: 'MECÁNICA',
    tools: ['Llave de impacto', 'Carraca extendida M12', 'Luz de capó'],
    bgImage: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto/v1785161068/m12-3_m0f0fi.webp',
    link: '/tienda?category=mecanica',
  },
  {
    id: 'heavy',
    name: 'OBRA PESADA',
    tools: ['Martillo SDS MAX', 'Sierra circular M18', 'Taladro magnético'],
    bgImage: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto/v1785161068/m12-4_atdiqk.webp',
    link: '/tienda?category=obra-pesada',
  },
];

export function ShopByTrade() {
  return (
    <section className="w-full bg-black py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
            COMPRAR POR <span className="text-brand">OFICIO</span>
          </h2>
          <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest mt-2">
            Herramientas diseñadas para los desafíos de tu día a día
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRADES.map((trade, idx) => (
            <Link
              key={trade.id}
              href={trade.link}
              className="group relative flex flex-col justify-end overflow-hidden border border-white/10 bg-[#050505] transition-all duration-500 hover:border-brand/50 hover:shadow-[0_0_30px_rgba(0,255,102,0.1)] cursor-pointer aspect-square"
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                style={{ backgroundImage: `url(${trade.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60" />

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-mono bg-brand text-black font-bold uppercase tracking-widest px-2 py-1 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    VER ECOSISTEMA
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 transition-transform duration-500 group-hover:-translate-y-2 group-hover:text-brand">
                    {trade.name}
                  </h3>
                  
                  <div className="space-y-2 h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:h-auto group-hover:opacity-100 group-hover:mb-4">
                    {trade.tools.map((tool, i) => (
                      <div key={i} className="flex items-center gap-2 text-zinc-300 text-sm font-mono">
                        <span className="w-1.5 h-1.5 bg-brand/50 rounded-full" />
                        {tool}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/20 pt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-white uppercase tracking-widest group-hover:text-brand transition-colors">
                      Explorar
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand transition-colors">
                      <ArrowRight01Icon className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
