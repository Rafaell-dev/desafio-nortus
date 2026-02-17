import { useSimulatorStore } from '../hooks/useSimulatorStore';
import { COVERAGE_PRICES } from '../types/simulator.types';

export function PlanCards() {
  const { data, config } = useSimulatorStore();

  if (!data) return null;

  const calculateTotal = (baseValue: number) => {
    let total = baseValue;
    if (config.coverages.theft) total += COVERAGE_PRICES.theft;
    if (config.coverages.collision) total += COVERAGE_PRICES.collision;
    if (config.coverages.fire) total += COVERAGE_PRICES.fire;
    if (config.coverages.nature) total += COVERAGE_PRICES.nature;
    return total;
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {data.plansIndicators.map((plan) => (
        <div
          key={plan.name}
          className={`relative flex flex-col justify-between rounded-2xl p-6 ${
            plan.name === 'Intermediário'
              ? 'bg-dark-surface border-blue border-2'
              : 'bg-dark-surface-2 border border-white/10'
          }`}
        >
          {plan.name === 'Premium' && (
            <span className="bg-active text-dark absolute top-4 right-4 rounded-full px-3 py-1 text-xs">
              Recomendado
            </span>
          )}

          <div>
            <h3 className="font-medium text-white">{plan.name}</h3>
            <div className="mt-4">
              <span className="text-3xl font-bold text-white">
                R$ {calculateTotal(plan.value).toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <span className="text-sm text-gray-500">Por mês</span>
          </div>
        </div>
      ))}
    </div>
  );
}
