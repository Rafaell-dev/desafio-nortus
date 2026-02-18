export interface PlanIndicator {
  name: string;
  conversion: number;
  roi: number;
  value: number;
}

export interface SimulatorResponse {
  includedBenefits: string[];
  plansIndicators: PlanIndicator[];
}

export interface SimulatorConfig {
  vehicleValue: number;
  clientAge: number;
  coverages: {
    theft: boolean;
    collision: boolean;
    fire: boolean;
    nature: boolean;
  };
}

export const COVERAGE_PRICES = {
  theft: 25.0,
  collision: 35.0,
  fire: 20.0,
  nature: 30.0,
};
