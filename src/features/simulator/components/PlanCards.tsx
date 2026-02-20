import { useSimulatorStore } from '../hooks/useSimulatorStore';
import { simulatorService } from '../services/simulatorService';
import { useTranslations } from 'next-intl';

export function PlanCards() {
  const t = useTranslations('calculator');
  const { data, config, selectedPlan, setSelectedPlan } = useSimulatorStore();

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
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
            className={`relative flex cursor-pointer flex-col justify-between rounded-2xl p-4 transition-all sm:p-6 ${
              isSelected
                ? 'bg-dark-surface border-blue border-2 shadow-lg shadow-blue-900/10'
                : 'bg-dark-surface-2 border border-white/5 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-white sm:text-base">{plan.name}</h3>
                {plan.name === 'Premium' && (
                  <span className="bg-active text-dark shrink-0 rounded-full px-2.5 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs">
                    {t('recommended')}
                  </span>
                )}
              </div>
              <div className="mt-3 sm:mt-4">
                <span className="text-2xl font-bold text-white sm:text-3xl">
                  R$ {totalValue.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div className="mt-4 sm:mt-8">
              <span className="text-xs text-gray-500 sm:text-sm">{t('perMonth')}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
