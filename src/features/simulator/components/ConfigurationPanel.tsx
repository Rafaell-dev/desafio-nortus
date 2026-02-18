import { useSimulatorStore } from '../hooks/useSimulatorStore';
import { COVERAGE_PRICES } from '../types/simulator.types';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

export function ConfigurationPanel() {
  const { config, setConfig, toggleCoverage } = useSimulatorStore();

  const handleVehicleValueChange = (value: number[]) => {
    setConfig({ vehicleValue: value[0] });
  };

  const handleAgeChange = (value: number[]) => {
    setConfig({ clientAge: value[0] });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-medium text-white">
            Valor do veículo: R$ {config.vehicleValue.toLocaleString('pt-BR')}
          </label>
        </div>
        <Slider
          defaultValue={[config.vehicleValue]}
          max={500000}
          min={10000}
          step={1000}
          onValueChange={handleVehicleValueChange}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-white">
          <span>R$ 10.000</span>
          <span>R$ 500.000</span>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <label className="text-sm font-medium text-white">
            Idade do Cliente: {config.clientAge} anos
          </label>
        </div>
        <Slider
          defaultValue={[config.clientAge]}
          max={90}
          min={18}
          step={1}
          onValueChange={handleAgeChange}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-white">
          <span>18 anos</span>
          <span>90 anos</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-white">
          Coberturas Adicionais
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
                Cobertura contra roubo e furto
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
                Danos por colisão
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
                Cobertura contra incêndio
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
                Fenômenos naturais (granizo, enchente)
              </label>
            </div>
            <span className="text-sm font-bold text-white">
              + R$ {COVERAGE_PRICES.nature.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
