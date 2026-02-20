'use client';

import { Search, ChevronDown } from 'lucide-react';
import { Ticket } from '../types/ticket.types';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { ColumnFiltersState } from '@tanstack/react-table';
import { EditTicketModal } from './EditTicketModal';
import { ViewTicketModal } from './ViewTicketModal';
import { DataTable } from '@/src/features/common/components/DataTable';
import { getTicketColumns } from './columns';

interface TicketListProps {
  tickets: Ticket[];
  onTicketUpdated?: () => void;
}

export function TicketList({ tickets, onTicketUpdated }: TicketListProps) {
  const t = useTranslations('tickets.list');

  // Modal state
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewingTicketId, setViewingTicketId] = useState<string | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Table state
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Derive unique assignees for the filter dropdown
  const uniqueAssignees = useMemo(() => {
    const allAssignees = tickets.map((ticket) => ticket.assignee);
    return Array.from(new Set(allAssignees)).sort();
  }, [tickets]);

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

  // Column definitions with actions and translations
  const columns = useMemo(
    () =>
      getTicketColumns(
        {
          colId: t('colId'),
          colPriority: t('colPriority'),
          colClient: t('colClient'),
          colSubject: t('colSubject'),
          colStatus: t('colStatus'),
          colCreatedAt: t('colCreatedAt'),
          colResponsible: t('colResponsible'),
          colActions: t('colActions'),
          edit: t('edit'),
          view: t('view'),
        },
        {
          onEdit: (id) => {
            setEditingTicketId(id);
            setEditModalOpen(true);
          },
          onView: (id) => {
            setViewingTicketId(id);
            setViewModalOpen(true);
          },
        },
      ),
    [t],
  );

  return (
    <div className="bg-dark-surface flex min-h-0 flex-col justify-between rounded-2xl p-4 text-white shadow-sm sm:p-6 lg:min-h-150">
      <div>
        <h2 className="mb-4 text-base font-bold sm:mb-6 sm:text-lg">{t('title')}</h2>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="bg-dark focus:border-active w-full rounded-full border border-gray-700/50 py-2.5 pr-4 pl-10 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 lg:flex-nowrap">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={getFilterValue('status')}
                onChange={(e) => setFilterValue('status', e.target.value)}
                className="bg-dark focus:border-active appearance-none rounded-full border border-gray-700/50 py-2 pr-8 pl-4 text-xs text-gray-300 focus:outline-none"
              >
                <option value="all">{t('allStatuses')}</option>
                <option value="Aberto">{t('statusOpen')}</option>
                <option value="Em andamento">{t('statusInProgress')}</option>
                <option value="Resolvido">{t('statusSolved')}</option>
                <option value="Fechado">{t('statusClosed')}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select
                value={getFilterValue('priority')}
                onChange={(e) => setFilterValue('priority', e.target.value)}
                className="bg-dark focus:border-active appearance-none rounded-full border border-gray-700/50 py-2 pr-8 pl-4 text-xs text-gray-300 focus:outline-none"
              >
                <option value="all">{t('allPriorities')}</option>
                <option value="Urgente">{t('priorityUrgent')}</option>
                <option value="Alta">{t('priorityHigh')}</option>
                <option value="Média">{t('priorityMedium')}</option>
                <option value="Baixa">{t('priorityLow')}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Assignee Filter */}
            <div className="relative">
              <select
                value={getFilterValue('assignee')}
                onChange={(e) => setFilterValue('assignee', e.target.value)}
                className="bg-dark focus:border-active appearance-none rounded-full border border-gray-700/50 py-2 pr-8 pl-4 text-xs text-gray-300 focus:outline-none"
              >
                <option value="all">{t('allAssignees')}</option>
                {uniqueAssignees.map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={tickets}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            pageSize={5}
            noResultsMessage={t('noTickets')}
            paginationLabels={{
              showing: t('showing'),
              of: t('of'),
              previous: t('previous'),
              next: t('next'),
            }}
          />
        </div>
      </div>

      <EditTicketModal
        id={editingTicketId}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSuccess={onTicketUpdated}
      />

      <ViewTicketModal
        id={viewingTicketId}
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
      />
    </div>
  );
}
