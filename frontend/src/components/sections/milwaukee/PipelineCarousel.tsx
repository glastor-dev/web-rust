'use client';

import Image from 'next/image';

export function PipelineCarousel() {
  const products = [
    {
      tag: 'NUEVO',
      name: 'Taladro angular M18 FUEL™ Hole Hawg™',
      series: '2808-20',
      img: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_200/v1784390894/sec1_ptmnqa.webp',
      price: '34 USD',
      promise: 'Stock 48h',
    },
    {
      tag: 'MÁS VENDIDO',
      name: 'Pulidora/lijadora de velocidad variable M12™',
      series: '2438-20',
      img: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_200/v1784390626/sec2_xz4f3u.webp',
      price: '229 USD',
      promise: 'Garantía 1 año',
    },
    {
      tag: 'NUEVO',
      name: 'Llave de impacto subcompacta M12 FUEL™',
      series: '3048-20',
      img: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_200/v1784390264/sec4_yuyjes.webp',
      price: '42 USD',
      promise: 'Envío inmediato',
    },
    {
      tag: 'OFERTA',
      name: 'Sierra de corte MX FUEL™ de 14"',
      series: 'MXF315-0',
      img: 'https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_200/v1784389365/sec3_xjrh4g.webp',
      price: '159 USD',
      promise: 'Kit recomendado',
    },
  ];

  return (
    <section className="w-full bg-[#050505] py-14 relative overflow-hidden border-b-4 border-brand">
      <div className="absolute inset-0 opacity-80 pointer-events-none mix-blend-screen">
        <Image src="/images/glastor_pipeline_bg.png" alt="Background" fill quality={60} sizes="100vw" className="object-cover object-center" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-start gap-10">
        <div className="text-white shrink-0 text-center md:text-left">
          <div className="font-black text-2xl tracking-tighter italic">MILWAUKEE</div>
          <div className="font-black text-4xl tracking-tighter text-brand">PIPELINE</div>
          <div className="text-xs uppercase tracking-widest mt-1 opacity-80">
            Lanzamientos en stock
          </div>
          <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-mono text-zinc-300 border border-white/10 bg-black/40 px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-brand" />
            Envío en 24/48h para productos Milwaukee
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((prod, i) => (
            <div
              key={i}
              className="group relative border border-white/10 bg-black flex flex-col overflow-hidden hover:border-brand/50 hover:shadow-[0_0_24px_rgba(0,255,102,0.22)] transition-all"
            >
              <div className="relative aspect-square bg-[#080808] flex items-center justify-center">
                <span className="absolute top-2 left-2 text-[10px] font-mono font-bold bg-brand text-black uppercase tracking-widest px-2 py-1">
                  {prod.tag}
                </span>
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="w-full h-full object-contain drop-shadow-md p-4"
                />
              </div>

              <div className="p-4 border-t border-white/5">
                <div className="text-[10px] font-mono text-brand uppercase tracking-widest mb-1">
                  {prod.series}
                </div>
                <div className="text-white text-xs font-black uppercase tracking-tight leading-snug line-clamp-2">
                  {prod.name}
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-white font-mono">{prod.price}</span>
                  <span className="text-[10px] font-mono text-zinc-400 hidden md:block">
                    {prod.promise}
                  </span>
                </div>

                <div className="mt-3 flex">
                  <a
                    href={`mailto:ventas@glastor.es?subject=Cotización de ${encodeURIComponent(prod.name)}`}
                    className="flex-1 text-center py-2 bg-brand text-black text-xs font-black uppercase cursor-pointer hover:bg-white transition-colors"
                  >
                    Cotizar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
