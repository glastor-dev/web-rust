'use client';

import { motion } from 'motion/react';
import { Card } from '../../reutilizables/card';
import { Button } from '../../reutilizables/button';
import { CalculatorIcon, ArrowRightIcon } from 'lucide-react';
import { useConfiguratorStore } from '../../../store/configuratorStore';
import {
  formatArsFromEur,
  formatRateTimestamp,
  useEurToArsRate,
} from '../../../hooks/useEurToArsRate';

interface EstimatorCartProps {
  onGenerate: () => void;
}

export function EstimatorCart({ onGenerate }: EstimatorCartProps) {
  const { selectedModuleIds, totalPrice, totalMinWeeks, totalMaxWeeks, resetConfig } =
    useConfiguratorStore();
  const { rate: eurArsRate, updatedAt } = useEurToArsRate();

  return (
    <div className="sticky top-32">
      <Card className="p-8 bg-zinc-950 border border-white/10 rounded-none shadow-2xl">
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <CalculatorIcon className="text-brand" size={24} />
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">
              Estimación Global
            </h2>
          </div>
          {selectedModuleIds.length > 0 && (
            <button
              onClick={resetConfig}
              className="text-[10px] font-mono uppercase tracking-widest text-brand hover:text-white transition-colors"
            >
              Reiniciar
            </button>
          )}
        </div>

        {selectedModuleIds.length === 0 ? (
          <div className="text-zinc-500 text-sm text-center py-12 font-mono border border-dashed border-white/10">
            [ SELECCIONA MÓDULOS PARA CALCULAR ]
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Inversión Base Estimada
              </span>
              <motion.div
                key={totalPrice}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand"
              >
                €{totalPrice.toLocaleString()} <span className="text-2xl text-zinc-400">EUR</span>
              </motion.div>
              {eurArsRate && (
                <div className="flex flex-col gap-0.5 pt-1">
                  <span className="text-lg sm:text-xl font-mono font-bold text-zinc-200">
                    ≈ {formatArsFromEur(totalPrice, eurArsRate)}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    Ref. Euro Oficial (venta): $
                    {eurArsRate.toLocaleString('es-AR', { maximumFractionDigits: 2 })} ARS
                    {updatedAt ? ` · ${formatRateTimestamp(updatedAt)}` : ''}
                  </span>
                </div>
              )}
              {(() => {
                const bundleSize = selectedModuleIds.length;
                if (bundleSize >= 4)
                  return (
                    <span className="text-[10px] font-mono text-brand uppercase tracking-widest">
                      Bundle -12% aplicado
                    </span>
                  );
                if (bundleSize === 3)
                  return (
                    <span className="text-[10px] font-mono text-brand uppercase tracking-widest">
                      Bundle -8% aplicado
                    </span>
                  );
                if (bundleSize === 2)
                  return (
                    <span className="text-[10px] font-mono text-brand uppercase tracking-widest">
                      Bundle -4% aplicado
                    </span>
                  );
                return null;
              })()}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Roadmap de Ejecución
              </span>
              <motion.div
                key={totalMaxWeeks}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white"
              >
                {totalMinWeeks} a {totalMaxWeeks} Semanas
              </motion.div>
            </div>

            <div className="pt-8 mt-4 border-t border-white/10">
              <Button
                onClick={onGenerate}
                size="lg"
                className="w-full h-16 uppercase tracking-wider text-xs sm:text-sm flex items-center justify-between group shadow-[0_0_20px_rgba(0,255,102,0.15)] hover:shadow-[0_0_30px_rgba(0,255,102,0.3)] overflow-hidden"
              >
                <span className="truncate pr-2">Obtener Estimación</span>
                <ArrowRightIcon
                  size={18}
                  className="group-hover:translate-x-2 transition-transform shrink-0"
                />
              </Button>
              <p className="text-zinc-500 text-[10px] font-mono text-center mt-4 uppercase tracking-widest leading-relaxed">
                * Estimación orientativa. Sujeta a validación en Discovery.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
