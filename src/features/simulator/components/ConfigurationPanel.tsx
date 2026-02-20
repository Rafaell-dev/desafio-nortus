import { useSimulatorStore } from '../hooks/useSimulatorStore';
import { COVERAGE_PRICES } from '../types/simulator.types';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ConfigurationPanel() {
  const t = useTranslations('calculator');
  const { config, setConfig, toggleCoverage } = useSimulatorStore();

  const handleVehicleValueChange = (value: number[]) => {
    setConfig({ vehicleValue: value[0] });
  };

  const handleAgeChange = (value: number[]) => {
    setConfig({ clientAge: value[0] });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-medium text-white sm:text-sm">
                {t('vehicleValue', {
                  value: config.vehicleValue.toLocaleString('pt-BR'),
                })}
              </label>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 shrink-0 cursor-help text-gray-400 transition-colors hover:text-white" />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-dark-surface max-w-60 border border-gray-700 text-xs text-gray-200"
                >
                  {t('vehicleTooltip')}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        <Slider
          defaultValue={[config.vehicleValue]}
          max={500000}
          min={10000}
          step={1000}
          onValueChange={handleVehicleValueChange}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-white sm:text-sm">
          <span>R$ 10.000</span>
          <span>R$ 500.000</span>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-medium text-white sm:text-sm">
              {t('clientAge', { age: config.clientAge })}
            </label>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 shrink-0 cursor-help text-gray-400 transition-colors hover:text-white" />
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-dark-surface max-w-60 border border-gray-700 text-xs text-gray-200"
              >
                {t('ageTooltip')}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <Slider
          defaultValue={[config.clientAge]}
          max={90}
          min={18}
          step={1}
          onValueChange={handleAgeChange}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-white sm:text-sm">
          <span>18 {t('years')}</span>
          <span>90 {t('years')}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-medium text-white sm:mb-4 sm:text-sm">
          {t('additionalCoverages')}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="theft"
                checked={config.coverages.theft}
                onCheckedChange={() => toggleCoverage('theft')}
              />
              <label
                htmlFor="theft"
                className="text-sm leading-none font-medium text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('theft')}
              </label>
            </div>
            <span className="text-sm font-bold text-white">
              + R$ {COVERAGE_PRICES.theft.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="collision"
                checked={config.coverages.collision}
                onCheckedChange={() => toggleCoverage('collision')}
              />
              <label
                htmlFor="collision"
                className="text-sm leading-none font-medium text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('collision')}
              </label>
            </div>
            <span className="text-sm font-bold text-white">
              + R$ {COVERAGE_PRICES.collision.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fire"
                checked={config.coverages.fire}
                onCheckedChange={() => toggleCoverage('fire')}
              />
              <label
                htmlFor="fire"
                className="text-sm leading-none font-medium text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('fire')}
              </label>
            </div>
            <span className="text-sm font-bold text-white">
              + R$ {COVERAGE_PRICES.fire.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="nature"
                checked={config.coverages.nature}
                onCheckedChange={() => toggleCoverage('nature')}
              />
              <label
                htmlFor="nature"
                className="text-sm leading-none font-medium text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('nature')}
              </label>
            </div>
            <span className="text-sm font-bold text-white">
              + R$ {COVERAGE_PRICES.nature.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
