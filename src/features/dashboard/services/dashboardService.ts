import { authService } from '@/src/features/auth/services/authService';
import { DashboardResponse } from '../types/dashboard.types';
import { DashboardApi } from './dashboardApi';

export class DashboardService {
  constructor(private api: DashboardApi) {}

  async getDashboard(): Promise<DashboardResponse> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    return this.api.getDashboard(token);
  }
}

export const dashboardService = new DashboardService(new DashboardApi());
