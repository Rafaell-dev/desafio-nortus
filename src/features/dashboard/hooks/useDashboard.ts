'use client';

import { useEffect, useState } from 'react';
import { dashboardService } from '../services/dashboardService';
import { DashboardResponse } from '../types/dashboard.types';

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await dashboardService.getDashboard();
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar dashboard'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, isLoading, error };
}
