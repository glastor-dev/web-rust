import { PageHero } from '../components/ui/PageHero';
import { SEO } from '../components/SEO';
import { MetricsSection } from '../components/sections/Proyectos/MetricsSection';
import { PretextMasonryGrid } from '../components/sections/Proyectos/PretextMasonryGrid';

export default function Proyectos() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO 
        title="Glastor | Casos y Proyectos"
        description="Casos de estudio donde la ingeniería inquebrantable de Glastor solucionó problemas reales de escala y rendimiento."
        url="https://glastor.dev/proyectos"
      />
      
      {/* Hero */}
      <PageHero 
        title={<>CASOS DE<br /><span className="text-brand">ESTUDIO.</span></>}
        description="Sistemas desplegados en el mundo real. Latencia p99 mínima, uptime garantizado y retorno de inversión medible."
        minHeight="min-h-[50vh]"
      />

      {/* Respuesta al Mapa de Empatía: ¿Funciona lo que hacemos? */}
      <MetricsSection />

      {/* Masonry Grid con Pretext */}
      <PretextMasonryGrid />
    </div>
  );
}
