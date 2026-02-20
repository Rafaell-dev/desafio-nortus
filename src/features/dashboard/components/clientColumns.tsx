'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Client } from '../types/dashboard.types';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const statusColorMap: Record<string, string> = {
  Ativo: 'bg-[#29BDC3] text-[#0B1125]',
  ativo: 'bg-[#29BDC3] text-[#0B1125]',
  Pendente: 'bg-[#F2CD5C] text-[#0B1125]',
  pendente: 'bg-[#F2CD5C] text-[#0B1125]',
  Inativo: 'bg-[#E0525E] text-white',
  inativo: 'bg-[#E0525E] text-white',
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

interface ClientColumnTranslations {
  name: string;
  insuranceType: string;
  monthlyValue: string;
  status: string;
  renewal: string;
  region: string;
}

export function getClientColumns(
  t: ClientColumnTranslations,
): ColumnDef<Client>[] {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 text-gray-400 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.name}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">
            {row.original.name}
          </span>
          <span className="text-xs text-gray-500">
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'secureType',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 text-gray-400 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.insuranceType}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-white">{row.getValue('secureType')}</span>
      ),
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'all') return true;
        return row.getValue(columnId) === filterValue;
      },
    },
    {
      accessorKey: 'monthValue',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 text-gray-400 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.monthlyValue}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-white">
          {formatCurrency(row.getValue('monthValue'))}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 text-gray-400 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.status}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <span
            className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold ${statusColorMap[status] ?? 'bg-gray-500 text-white'}`}
          >
            {status}
          </span>
        );
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'all') return true;
        return row.getValue(columnId) === filterValue;
      },
    },
    {
      accessorKey: 'renewalDate',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 text-gray-400 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.renewal}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-white">{row.getValue('renewalDate')}</span>
      ),
    },
    {
      accessorKey: 'location',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0 text-gray-400 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.region}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-white">{row.getValue('location')}</span>
      ),
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'all') return true;
        return row.getValue(columnId) === filterValue;
      },
    },
  ];
}
