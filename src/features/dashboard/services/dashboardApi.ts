import { DashboardResponse } from '../types/dashboard.types';

export class DashboardApi {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? '') {
    this.baseUrl = baseUrl;
  }

  async getDashboard(token: string): Promise<DashboardResponse> {
    const response = await fetch(`${this.baseUrl}/nortus-v1/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard');
    }

    return response.json();
  }
}
