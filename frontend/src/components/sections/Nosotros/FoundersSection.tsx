import { SectionHeader } from '../../ui/SectionHeader';

export function FoundersSection() {
  return (
    <>
      <SectionHeader title="EL NÚCLEO" subtitle="Arquitectos detrás de Glastor" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 mb-32">
        {/* Founder 1 */}
        <div className="group">
          <div className="aspect-square bg-zinc-900 overflow-hidden relative mb-6">
             <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
             {/* Founder Image */}
             <img src="/images/mi-perfil.jpg" alt="Andres A. Cardoso - Fundador" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">Andres A. Cardoso</h3>
          <p className="text-brand font-mono text-xs uppercase tracking-widest mb-4">Fundador de GLASTOR®</p>
          <p className="text-zinc-400 text-sm mb-4">Especialista en arquitecturas de alto rendimiento (Rust/Go). Obsesionado con reducir la latencia a nivel de ciclo de reloj y eliminar la deuda técnica antes de que nazca.</p>
          <div className="flex gap-4">
             <a href="https://github.com/glastor-dev" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity"><img src="/icons/github.svg" alt="GitHub" width="18" height="18" className="invert" /></a>
             <a href="#" className="text-zinc-500 hover:text-[#0077b5] transition-colors"><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>
        </div>
        {/* Founder 2 (Optional/Placeholder) */}
        <div className="group">
          <div className="aspect-square bg-zinc-900 overflow-hidden relative mb-6 border border-white/5 flex items-center justify-center">
             <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors z-10 duration-500"></div>
             <span className="text-zinc-700 font-mono text-xs uppercase tracking-widest text-center px-8">Buscando talento <br/>con alma de Rust</span>
          </div>
          <h3 className="text-2xl font-black text-zinc-600 uppercase tracking-tighter mb-1">Posición Abierta</h3>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4">Sr. Backend Engineer</p>
          <p className="text-zinc-600 text-sm">Si prefieres compilar binarios nativos antes que levantar containers pesados de Node.js, hay un lugar para ti en el núcleo.</p>
        </div>
      </div>
    </>
  );
}
