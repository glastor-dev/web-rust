import { describe, it, expect, beforeEach } from 'vitest';
import { useConfiguratorStore, type ArchitectureModule } from './configuratorStore';

const mockModules: ArchitectureModule[] = [
  {
    id: 'm-test',
    title: 'Test Module',
    category: 'Test',
    base_price: 1000,
    min_weeks: 1,
    max_weeks: 2,
    description: 'Test',
  },
];

describe('configuratorStore', () => {
  beforeEach(() => {
    useConfiguratorStore.setState({
      availableModules: mockModules,
      selectedModuleIds: [],
      totalPrice: 0,
      totalMinWeeks: 0,
      totalMaxWeeks: 0,
      isLoading: false,
      error: null,
    });
  });

  it('should initialize with default state', () => {
    const state = useConfiguratorStore.getState();
    expect(state.selectedModuleIds).toEqual([]);
    expect(state.totalPrice).toBe(0);
    expect(state.totalMinWeeks).toBe(0);
    expect(state.totalMaxWeeks).toBe(0);
  });

  it('should toggle a module and recalculate totals', () => {
    const store = useConfiguratorStore.getState();
    const moduleToSelect = mockModules[0];

    store.toggleModule(moduleToSelect.id);

    const newState = useConfiguratorStore.getState();
    expect(newState.selectedModuleIds).toContain(moduleToSelect.id);
    expect(newState.totalPrice).toBe(moduleToSelect.base_price);
    expect(newState.totalMinWeeks).toBe(moduleToSelect.min_weeks);
    expect(newState.totalMaxWeeks).toBe(moduleToSelect.max_weeks);
  });

  it('should remove a module if toggled twice', () => {
    const store = useConfiguratorStore.getState();
    const moduleToSelect = mockModules[0];

    // Toggle on
    store.toggleModule(moduleToSelect.id);
    // Toggle off
    useConfiguratorStore.getState().toggleModule(moduleToSelect.id);

    const newState = useConfiguratorStore.getState();
    expect(newState.selectedModuleIds).toHaveLength(0);
    expect(newState.totalPrice).toBe(0);
  });
});
