'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Ticket } from '../types/ticket.types';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const priorityColorMap: Record<string, string> = {
  Urgente: 'bg-urgent text-white',
  Alta: 'bg-high text-dark',
  Média: 'bg-medium text-dark',
  Baixa: 'bg-low text-dark',
};

const statusColorMap: Record<string, string> = {
  Aberto: 'bg-active text-dark',
  'Em andamento': 'bg-pending text-dark',
  Resolvido: 'bg-solved text-dark',
  Fechado: 'bg-gray-500 text-white',
};

interface ColumnActions {
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

interface ColumnTranslations {
  colId: string;
  colPriority: string;
  colClient: string;
  colSubject: string;
  colStatus: string;
  colCreatedAt: string;
  colResponsible: string;
  colActions: string;
  edit: string;
  view: string;
}

export function getTicketColumns(
  t: ColumnTranslations,
  actions: ColumnActions,
): ColumnDef<Ticket>[] {
  return [
    {
      accessorKey: 'ticketId',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.colId}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-white">{row.getValue('ticketId')}</span>
      ),
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.colPriority}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => {
        const priority = row.getValue('priority') as string;
        return (
          <span
            className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold ${priorityColorMap[priority] ?? 'bg-gray-500 text-white'}`}
          >
            {priority}
          </span>
        );
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'all') return true;
        return row.getValue(columnId) === filterValue;
      },
    },
    {
      accessorKey: 'client',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.colClient}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      accessorFn: (row) => row.client.name,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-white">
            {row.original.client.name}
          </span>
          <span className="text-xs text-gray-500">
            {row.original.client.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'subject',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.colSubject}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-white">
          {row.getValue('subject')}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.colStatus}
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
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.colCreatedAt}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-white">{row.getValue('createdAt')}</span>
      ),
    },
    {
      accessorKey: 'assignee',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t.colResponsible}
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-white">{row.getValue('assignee')}</span>
      ),
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === 'all') return true;
        return row.getValue(columnId) === filterValue;
      },
    },
    {
      id: 'actions',
      header: () => (
        <span className="text-xs font-medium text-gray-400">
          {t.colActions}
        </span>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-3 text-xs text-gray-400">
          <Button
            className="flex items-center gap-2"
            variant="ghost"
            onClick={() => actions.onEdit(row.original.id)}
          >
            <p>{t.edit}</p>
            <Image src="/icons/edit_icon.svg" alt="" width={16} height={16} />
          </Button>
          <Button
            className="flex items-center gap-1"
            variant="ghost"
            onClick={() => actions.onView(row.original.id)}
          >
            <p>{t.view}</p>
            <Image src="/icons/arrow_icon.svg" alt="" width={16} height={16} />
          </Button>
        </div>
      ),
      enableSorting: false,
      meta: { sticky: true },
    },
  ];
}
