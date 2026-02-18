import { SimulatorResponse } from '../types/simulator.types';
import { authService } from '../../auth/services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class SimulatorApi {
  async getPlans(token: string): Promise<SimulatorResponse> {
    if (!token) {
      throw new Error('Token não encontrado.');
    }

    const response = await fetch(`${API_BASE_URL}/nortus-v1/simulador-planos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        authService.logout();
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      throw new Error('Erro ao buscar dados do simulador.');
    }

    return response.json();
  }
}

export const simulatorApi = new SimulatorApi();
