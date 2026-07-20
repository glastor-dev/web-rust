'use client';

export function HeavyDutyFooter() {
  return (
    <footer className="w-full bg-[#050505] pt-12 border-t-8 border-brand">
      <div className="w-full bg-brand py-6 flex items-center justify-center">
        <h2 className="text-black font-black uppercase text-2xl md:text-4xl tracking-tight italic">
          Nothing but <span className="font-black text-black tracking-tighter">HEAVY DUTY.®</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-zinc-400 text-xs">
        {/* Column 1 */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-widest">Novedades</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Nuevos Productos
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Innovación MX FUEL™
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Eventos Pipeline
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-widest">Soporte</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Manuales y Despieces
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Garantía E-Service
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Centros de Servicio
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-widest">Acerca De</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Nuestra Historia
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Sustentabilidad
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                Oportunidades B2B
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter / Social */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-widest">Regístrate</h3>
          <p className="mb-4 text-[10px] leading-tight">
            Recibe las últimas noticias y ofertas exclusivas de equipos pesados.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="bg-white/5 border border-white/20 p-2 w-full text-white"
            />
            <button className="bg-brand text-black font-bold px-4 uppercase hover:bg-white transition-colors">
              IR
            </button>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/10 py-6 text-center text-[10px] text-zinc-600">
        <p>© 2026 Glastor Tool. Todos los derechos reservados. Configurado como demo B2B.</p>
      </div>
    </footer>
  );
}
