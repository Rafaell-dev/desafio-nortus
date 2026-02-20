'use client';

import { Search, ChevronDown } from 'lucide-react';
import { ActiveClients } from '../types/dashboard.types';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { ColumnFiltersState } from '@tanstack/react-table';
import { DataTable } from '@/src/features/common/components/DataTable';
import { getClientColumns } from './clientColumns';

interface ActiveClientsListProps {
  data: ActiveClients;
}

export function ActiveClientsList({ data }: ActiveClientsListProps) {
  const t = useTranslations('dashboard');

  // Table state
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Helper to get a column filter value
  const getFilterValue = (columnId: string): string => {
    const filter = columnFilters.find((f) => f.id === columnId);
    return (filter?.value as string) ?? 'all';
  };

  // Helper to set a column filter value
  const setFilterValue = (columnId: string, value: string) => {
    setColumnFilters((prev) => {
      const existing = prev.filter((f) => f.id !== columnId);
      if (value === 'all') return existing;
      return [...existing, { id: columnId, value }];
    });
  };

  // Column definitions with translations
  const columns = useMemo(
    () =>
      getClientColumns({
        name: t('name'),
        insuranceType: t('insuranceType'),
        monthlyValue: t('monthlyValue'),
        status: t('status'),
        renewal: t('renewal'),
        region: t('region'),
      }),
    [t],
  );

  return (
    <div className="rounded-2xl bg-[#1A253A] p-4 text-white shadow-sm sm:p-6">
      <h2 className="mb-4 text-base font-bold sm:mb-6 sm:text-lg">{t('activeClients')}</h2>

      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full rounded-full border border-gray-700/50 bg-[#0B1125] py-2.5 pr-4 pl-10 text-sm text-gray-200 placeholder-gray-500 focus:border-[#29BDC3] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 lg:flex-nowrap">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={getFilterValue('status')}
              onChange={(e) => setFilterValue('status', e.target.value)}
              className="appearance-none rounded-full border border-gray-700/50 bg-[#0B1125] py-2 pr-8 pl-4 text-xs text-gray-300 focus:border-[#29BDC3] focus:outline-none"
            >
              <option value="all">{t('allStatuses')}</option>
              {data.filters.status
                .filter((s) => s !== 'Todos')
                .map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={getFilterValue('secureType')}
              onChange={(e) => setFilterValue('secureType', e.target.value)}
              className="appearance-none rounded-full border border-gray-700/50 bg-[#0B1125] py-2 pr-8 pl-4 text-xs text-gray-300 focus:border-[#29BDC3] focus:outline-none"
            >
              <option value="all">{t('allTypes')}</option>
              {data.filters.secureType
                .filter((tp) => tp !== 'Todos')
                .map((tp) => (
                  <option key={tp} value={tp}>
                    {tp}
                  </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select
              value={getFilterValue('location')}
              onChange={(e) => setFilterValue('location', e.target.value)}
              className="appearance-none rounded-full border border-gray-700/50 bg-[#0B1125] py-2 pr-8 pl-4 text-xs text-gray-300 focus:border-[#29BDC3] focus:outline-none"
            >
              <option value="all">{t('allLocations')}</option>
              {data.filters.locations
                .filter((l) => l !== 'Todos')
                .map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={data.data}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          columnFilters={columnFilters}
          onColumnFiltersChange={setColumnFilters}
          pageSize={5}
          noResultsMessage={t('noClientsFound')}
        />
      </div>
    </div>
  );
}
