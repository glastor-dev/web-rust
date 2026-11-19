'use client';

import { create } from 'zustand';

export interface ArchitectureModule {
  id: string;
  title: string;
  category: string;
  base_price: number;
  min_weeks: number;
  max_weeks: number;
  description: string;
  tags?: string[];
}

interface ConfiguratorState {
  availableModules: ArchitectureModule[];
  selectedModuleIds: string[];
  totalPrice: number;
  totalMinWeeks: number;
  totalMaxWeeks: number;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  categoryFilter: string;
  fetchModules: () => Promise<void>;
  toggleModule: (id: string) => void;
  resetConfig: () => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
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
    tags: ['rust', 'bun'],
  },
  {
    id: 'm-core-backend',
    title: 'Core Backend en Rust',
    category: 'Ingeniería Core',
    base_price: 12500,
    min_weeks: 4,
    max_weeks: 6,
    description: 'Reescritura del motor crítico. Concurrencia masiva sin Garbage Collector.',
    tags: ['rust', 'backend'],
  },
  {
    id: 'm-mvp-fast',
    title: 'MVP de Alta Velocidad',
    category: 'Startups',
    base_price: 7500,
    min_weeks: 3,
    max_weeks: 6,
    description: 'Desarrollo de producto base ultra-optimizado con Next.js/Rust.',
    tags: ['next.js', 'rust'],
  },
  {
    id: 'm-webgl-ui',
    title: 'Frontend Reactivo (WebGL)',
    category: 'Experiencia Visual',
    base_price: 9000,
    min_weeks: 2,
    max_weeks: 4,
    description: 'Interfaces 3D, Shaders y animaciones inerciales (FCP < 1s).',
    tags: ['react', 'webgl'],
  },
  {
    id: 'm-cloud-refactor',
    title: 'Refactorización Cloud / Contenedores',
    category: 'Enterprise',
    base_price: 10000,
    min_weeks: 3,
    max_weeks: 5,
    description: 'Reducción de costos AWS trasladando microservicios pesados.',
    tags: ['aws', 'docker'],
  },
  {
    id: 'm-staff-elite',
    title: 'Staff Augmentation Élite',
    category: 'Equipos',
    base_price: 6000,
    min_weeks: 4,
    max_weeks: 4,
    description: 'Inyección de ingenieros Rust Senior por mes.',
    tags: ['staffing', 'rust'],
  },
];

const STORAGE_KEY = 'glastor-configurator-state';

const loadPersistedState = (): Partial<ConfiguratorState> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return {
      selectedModuleIds: Array.isArray(parsed.selectedModuleIds) ? parsed.selectedModuleIds : [],
    };
  } catch {
    return {};
  }
};

function calculateTotals(availableModules: ArchitectureModule[], selectedModuleIds: string[]) {
  const selectedModules = availableModules.filter((m) => selectedModuleIds.includes(m.id));
  const totalMinWeeks = selectedModules.reduce((acc, m) => acc + m.min_weeks, 0);
  const totalMaxWeeks = selectedModules.reduce((acc, m) => acc + m.max_weeks, 0);
  const baseTotalPrice = selectedModules.reduce((acc, m) => acc + m.base_price, 0);

  const bundleSize = selectedModules.length;
  let bundleDiscount = 0;
  if (bundleSize >= 4) {
    bundleDiscount = 0.12;
  } else if (bundleSize === 3) {
    bundleDiscount = 0.08;
  } else if (bundleSize === 2) {
    bundleDiscount = 0.04;
  }

  const totalPrice = Math.round(baseTotalPrice * (1 - bundleDiscount));
  return { totalPrice, totalMinWeeks, totalMaxWeeks };
}

const persistedSelection = loadPersistedState();
const initialSelectedIds = persistedSelection.selectedModuleIds || [];
const initialTotals = calculateTotals(FALLBACK_MODULES, initialSelectedIds);

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  availableModules: FALLBACK_MODULES,
  selectedModuleIds: initialSelectedIds,
  totalPrice: initialTotals.totalPrice,
  totalMinWeeks: initialTotals.totalMinWeeks,
  totalMaxWeeks: initialTotals.totalMaxWeeks,
  isLoading: false,
  error: null,
  searchQuery: '',
  categoryFilter: 'all',

  fetchModules: async () => {
    const selectedIds = get().selectedModuleIds;
    const totals = calculateTotals(FALLBACK_MODULES, selectedIds);
    set({
      availableModules: FALLBACK_MODULES,
      ...totals,
      error: null,
      isLoading: false,
    });
  },

  toggleModule: (id: string) => {
    const state = get();
    const isSelected = state.selectedModuleIds.includes(id);
    const newSelectedIds = isSelected
      ? state.selectedModuleIds.filter((mId) => mId !== id)
      : [...state.selectedModuleIds, id];

    const totals = calculateTotals(state.availableModules, newSelectedIds);

    set({
      selectedModuleIds: newSelectedIds,
      ...totals,
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedModuleIds: newSelectedIds }));
    } catch {
      // storage unavailable
    }
  },

  resetConfig: () => {
    set({
      selectedModuleIds: [],
      totalPrice: 0,
      totalMinWeeks: 0,
      totalMaxWeeks: 0,
      searchQuery: '',
      categoryFilter: 'all',
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // noop
    }
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setCategoryFilter: (category: string) => set({ categoryFilter: category }),
}));
