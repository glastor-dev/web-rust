import { useState, useRef, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { SOWModal } from '../components/ui/SOWModal';
import { SOWTemplate } from '../components/ui/SOWTemplate';
import { ModuleGrid } from '../components/sections/Configurador/ModuleGrid';
import { EstimatorCart } from '../components/sections/Configurador/EstimatorCart';
import { useConfiguratorStore } from '../store/configuratorStore';

export default function Configurador() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [clientInfo, setClientInfo] = useState({ name: '', company: '' });
  const sowRef = useRef<HTMLDivElement>(null);
  const fetchModules = useConfiguratorStore(state => state.fetchModules);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const handleGenerateSOW = async (data: { name: string; company: string; email: string }) => {
    setClientInfo({ name: data.name, company: data.company });
    setIsGenerating(true);

    try {
      // Permitir renderizado del componente oculto antes de capturar
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!sowRef.current) throw new Error("SOWTemplate ref is null");

      // Dynamic import of html2canvas and jsPDF (Code Splitting)
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(sowRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, 1123] // A4 dimensions
      });
      
      pdf.addImage(imgData, 'JPEG', 0, 0, 794, 1123);
      const pdfBase64 = pdf.output('datauristring');

      const response = await fetch('http://localhost:3001/api/sow/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          company: data.company,
          pdf_base64: pdfBase64
        })
      });

      if (!response.ok) throw new Error("Failed to send email");

      alert("¡SOW enviado con éxito a " + data.email + "!");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al generar o enviar el documento.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO 
        title="Glastor | Configura tu Arquitectura"
        description="Calcula la inversión estimada y el tiempo de despliegue para llevar tu sistema al siguiente nivel."
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4 leading-[0.9]">
            CONFIGURADOR <span className="text-brand">TÁCTICO.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Selecciona los módulos de ingeniería que necesitas. El sistema calculará la inversión base estimada y los plazos de ejecución en tiempo real. Sin cajas negras.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Left Column: Modules Grid */}
          <div className="w-full lg:w-2/3">
            <ModuleGrid />
          </div>

          {/* Right Column: Sticky "Cart" Panel */}
          <div className="w-full lg:w-1/3">
            <EstimatorCart onGenerate={() => setIsModalOpen(true)} />
          </div>

        </div>
      </div>
      
      <SOWModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleGenerateSOW} 
        isGenerating={isGenerating} 
      />
      <SOWTemplate 
        ref={sowRef} 
        company={clientInfo.company || 'TU EMPRESA'} 
        name={clientInfo.name || 'CLIENTE'} 
      />
    </div>
  );
}
