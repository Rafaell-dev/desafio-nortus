'use client';

import dynamic from 'next/dynamic';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ConversionRateChartProps {
  labels: string[];
  data: number[];
}

export function ConversionRateChart({
  labels,
  data,
}: ConversionRateChartProps) {
  const chartLabels = labels.slice(-6);
  const chartData = data.slice(-6);
  const t = useTranslations();

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'inherit',
    },
    colors: ['#36D9C5'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '50%',
        distributed: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: ['#1876D2'],
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: 'rgba(255,255,255,0.06)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: chartLabels,
      labels: { style: { colors: '#6B7A99', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tickPlacement: 'on',
    },
    yaxis: {
      min: 0,
      max: 125,
      tickAmount: 5,
      labels: {
        style: { colors: '#6B7A99', fontSize: '12px' },
        formatter: (val: number) => String(val),
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) =>
          t('dashboard.conversionClients', { count: val }),
      },
    },
  };

  const series = [
    {
      name: t('dashboard.conversionSeriesName'),
      data: chartData,
    },
  ];

  return (
    <div className="bg-dark-surface flex h-full flex-col rounded-2xl p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          {t('dashboard.conversionRate')}
        </h3>
        <button className="text-gray-400 transition-colors hover:text-white">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="min-h-0 flex-1">
        <Chart options={options} series={series} type="bar" height="100%" />
      </div>
    </div>
  );
}
