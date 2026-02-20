import { create } from 'zustand';
import { SimulatorResponse, SimulatorConfig } from '../types/simulator.types';
import { simulatorService } from '../services/simulatorService';

interface SimulatorStore {
  data: SimulatorResponse | null;
  isLoading: boolean;
  config: SimulatorConfig;
  selectedPlan: string;

  setConfig: (config: Partial<SimulatorConfig>) => void;
  setSelectedPlan: (planName: string) => void;
  toggleCoverage: (key: keyof SimulatorConfig['coverages']) => void;
  fetchData: () => Promise<void>;
}

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  data: null,
  isLoading: false,
  selectedPlan: 'Intermediário',
  config: {
    vehicleValue: 50000,
    clientAge: 28,
    coverages: {
      theft: false,
      collision: false,
      fire: false,
      nature: false,
    },
  },

  setConfig: (newConfig) =>
    set((state) => ({ config: { ...state.config, ...newConfig } })),

  setSelectedPlan: (planName) => set({ selectedPlan: planName }),

  toggleCoverage: (key) =>
    set((state) => ({
      config: {
        ...state.config,
        coverages: {
          ...state.config.coverages,
          [key]: !state.config.coverages[key],
        },
      },
    })),

  fetchData: async () => {
    set({ isLoading: true });
    try {
      const data = await simulatorService.getPlans();
      set({ data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch simulator plans:', error);
      set({ isLoading: false });
    }
  },
}));
