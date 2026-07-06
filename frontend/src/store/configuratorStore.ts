import { create } from 'zustand';

export interface ArchitectureModule {
  id: string;
  title: string;
  category: string;
  base_price: number;
  min_weeks: number;
  max_weeks: number;
  description: string;
}

interface ConfiguratorState {
  availableModules: ArchitectureModule[];
  selectedModuleIds: string[];
  totalPrice: number;
  totalMinWeeks: number;
  totalMaxWeeks: number;
  isLoading: boolean;
  error: string | null;
  fetchModules: () => Promise<void>;
  toggleModule: (id: string) => void;
  resetConfig: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  availableModules: [],
  selectedModuleIds: [],
  totalPrice: 0,
  totalMinWeeks: 0,
  totalMaxWeeks: 0,
  isLoading: false,
  error: null,
  
  fetchModules: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('http://localhost:3001/api/modules');
      if (!res.ok) throw new Error('Failed to fetch modules');
      const data: ArchitectureModule[] = await res.json();
      set({ availableModules: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
  
  toggleModule: (id: string) => {
    const state = get();
    const isSelected = state.selectedModuleIds.includes(id);
    const newSelectedIds = isSelected
      ? state.selectedModuleIds.filter((mId) => mId !== id)
      : [...state.selectedModuleIds, id];
    
    // Recalcular métricas
    const selectedModules = state.availableModules.filter(m => newSelectedIds.includes(m.id));
    const totalPrice = selectedModules.reduce((acc, m) => acc + m.base_price, 0);
    const totalMinWeeks = selectedModules.reduce((acc, m) => acc + m.min_weeks, 0);
    const totalMaxWeeks = selectedModules.reduce((acc, m) => acc + m.max_weeks, 0);

    set({
      selectedModuleIds: newSelectedIds,
      totalPrice,
      totalMinWeeks,
      totalMaxWeeks
    });
  },

  resetConfig: () => set({
    selectedModuleIds: [],
    totalPrice: 0,
    totalMinWeeks: 0,
    totalMaxWeeks: 0,
  })
}));
