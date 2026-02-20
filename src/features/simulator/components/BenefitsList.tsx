import { useSimulatorStore } from '../hooks/useSimulatorStore';
import { useTranslations } from 'next-intl';

export function BenefitsList() {
  const t = useTranslations('calculator');
  const { data } = useSimulatorStore();

  if (!data) return null;

  return (
    <div className="bg-dark-surface rounded-2xl p-4 sm:p-6">
      <h3 className="mb-3 text-sm font-bold text-white sm:mb-4 sm:text-base">{t('benefits')}</h3>
      <div className="flex flex-wrap gap-2">
        {data.includedBenefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-dark-surface-2 flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2"
          >
            <div className="bg-blue shadow-blue-glow size-2 rounded-full" />
            <span className="text-xs font-medium text-white">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
