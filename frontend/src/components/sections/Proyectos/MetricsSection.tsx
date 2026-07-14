import { Card, CardContent } from '../../reutilizables/card';
import { AnimatedCounter } from '../../ui/AnimatedCounter';

export function MetricsSection() {
  return (
    <section
      id="funciona"
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-y border-white/10 my-12 bg-[#050505]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-center lg:text-left">
        <div className="lg:col-span-1 flex flex-col justify-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">
            ¿Funciona
            <br />
            <span className="text-brand">Lo que hacemos?</span>
          </h2>
          <p className="text-zinc-400 text-sm">
            No te pedimos que confíes en nosotros. Confía en las métricas de producción de los
            sistemas que ya están operando a escala global.
          </p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="rounded-none hover:-translate-y-2 transition-transform duration-500">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
              <span className="text-4xl font-black text-white mb-2">
                <AnimatedCounter from={0} to={99.999} duration={3} decimals={3} suffix="%" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Uptime Garantizado
              </span>
            </CardContent>
          </Card>

          <Card className="rounded-none hover:-translate-y-2 transition-transform duration-500 delay-100 border-t-brand border-t-2">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
              <span className="text-4xl font-black text-brand mb-2">
                <AnimatedCounter from={10} to={2} duration={2} prefix="< " suffix="ms" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Latencia P99
              </span>
            </CardContent>
          </Card>

          <Card className="rounded-none hover:-translate-y-2 transition-transform duration-500 delay-200">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
              <span className="text-4xl font-black text-white mb-2">
                <AnimatedCounter from={0} to={10} duration={2.5} suffix="k+" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Transacciones por Segundo
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
