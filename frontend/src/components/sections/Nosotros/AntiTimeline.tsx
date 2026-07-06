import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../reutilizables/accordion';
import { SectionHeader } from '../../ui/SectionHeader';

const antiTimeline = [
  {
    year: '2021',
    title: 'El Monstruo de JS',
    description: 'Intentamos usar 5 frameworks en un proyecto buscando "flexibilidad". Creamos un monstruo inmanejable. Juramos no volver a hacerlo.',
    lesson: 'la simplicidad es la máxima sofisticación.'
  },
  {
    year: '2022',
    title: 'La Depuración de Deuda',
    description: 'Pasamos 6 meses pagando toda la deuda técnica del monstruo. Doloroso. Necesario. Nunca más.',
    lesson: 'la deuda técnica es como la financiera—los intereses te matan.'
  },
  {
    year: '2023',
    title: 'La Purga del Rendimiento',
    description: 'Transición radical a Rust y Bun. Perdimos clientes que exigían plataformas lentas (WordPress). Ganamos paz mental y velocidad extrema.',
    lesson: 'a veces perder clientes es ganar propósito.'
  },
  {
    year: '2024',
    title: 'El Cliente que Exigió Más',
    description: 'Primer enterprise: necesitaban logs inmutables y trazabilidad forense. Lo construimos en 2 semanas sin dormir. Nos volvimos adictos a la exigencia.',
    lesson: 'los requisitos difíciles te hacen mejor.'
  },
  {
    year: '2025',
    title: 'La Migración Silenciosa',
    description: 'Todo el código legacy interno murió. Nadie lo notó en producción. Ese es el verdadero éxito.',
    lesson: 'la mejor migración es la que nadie ve.'
  },
  {
    year: '2026',
    title: 'Cero Compromisos',
    description: 'Consolidación de Glastor. Ya no aceptamos proyectos si no podemos garantizar un 99.9% de uptime y renderizados de 60fps constantes.',
    lesson: 'decir "no" es el nuevo "sí".'
  }
];

export function AntiTimeline() {
  return (
    <>
      <SectionHeader title="LA REALIDAD" subtitle="Nuestros Hitos (y Fracasos)" />
      <p className="text-zinc-400 text-lg mb-16 max-w-2xl font-light">
        No somos perfectos. Pero cada error nos enseñó exactamente lo que funciona.
      </p>
      
      <Accordion type="single" collapsible className="w-full">
        {antiTimeline.map((item, idx) => (
          <AccordionItem key={item.year} value={`item-${idx}`}>
            <AccordionTrigger className="text-xl md:text-2xl hover:text-white">
              <div className="flex items-center gap-6">
                <span className="text-3xl md:text-5xl font-mono text-zinc-600 transition-colors group-hover:text-brand">{item.year}</span>
                <span className="font-black uppercase tracking-tighter">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-22 md:pl-34">
              <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed mb-6 mt-4">{item.description}</p>
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
