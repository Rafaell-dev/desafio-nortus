import { useSimulatorStore } from '../hooks/useSimulatorStore';
import { useTranslations } from 'next-intl';

export function BenefitsList() {
  const t = useTranslations('calculator');
  const { data } = useSimulatorStore();

  if (!data) return null;

  return (
    <div className="bg-dark-surface rounded-2xl p-6">
      <h3 className="mb-4 text-base font-bold text-white">{t('benefits')}</h3>
      <div className="flex flex-wrap gap-2">
        {data.includedBenefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-dark-surface-2 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2"
          >
            <div className="bg-blue shadow-blue-glow size-2 rounded-full" />
            <span className="text-xs font-medium text-white">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
