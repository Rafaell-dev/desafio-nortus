import { useSimulatorStore } from '../hooks/useSimulatorStore';
import { useTranslations } from 'next-intl';

export function IndicatorsPanel() {
  const t = useTranslations('calculator');
  const { data, selectedPlan } = useSimulatorStore();

  if (!data) return null;

  return (
    <div className="bg-dark-surface rounded-2xl border border-gray-800 p-4 sm:rounded-3xl sm:p-6">
      <h3 className="mb-4 text-base font-bold text-white sm:mb-6 sm:text-lg">{t('indicators')}</h3>
      <div className="space-y-3 sm:space-y-4">
        {data.plansIndicators.map((plan) => {
          const isSelected = selectedPlan === plan.name;
          return (
            <div
              key={plan.name}
              className={`flex items-center justify-between rounded-xl border p-3 transition-all sm:p-4 ${
                isSelected
                  ? 'bg-blue/10 border-blue'
                  : 'bg-dark-surface-2 border-white/5 opacity-60'
              }`}
            >
              <div>
                <h4
                  className={`font-bold ${isSelected ? 'text-blue' : 'text-white'}`}
                >
                  {plan.name}
                </h4>
                <div className="mt-1 flex gap-3">
                  <span
                    className={`${isSelected ? 'text-white' : 'text-gray-400'} text-xs`}
                  >
                    {t('conversion')}:{' '}
                    <span className="text-green-500">{plan.conversion}%</span>
                  </span>
                  <span
                    className={`${isSelected ? 'text-white' : 'text-gray-400'} text-xs`}
                  >
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
          );
        })}
      </div>
    </div>
  );
}
