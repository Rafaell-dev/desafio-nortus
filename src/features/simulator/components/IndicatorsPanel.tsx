import { useSimulatorStore } from '../hooks/useSimulatorStore';

export function IndicatorsPanel() {
  const { data } = useSimulatorStore();

  if (!data) return null;

  return (
    <div className="bg-dark-surface rounded-2xl p-6">
      <h3 className="mb-6 text-base font-bold text-white">Indicadores</h3>
      <div className="space-y-4">
        {data.plansIndicators.map((plan) => (
          <div
            key={plan.name}
            className="bg-dark-surface-2 flex items-center justify-between rounded-xl p-4 border border-white/10"
          >
            <div>
              <h4 className="font-bold text-white">{plan.name}</h4>
              <div className="mt-1 flex gap-3">
                <span className="text-white text-xs">
                  Conversão:{' '}
                  <span className="text-green-500">{plan.conversion}%</span>
                </span>
                <span className="text-white text-xs">
                  ROI: <span className="text-green-500">{plan.roi}%</span>
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-white">
                R$ {plan.value.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
