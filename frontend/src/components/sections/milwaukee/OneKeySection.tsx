'use client';

export function OneKeySection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="mb-6">
            <img
              src="https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_160/v1784440479/onekey_jxyrjx.webp"
              alt="One-Key Logo"
              width="300"
              height="100"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>
          <p className="text-zinc-800 font-bold text-xl mb-4">
            Productividad y gestión en la nube.
          </p>
          <p className="text-zinc-600 mb-6 max-w-md">
            Personaliza el rendimiento de tu herramienta, rastrea su ubicación y gestiona tu
            inventario completo desde la plataforma más avanzada del mercado.
          </p>

          <div className="flex flex-col gap-3 mb-8">
            <div className="inline-flex items-center gap-3 border border-black/10 bg-black/[0.03] px-3 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-800">
                Disponible en herramientas M18 selectas
              </span>
            </div>
            <div className="inline-flex items-center gap-3 border border-black/10 bg-black/[0.03] px-3 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-800">
                Suscripción gestionable por cuenta
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/connect"
              className="inline-block bg-brand text-black font-black uppercase tracking-widest px-8 py-3 text-sm hover:bg-black hover:text-white transition-colors"
            >
              MÁS SOBRE ONE-KEY™
            </a>
            <a
              href="/tienda"
              className="inline-flex items-center gap-2 border-2 border-black text-black font-black uppercase tracking-widest px-6 py-3 text-sm hover:bg-black hover:text-white transition-colors"
            >
              Comprar ahora
            </a>
          </div>
        </div>

        <div className="relative h-64 md:h-[420px] flex items-center justify-center w-full">
          <img
            src="https://res.cloudinary.com/dzualplqi/image/upload/f_auto,q_auto,w_300/v1784440743/openkey2_zjgke4.png"
            alt="One-Key Glastor Connect"
            className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
