'use client';

import { TitlePage } from '@/src/features/common/components/titlePage';
import { KpiEvolutionChart } from '@/src/features/dashboard/components/kpiEvolutionChart';
import { ConversionRateChart } from '@/src/features/dashboard/components/conversionRateChart';
import { useDashboard } from '@/src/features/dashboard/hooks/useDashboard';
import { ClientMap } from '@/src/features/dashboard/components/ClientMap';

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  return (
    <div className="bg-dark flex min-h-screen max-w-screen flex-col">
      <TitlePage title="Dashboard" />
      <div className="mx-auto w-full max-w-7xl px-8 py-8">
        {isLoading && (
          <p className="text-center text-gray-400">Carregando...</p>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {data && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <KpiEvolutionChart
                  labels={data.kpisTrend.labels}
                  trends={{
                    arpuTrend: data.kpisTrend.arpuTrend,
                    conversionTrend: data.kpisTrend.conversionTrend,
                    churnTrend: data.kpisTrend.churnTrend,
                    retentionTrend: data.kpisTrend.retentionTrend,
                  }}
                />
              </div>
              <div className="lg:col-span-1">
                <ConversionRateChart
                  labels={data.kpisTrend.labels}
                  data={data.kpisTrend.conversionTrend.data}
                />
              </div>
            </div>

            <ClientMap />
          </div>
        )}
      </div>
    </div>
  );
}
