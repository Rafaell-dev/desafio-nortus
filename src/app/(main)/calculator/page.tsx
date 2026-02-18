'use client';

import { useEffect } from 'react';
import { TitlePage } from '@/src/features/common/components/TitlePage';
import { useSimulatorStore } from '@/src/features/simulator/hooks/useSimulatorStore';
import { ConfigurationPanel } from '@/src/features/simulator/components/ConfigurationPanel';
import { PlanCards } from '@/src/features/simulator/components/PlanCards';
import { BenefitsList } from '@/src/features/simulator/components/BenefitsList';
import { IndicatorsPanel } from '@/src/features/simulator/components/IndicatorsPanel';

export default function CalculatorPage() {
  const { fetchData, isLoading } = useSimulatorStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="bg-dark min-h-screen">
      <TitlePage title="Simulador de Planos" />

      <div className="mx-auto max-w-7xl p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="bg-dark-surface rounded-3xl border border-gray-800 p-8">
              <h2 className="mb-6 text-xl font-bold text-white">
                Planos personalizados
              </h2>

              <PlanCards />

              <div className="mt-8">
                <ConfigurationPanel />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <BenefitsList />
            <IndicatorsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
