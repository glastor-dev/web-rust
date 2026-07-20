import React from 'react';
import { useConfiguratorStore } from '../../store/configuratorStore';

export const SOWTemplate = React.forwardRef<HTMLDivElement, { company: string; name: string }>(
  ({ company, name }, ref) => {
    const availableModules = useConfiguratorStore((state) => state.availableModules);
    const selectedModuleIds = useConfiguratorStore((state) => state.selectedModuleIds);
    const totalInversion = useConfiguratorStore((state) => state.totalPrice);
    const selectedModules = availableModules.filter((m) => selectedModuleIds.includes(m.id));

    // Fixed A4 size in pixels for 96 DPI: 794px by 1123px
    // Usando tema claro (fondo blanco, texto negro/gris oscuro) para el PDF
    return (
      <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none overflow-hidden">
        <div
          ref={ref}
          className="bg-white text-black p-12 relative flex flex-col"
          style={{ width: '794px', minHeight: '1123px', fontFamily: 'monospace' }}
        >
          {/* Header */}
          <div className="border-b border-black/10 pb-8 mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight mb-2 text-black">GLASTOR®</h1>
              <p className="text-zinc-500 text-sm tracking-widest uppercase">
                Statement of Work (SOW)
              </p>
            </div>
            <div className="text-right">
              {/* Usando un verde más oscuro para buen contraste sobre blanco */}
              <p className="text-[#00a843] font-bold">FECHA: {new Date().toLocaleDateString()}</p>
              <p className="text-zinc-500 text-xs mt-1">VÁLIDO POR 15 DÍAS</p>
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-12">
            <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">PREPARADO PARA</p>
            <h2 className="text-2xl font-bold uppercase text-black">{company}</h2>
            <p className="text-zinc-600">Atención: {name}</p>
          </div>

          {/* Modules Table */}
          <div className="flex-1">
            <p className="text-[#00a843] text-sm tracking-widest uppercase mb-4 font-bold border-b border-black/10 pb-2">
              MÓDULOS DE ARQUITECTURA SELECCIONADOS
            </p>
            <div className="flex flex-col gap-4">
              {selectedModules.length === 0 ? (
                <p className="text-zinc-500 text-sm italic">Ningún módulo seleccionado.</p>
              ) : (
                selectedModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex justify-between items-start border-b border-black/5 pb-4"
                  >
                    <div className="pr-8">
                      <h4 className="font-bold text-lg mb-1 text-black">{module.title}</h4>
                      <p className="text-zinc-600 text-xs max-w-lg">{module.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-black font-mono font-bold">
                        ${module.base_price?.toLocaleString() || 0} USD
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Totals */}
          <div className="mt-12 border-t border-black/10 pt-8 flex justify-end">
            <div className="w-1/2 bg-zinc-50 p-6 border border-black/10">
              <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">
                INVERSIÓN TOTAL ESTIMADA
              </p>
              <p className="text-4xl font-black text-[#00a843]">
                ${totalInversion.toLocaleString()} USD
              </p>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-4">
                * Los costos de infraestructura Cloud (AWS/GCP) se facturan por separado según
                consumo.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-12 border-t border-black/10 flex justify-between items-center text-xs text-zinc-500">
            <p>CONFIDENCIAL - GLASTOR® 2026</p>
            <p>www.glastor.es | ventas@glastor.es</p>
          </div>
        </div>
      </div>
    );
  },
);

SOWTemplate.displayName = 'SOWTemplate';
