import { useState, useEffect } from 'react';
import { animate } from 'motion/react';

export const ROICalculator = () => {
  const [users, setUsers] = useState(1000);
  
  // Display states
  const [costSavings, setCostSavings] = useState(0);
  const [latencySaved, setLatencySaved] = useState(0);

  // Constants
  const baseRustEfficiency = 0.85; // Rust uses ~85% less resources
  const msSavedPerRequest = 145; // Average ms saved vs Node.js
  
  const targetSavings = Math.floor(users * 2.5 * baseRustEfficiency);
  const targetLatency = Math.floor(users * msSavedPerRequest * 30); // Monthly projection

  useEffect(() => {
    const controls1 = animate(costSavings, targetSavings, {
      duration: 0.8,
      onUpdate(value) {
        setCostSavings(Math.floor(value));
      }
    });
    
    const controls2 = animate(latencySaved, targetLatency, {
      duration: 0.8,
      onUpdate(value) {
        setLatencySaved(Math.floor(value));
      }
    });

    return () => {
      controls1.stop();
      controls2.stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, targetSavings, targetLatency]);

  return (
    <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-8 shadow-2xl relative overflow-hidden group">
      {/* Dynamic Background gradient based on slider value */}
      <div 
        className="absolute top-0 left-0 h-1 bg-brand transition-all duration-300" 
        style={{ width: `${(users / 1000000) * 100}%` }}
      />
      <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-8">Calculadora de ROI (Rust vs Node)</h3>
      
      <div className="mb-12 relative">
        <label className="block text-sm font-mono text-zinc-400 mb-4">
          Volumen Mensual de Peticiones: <span className="text-white font-bold">{users.toLocaleString()}</span>
        </label>
        <input 
          type="range" 
          min="10000" 
          max="1000000" 
          step="10000"
          value={users}
          onChange={(e) => setUsers(Number(e.target.value))}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
        <div>
          <span className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Ahorro Servidores (Anual)</span>
          <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-brand tracking-tighter truncate">
            +${costSavings.toLocaleString()}
          </div>
        </div>
        <div>
          <span className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Reducción Latencia (p99)</span>
          <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tighter truncate">
            -{latencySaved.toLocaleString()}ms
          </div>
        </div>
      </div>
    </div>
  );
}
