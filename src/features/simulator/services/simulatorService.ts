import { SimulatorApi } from './simulatorApi';
import { COVERAGE_PRICES, SimulatorConfig } from '../types/simulator.types';
import { authService } from '../../auth/services/authService';

export class SimulatorService {
  constructor(private api: SimulatorApi) {}

  async getPlans() {
    const token = authService.getToken();

    if (!token) {
      throw new Error('Token não encontrado.');
    }

    return this.api.getPlans(token);
  }

  calculatePlanPrice(baseValue: number, config: SimulatorConfig): number {
    const vehicleSurcharge = this.calculateVehicleSurcharge(
      config.vehicleValue
    );
    const ageSurcharge = this.calculateAgeSurcharge(config.clientAge);
    const coveragesSurcharge = this.calculateCoveragesSurcharge(
      config.coverages
    );

    return baseValue + vehicleSurcharge + ageSurcharge + coveragesSurcharge;
  }

  private calculateVehicleSurcharge(vehicleValue: number): number {
    const BASE_VEHICLE_VALUE = 50000;
    const VEHICLE_RATE = 0.0005;

    const valueAboveBase = Math.max(0, vehicleValue - BASE_VEHICLE_VALUE);
    return valueAboveBase * VEHICLE_RATE;
  }

  private calculateAgeSurcharge(clientAge: number): number {
    const BASE_AGE = 28;
    const AGE_RATE = 15;

    const yearsYoungerThanBase = Math.max(0, BASE_AGE - clientAge);
    return yearsYoungerThanBase * AGE_RATE;
  }

  private calculateCoveragesSurcharge(
    coverages: SimulatorConfig['coverages']
  ): number {
    let total = 0;

    if (coverages.theft) total += COVERAGE_PRICES.theft;
    if (coverages.collision) total += COVERAGE_PRICES.collision;
    if (coverages.fire) total += COVERAGE_PRICES.fire;
    if (coverages.nature) total += COVERAGE_PRICES.nature;

    return total;
  }
}

export const simulatorService = new SimulatorService(new SimulatorApi());
