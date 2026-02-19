import { useSimulatorStore } from '../hooks/useSimulatorStore';
import { simulatorService } from '../services/simulatorService';
import { useTranslations } from 'next-intl';

export function PlanCards() {
  const t = useTranslations('calculator');
  const { data, config, selectedPlan, setSelectedPlan } = useSimulatorStore();

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {data.plansIndicators.map((plan) => {
        const isSelected = selectedPlan === plan.name;
        const totalValue = simulatorService.calculatePlanPrice(
          plan.value,
          config
        );

        return (
          <div
            key={plan.name}
            onClick={() => setSelectedPlan(plan.name)}
            className={`relative flex cursor-pointer flex-col justify-between rounded-2xl p-6 transition-all ${
              isSelected
                ? 'bg-dark-surface border-blue border-2 shadow-lg shadow-blue-900/10'
                : 'bg-dark-surface-2 border border-white/5 hover:border-white/20'
            }`}
          >
            {plan.name === 'Premium' && (
              <span className="bg-active text-dark absolute top-4 right-4 rounded-full px-3 py-1 text-xs">
                {t('recommended')}
              </span>
            )}

            <div>
              <h3 className="font-medium text-white">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white">
                  R$ {totalValue.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <span className="text-sm text-gray-500">{t('perMonth')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
