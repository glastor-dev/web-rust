import { motion } from 'motion/react';
import { Card } from '../../reutilizables/card';
import { CheckIcon } from 'lucide-react';
import { useConfiguratorStore } from '../../../store/configuratorStore';

export function ModuleGrid() {
  const { availableModules, selectedModuleIds, toggleModule } = useConfiguratorStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {availableModules.map((module) => {
        const isSelected = selectedModuleIds.includes(module.id);
        return (
          <motion.div
            key={module.id}
            layout
            onClick={() => toggleModule(module.id)}
            className="cursor-pointer h-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`h-full p-6 transition-all duration-300 border-2 rounded-none relative overflow-hidden flex flex-col ${
              isSelected 
                ? 'border-brand bg-brand/5 shadow-[0_0_30px_rgba(0,255,102,0.15)]' 
                : 'border-white/10 bg-black hover:border-white/30'
            }`}>
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                isSelected ? 'border-brand bg-brand text-black' : 'border-white/20'
              }`}>
                {isSelected && <CheckIcon size={14} strokeWidth={4} />}
              </div>

              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
                {module.category}
              </div>
              
              <h3 className={`text-xl font-black uppercase tracking-tight mb-3 transition-colors ${
                isSelected ? 'text-white' : 'text-zinc-300'
              }`}>
                {module.title}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 grow">
                {module.description}
              </p>

                <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Base</span>
                  <span className={`font-mono font-bold ${isSelected ? 'text-brand' : 'text-zinc-300'}`}>
                    ${module.base_price.toLocaleString()} USD
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Tiempo</span>
                  <span className="text-zinc-300 text-sm font-bold">
                    {module.min_weeks}-{module.max_weeks} Semanas
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
