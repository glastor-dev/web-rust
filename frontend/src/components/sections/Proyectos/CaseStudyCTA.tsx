import { Calendar } from 'lucide-react';
import { Button } from '@/components/reutilizables/button';

export function CaseStudyCTA() {
  return (
    <div className="mt-24 p-8 md:p-16 bg-brand text-black rounded-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl text-center md:text-left">
        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
          ¿Tu infraestructura actual es un cuello de botella?
        </h3>
        <p className="text-black/70 text-lg font-medium">
          Hablemos de cómo reducir tu latencia, optimizar costes y escalar tu sistema en los
          próximos 30 días.
        </p>
      </div>

      <div className="relative z-10 shrink-0">
        <Button
          asChild
          size="lg"
          className="bg-black text-brand hover:bg-zinc-900 border-none rounded-none uppercase font-bold tracking-widest flex items-center gap-3 w-full sm:w-auto"
        >
          <a href="#contacto">
            <Calendar className="w-5 h-5" />
            Agendar Sesión Técnica
          </a>
        </Button>
      </div>
    </div>
  );
}
