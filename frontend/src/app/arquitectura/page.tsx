'use client';

import { useState, useRef, useEffect } from 'react';
import { SOWModal } from '@/components/ui/SOWModal';
import { SOWTemplate } from '@/components/ui/SOWTemplate';
import { ModuleGrid } from '@/components/sections/Configurador/ModuleGrid';
import { EstimatorCart } from '@/components/sections/Configurador/EstimatorCart';
import { useConfiguratorStore } from '@/store/configuratorStore';

export default function Configurador() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [clientInfo, setClientInfo] = useState({ name: '', company: '' });
  const sowRef = useRef<HTMLDivElement>(null);
  const fetchModules = useConfiguratorStore((state) => state.fetchModules);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const handleGenerateSOW = async (data: {
    name: string;
    company: string;
    email: string;
    turnstileToken: string;
  }) => {
    setClientInfo({ name: data.name, company: data.company });
    setIsGenerating(true);

    try {
      if (!sowRef.current) throw new Error('SOWTemplate ref is null');

      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(sowRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.9);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, 1123],
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, 794, 1123);
      const pdfBase64 = pdf.output('datauristring');

      const response = await fetch('/api/sow/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          company: data.company,
          pdf_base64: pdfBase64,
          turnstile_token: data.turnstileToken,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => 'Failed to send email');
        throw new Error(errorBody);
      }

      alert('¡SOW enviado con éxito a ' + data.email + '!');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Hubo un error al generar o enviar el documento.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    useConfiguratorStore.getState().resetConfig();
  };

  useEffect(() => {
    const restoredIds = useConfiguratorStore.getState().selectedModuleIds;
    if (restoredIds.length > 0) {
      useConfiguratorStore.getState().fetchModules();
    }
  }, [fetchModules]);

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[0.9]">
            CONFIGURADOR <span className="text-brand">TÁCTICO.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Selecciona los módulos de ingeniería que necesitas. El sistema calculará la inversión
            base estimada y los plazos de ejecución en tiempo real. Sin cajas negras.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          <div className="w-full lg:w-2/3">
            <ModuleGrid />
          </div>

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
