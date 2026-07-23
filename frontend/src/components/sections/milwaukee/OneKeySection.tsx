'use client';

export function OneKeySection() {
  return (
    <section className="w-full bg-[#050505] py-20 md:py-32 overflow-hidden relative border-y border-white/5">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="mb-8 inline-block bg-white px-4 py-2 rounded-lg">
            <img
              src="https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_160/v1784440479/onekey_jxyrjx.webp"
              alt="One-Key Logo"
              width="300"
              height="100"
              className="h-8 md:h-12 w-auto object-contain"
            />
          </div>
          <p className="text-white font-extrabold text-3xl md:text-5xl tracking-tight leading-tight mb-6">
            Productividad y gestión en la nube.
          </p>
          <p className="text-zinc-400 text-lg mb-10 max-w-md leading-relaxed">
            Personaliza el rendimiento de tu herramienta, rastrea su ubicación y gestiona tu
            inventario completo desde la plataforma más avanzada del mercado.
          </p>

          <div className="flex flex-col gap-4 mb-12">
            <div className="inline-flex items-center gap-4 border border-white/10 bg-white/5 px-5 py-3.5 rounded-md w-fit backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_10px_rgba(0,255,102,0.8)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                Disponible en herramientas selectas
              </span>
            </div>
            <div className="inline-flex items-center gap-4 border border-white/10 bg-white/5 px-5 py-3.5 rounded-md w-fit backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_10px_rgba(0,255,102,0.8)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                Suscripción gestionable por cuenta
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="/connect"
              className="group relative overflow-hidden inline-flex items-center justify-center bg-[#050505] border border-brand text-brand font-extrabold uppercase tracking-widest px-8 py-4 text-sm rounded-md transition-colors text-center"
            >
              <span className="absolute inset-0 bg-brand w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-brand group-hover:text-black transition-colors duration-300">
                MÁS SOBRE ONE-KEY™
              </span>
            </a>
            <a
              href="/tienda"
              className="inline-flex justify-center items-center gap-2 bg-zinc-900 border border-zinc-800 text-white font-bold uppercase tracking-widest px-8 py-4 text-sm rounded-md hover:bg-zinc-800 hover:border-zinc-700 transition-all text-center"
            >
              Comprar ahora
            </a>
          </div>
        </div>

        <div className="relative h-80 md:h-125 flex items-center justify-center w-full mt-10 md:mt-0">
          {/* Subtle Glow Behind Image */}
          <div className="absolute inset-0 bg-brand/15 blur-[120px] rounded-full scale-75 translate-x-12 translate-y-12" />
          
          <img
            src="https://res.cloudinary.com/dzualplqi/image/upload/v1784804585/key2_scogiz.png"
            alt="One-Key Glastor Connect"
            className="w-full h-full object-contain relative z-10 hover:scale-105 hover:-rotate-2 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
