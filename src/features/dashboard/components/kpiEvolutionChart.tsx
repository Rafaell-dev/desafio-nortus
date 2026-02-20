'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { KpisTrend } from '../types/dashboard.types';
import { useTranslations } from 'next-intl';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const tabs = ['retention', 'conversion', 'churn', 'arpu'] as const;
type TabType = (typeof tabs)[number];

const tabToTrendKey: Record<TabType, keyof Omit<KpisTrend, 'labels'>> = {
  retention: 'retentionTrend',
  conversion: 'conversionTrend',
  churn: 'churnTrend',
  arpu: 'arpuTrend',
};

interface KpiEvolutionChartProps {
  labels: string[];
  trends: Omit<KpisTrend, 'labels'>;
}

export function KpiEvolutionChart({ labels, trends }: KpiEvolutionChartProps) {
  const [activeTab, setActiveTab] = useState<TabType>('arpu');
  const t = useTranslations();

  const activeTrend = trends[tabToTrendKey[activeTab]];

  const formatValue = (val: number): string => {
    switch (activeTab) {
      case 'arpu':
        return `R$ ${(val / 1000).toFixed(1).replace('.', ',')}k`;
      case 'churn':
        return `${val.toFixed(1).replace('.', ',')}%`;
      default:
        return `${val}%`;
    }
  };

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'inherit',
    },
    colors: ['#36D9C5'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0.05,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: '#36D9C5',
            opacity: 0.6,
          },
          {
            offset: 100,
            color: '#36D9C5',
            opacity: 0.05,
          },
        ],
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: 'rgba(255,255,255,0.06)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: labels,
      labels: { style: { colors: '#6B7A99', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#6B7A99', fontSize: '12px' },
        formatter: (val: number) => formatValue(val),
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => formatValue(val),
      },
    },
    markers: {
      size: 0,
      hover: { size: 6 },
    },
  };

  const series = [
    {
      name: activeTrend.name,
      data: activeTrend.data,
    },
  ];

  return (
    <div className="bg-dark-surface flex h-full flex-col rounded-2xl p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          {t('dashboard.kpiEvolution')}
        </h3>
        <div className="flex flex-wrap items-center gap-1 rounded-full border border-gray-700/50 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-[10px] font-medium transition-colors sm:px-4 sm:text-xs ${
                activeTab === tab
                  ? 'bg-blue text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t(`dashboard.${tab}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <Chart options={options} series={series} type="area" height="100%" />
      </div>
    </div>
  );
}
