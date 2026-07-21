import { Button } from '@/components/reutilizables/button';
import { trackEvent } from '@/lib/analytics';

export function FooterCTA() {
  return (
    <div className="lg:col-span-5 pr-0 lg:pr-8">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        ¿Listos para Escalar??
      </h2>
      <p className="text-zinc-400 text-sm md:text-base mb-8 max-w-md">
        Tu arquitectura técnica debería ser una ventaja competitiva, no un centro de costos.
        Agenda 15 minutos directos con nuestro Tech Lead. Cero fricción, cero comerciales.
      </p>

      <Button
        size="lg"
        variant="default"
        className="h-14 px-8 text-sm tracking-widest w-full sm:w-auto"
        onClick={() => trackEvent('click_cta_footer')}
        asChild
      >
        <a
          href="https://cal.com/andres-zl5hcb/15min"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar Auditoría (15 Min)
        </a>
      </Button>
    </div>
  );
}
