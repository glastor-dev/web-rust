import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../reutilizables/accordion';
import { SectionHeader } from '../../ui/SectionHeader';

const antiTimeline = [
  {
    year: '2021',
    title: 'El Monstruo de JS',
    description:
      'Intentamos usar 5 frameworks en un proyecto buscando "flexibilidad". Creamos un monstruo inmanejable. Juramos no volver a hacerlo.',
    stats: [
      'Tamaño del bundle inicial: 8.5MB',
      'Tiempo de compilación: 14 minutos',
      'Consumo RAM: 3.2GB para 50 usuarios concurrentes',
    ],
    lesson: 'la simplicidad es la máxima sofisticación.',
  },
  {
    year: '2022',
    title: 'La Depuración de Deuda',
    description:
      'Pasamos 6 meses pagando toda la deuda técnica del monstruo. Doloroso. Necesario. Nunca más.',
    stats: [
      'Líneas de código eliminadas: -145,000',
      'Dependencias NPM removidas: 84',
      'Reducción tiempo de CI/CD: 25m → 3m',
    ],
    lesson: 'la deuda técnica es como la financiera—los intereses te matan.',
  },
  {
    year: '2023',
    title: 'La Purga del Rendimiento',
    description: 'Migramos el sistema de [Cliente X] de Node.js a Rust:',
    stats: [
      'Latencia reducida 94%',
      'Costos de servidor -67%',
      'Tiempo de respuesta p99: de 1.2s a 78ms',
    ],
    lesson: 'a veces perder clientes es ganar propósito.',
  },
  {
    year: '2024',
    title: 'El Cliente que Exigió Más',
    description:
      'Primer enterprise: necesitaban logs inmutables y trazabilidad forense. Lo construimos en 2 semanas sin dormir. Nos volvimos adictos a la exigencia.',
    stats: [
      'Eventos procesados: 10,000 req/seg',
      'Pérdida de datos garantizada: 0.00%',
      'Tiempo récord de desarrollo: 14 días',
    ],
    lesson: 'los requisitos difíciles te hacen mejor.',
  },
  {
    year: '2025',
    title: 'La Migración Silenciosa',
    description:
      'Todo el código legacy interno murió. Nadie lo notó en producción. Ese es el verdadero éxito.',
    stats: [
      'Downtime durante migración: 0 segundos',
      'Incidentes reportados post-pase: 0',
      'Reducción de CPU promedio: 82%',
    ],
    lesson: 'la mejor migración es la que nadie ve.',
  },
  {
    year: '2026',
    title: 'Cero Compromisos',
    description:
      'Consolidación de Glastor. Ya no aceptamos proyectos si no podemos garantizar rendimientos extremos desde el contrato.',
    stats: [
      'SLA Garantizado: 99.99% Uptime',
      'Performance Front-end: 60fps constantes',
      'Cláusula técnica: Reembolso por incumplimiento',
    ],
    lesson: 'decir "no" es el nuevo "sí".',
  },
];

export function AntiTimeline() {
  return (
    <>
      <SectionHeader title="La Realidad" subtitle="Nuestros Hitos (y Fracasos)" />
      <p className="text-zinc-400 text-lg mb-16 max-w-2xl font-light">
        No somos perfectos. Pero cada error nos enseñó exactamente lo que funciona.
      </p>

      <Accordion type="single" collapsible className="w-full">
        {antiTimeline.map((item, idx) => (
          <AccordionItem key={item.year} value={`item-${idx}`}>
            <AccordionTrigger className="text-xl md:text-2xl hover:text-white">
              <div className="flex items-center gap-6">
                <span className="text-3xl md:text-5xl font-mono text-zinc-500 transition-colors group-hover:text-brand">
                  {item.year}
                </span>
                <span className="font-extrabold tracking-tight">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-22 md:pl-34">
              <p
                className={`text-zinc-400 text-lg max-w-2xl leading-relaxed mt-4 ${item.stats ? 'mb-4' : 'mb-6'}`}
              >
                {item.description}
              </p>

              {item.stats && (
                <ul className="space-y-2 mb-6">
                  {item.stats.map((stat, i) => (
                    <li
                      key={i}
                      className="text-zinc-300 text-base flex items-start gap-3 font-mono"
                    >
                      <span className="text-brand">→</span> {stat}
                    </li>
                  ))}
                </ul>
              )}

              {item.lesson && (
                <p className="text-xs md:text-sm font-mono text-brand uppercase tracking-widest bg-brand/5 p-4 border-l-2 border-brand inline-block mb-4">
                  Lección: {item.lesson}
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
