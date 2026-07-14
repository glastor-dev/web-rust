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

const FALLBACK_MODULES: ArchitectureModule[] = [
  {
    id: 'm-auditoria',
    title: 'Auditoría & Discovery (Rust/Bun)',
    category: 'Diagnóstico',
    base_price: 2500,
    min_weeks: 1,
    max_weeks: 2,
    description: 'Análisis de cuellos de botella y diseño de arquitectura.',
  },
  {
    id: 'm-core-backend',
    title: 'Core Backend en Rust',
    category: 'Ingeniería Core',
    base_price: 12500,
    min_weeks: 4,
    max_weeks: 6,
    description: 'Reescritura del motor crítico. Concurrencia masiva sin Garbage Collector.',
  },
  {
    id: 'm-mvp-fast',
    title: 'MVP de Alta Velocidad',
    category: 'Startups',
    base_price: 7500,
    min_weeks: 3,
    max_weeks: 6,
    description: 'Desarrollo de producto base ultra-optimizado con Next.js/Rust.',
  },
  {
    id: 'm-webgl-ui',
    title: 'Frontend Reactivo (WebGL)',
    category: 'Experiencia Visual',
    base_price: 9000,
    min_weeks: 2,
    max_weeks: 4,
    description: 'Interfaces 3D, Shaders y animaciones inerciales (FCP < 1s).',
  },
  {
    id: 'm-cloud-refactor',
    title: 'Refactorización Cloud / Contenedores',
    category: 'Enterprise',
    base_price: 10000,
    min_weeks: 3,
    max_weeks: 5,
    description: 'Reducción de costos AWS trasladando microservicios pesados.',
  },
  {
    id: 'm-staff-elite',
    title: 'Staff Augmentation Élite',
    category: 'Equipos',
    base_price: 6000,
    min_weeks: 4,
    max_weeks: 4,
    description: 'Inyección de ingenieros Rust Senior por mes.',
  },
];

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
      const res = await fetch('/api/modules');
      if (!res.ok) throw new Error('Failed to fetch modules');
      const data: ArchitectureModule[] = await res.json();
      set({ availableModules: data, isLoading: false });
    } catch (err: any) {
      console.warn('Backend fetch failed, using fallback modules. Error:', err.message);
      set({ availableModules: FALLBACK_MODULES, error: err.message, isLoading: false });
    }
  },

  toggleModule: (id: string) => {
    const state = get();
    const isSelected = state.selectedModuleIds.includes(id);
    const newSelectedIds = isSelected
      ? state.selectedModuleIds.filter((mId) => mId !== id)
      : [...state.selectedModuleIds, id];

    // Recalcular métricas
    const selectedModules = state.availableModules.filter((m) => newSelectedIds.includes(m.id));
    const totalPrice = selectedModules.reduce((acc, m) => acc + m.base_price, 0);
    const totalMinWeeks = selectedModules.reduce((acc, m) => acc + m.min_weeks, 0);
    const totalMaxWeeks = selectedModules.reduce((acc, m) => acc + m.max_weeks, 0);

    set({
      selectedModuleIds: newSelectedIds,
      totalPrice,
      totalMinWeeks,
      totalMaxWeeks,
    });
  },

  resetConfig: () =>
    set({
      selectedModuleIds: [],
      totalPrice: 0,
      totalMinWeeks: 0,
      totalMaxWeeks: 0,
    }),
}));
