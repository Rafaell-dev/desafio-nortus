import { DashboardResponse } from '../types/dashboard.types';

export class DashboardService {
  async getDashboard(): Promise<DashboardResponse> {
    const response = await fetch('/api/dashboard');

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      throw new Error('Erro ao buscar dados do dashboard.');
    }

    return response.json();
  }
}

export const dashboardService = new DashboardService();
