import { Card, CardHeader, CardDescription, CardContent } from '../reutilizables/card';
import { Database, Activity, Zap } from 'lucide-react';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export function IronCoreSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10 border-t border-editorial">
      <div className="mb-16">
        <h2 className="text-fluid-h3 font-extrabold tracking-tight text-white leading-none">
          El Núcleo DE HIERRO
        </h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-4">
          Datos de Telemetría // Tiempo Real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Metric 1 */}
        <Card className="border-t-brand border-t-2 rounded-none hover:-translate-y-2 transition-transform duration-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-brand">Throughput</CardDescription>
            <Zap className="h-4 w-4 text-brand opacity-50" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold tracking-tight mt-4">
              <AnimatedCounter from={0} to={14250} duration={2.5} suffix="+" />
            </div>
            <p className="text-xs font-mono text-zinc-500 mt-2 uppercase">
              Transacciones Por Segundo
            </p>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="rounded-none hover:-translate-y-2 transition-transform duration-500 delay-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Latencia P99</CardDescription>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold tracking-tight mt-4 text-white">
              <AnimatedCounter
                from={10}
                to={0.8}
                duration={2}
                decimals={1}
                prefix="<"
                suffix="ms"
              />
            </div>
            <p className="text-xs font-mono text-zinc-500 mt-2 uppercase">
              Tiempo de Respuesta Global
            </p>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="rounded-none hover:-translate-y-2 transition-transform duration-500 delay-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Disponibilidad</CardDescription>
            <Database className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-extrabold tracking-tight mt-4 text-white">
              <AnimatedCounter from={0} to={99.99} duration={3} decimals={2} suffix="%" />
            </div>
            <p className="text-xs font-mono text-zinc-500 mt-2 uppercase">Uptime Garantizado</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
