'use client';

export function ActionBanners() {
  return (
    <div className="w-full flex flex-col">
      {/* Banner 1: ¿Ya lo compraste? */}
      <section className="w-full bg-brand py-12 flex flex-col items-center justify-center relative">
        <h3 className="text-black font-black uppercase text-2xl md:text-3xl tracking-tighter mb-6">
          ¿YA LO COMPRASTE?
        </h3>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-black font-bold uppercase text-xs md:text-sm tracking-widest px-6 py-3 hover:bg-black hover:text-white transition-colors flex items-center gap-2">
            <span className="w-4 h-4 bg-black/10 flex items-center justify-center">M</span> Manuales
          </button>
          <button className="bg-white text-black font-bold uppercase text-xs md:text-sm tracking-widest px-6 py-3 hover:bg-black hover:text-white transition-colors flex items-center gap-2">
            <span className="w-4 h-4 bg-black/10 flex items-center justify-center">G</span> Garantía
          </button>
          <button className="bg-white text-black font-bold uppercase text-xs md:text-sm tracking-widest px-6 py-3 hover:bg-black hover:text-white transition-colors flex items-center gap-2">
            <span className="w-4 h-4 bg-black/10 flex items-center justify-center">P</span> Piezas
          </button>
          <button className="bg-white text-black font-bold uppercase text-xs md:text-sm tracking-widest px-6 py-3 hover:bg-black hover:text-white transition-colors flex items-center gap-2">
            <span className="w-4 h-4 bg-black/10 flex items-center justify-center">S</span> Servicio
          </button>
        </div>

        {/* Faint line separator */}
        <div className="absolute bottom-0 w-full max-w-4xl h-px bg-black/10" />
      </section>

      {/* Banner 2: Inicia sesión */}
      <section className="w-full bg-brand py-12 flex flex-col items-center justify-center relative">
        <h3 className="text-black font-black uppercase text-2xl md:text-3xl tracking-tighter mb-6">
          INICIA SESIÓN EN TU CUENTA
        </h3>

        <div className="flex flex-wrap justify-center gap-6 mb-8 text-black text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">✓ HISTORIAL DE COMPRAS</div>
          <div className="flex items-center gap-2">✓ PREFERENCIAS DE COMUNICACIÓN</div>
          <div className="flex items-center gap-2">✓ RASTREO DE HERRAMIENTAS ONE-KEY™</div>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-black text-white font-bold uppercase text-sm tracking-widest px-8 py-3 hover:bg-white hover:text-black transition-colors border-2 border-black">
            INICIAR SESIÓN
          </button>
          <a
            href="/registro"
            className="text-black text-xs font-bold underline hover:text-white transition-colors"
          >
            ¿NO TIENES CUENTA? <br /> CREA UNA CUENTA AQUÍ
          </a>
        </div>
      </section>
    </div>
  );
}
