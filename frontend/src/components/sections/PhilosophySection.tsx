// No external imports needed here if not using motion
import { EditorialCard } from '../reutilizables/EditorialCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../reutilizables/accordion";

export default function PhilosophySection() {
  return (
    <section className="py-32 relative max-w-7xl mx-auto px-6 md:px-12 border-t border-editorial">
      
      <div className="mb-24">
        <EditorialCard 
          title="NUESTRA FILOSOFÍA" 
          text="El código no debe interponerse entre tú y tu idea. Si tu herramienta te hace esperar, te está robando fluidez. Nuestra obsesión no es la tecnología; es eliminar la fricción absoluta. Cuando la tecnología funciona con la precisión de un reloj suizo, tú puedes dedicarte a lo que importa: liderar y transformar."
          fontFamily="Inter, sans-serif"
          fontSize={28}
          lineHeight={40}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-black uppercase tracking-widest text-zinc-500 mb-8">El Stack de Hierro</h3>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>01. RUST: SEGURO POR DISEÑO</AccordionTrigger>
            <AccordionContent>
              Rust no es solo un lenguaje rápido; garantiza matemáticamente la seguridad de la memoria y la ausencia de condiciones de carrera. Lo usamos para los microservicios core donde un error en producción cuesta millones. Es la definición de "Dormir tranquilo".
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>02. BUN: VELOCIDAD EXTREMA EN JS</AccordionTrigger>
            <AccordionContent>
              Reemplazamos Node.js por Bun. Los tiempos de arranque bajaron de segundos a milisegundos. Instalación de paquetes instantánea. Un servidor HTTP integrado 4 veces más rápido. La experiencia de desarrollo es tan fluida que parece magia.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>03. WEBGL: EXPERIENCIAS INMERSIVAS</AccordionTrigger>
            <AccordionContent>
              El DOM HTML tiene límites físicos. Cuando necesitamos que la web se sienta como un videojuego AAA o mostrar 10,000 partículas en tiempo real sin quemar la GPU, cruzamos la frontera hacia WebGL y Shaders GLSL. Rendimiento crudo directo al navegador.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
