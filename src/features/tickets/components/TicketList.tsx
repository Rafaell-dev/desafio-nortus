import { Search, ChevronDown } from 'lucide-react';
import { Ticket } from '../types/ticket.types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTicketFilters } from '../hooks/useTicketFilters';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { EditTicketModal } from './EditTicketModal';

interface TicketListProps {
  tickets: Ticket[];
  onTicketUpdated?: () => void;
}

export function TicketList({ tickets, onTicketUpdated }: TicketListProps) {
  const t = useTranslations('tickets.list');
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    assigneeFilter,
    setAssigneeFilter,
    filteredTickets,
    paginatedTickets,
    uniqueAssignees,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    itemsPerPage,
  } = useTicketFilters(tickets);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgente':
        return 'bg-urgent text-white';
      case 'Alta':
        return 'bg-high text-dark';
      case 'Média':
        return 'bg-medium text-dark';
      case 'Baixa':
        return 'bg-low text-dark';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberto':
        return 'bg-active text-dark';
      case 'Em andamento':
        return 'bg-pending text-dark';
      case 'Resolvido':
        return 'bg-solved text-dark';
      case 'Fechado':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-dark-surface flex min-h-[600px] flex-col justify-between rounded-2xl p-6 text-white shadow-sm">
      <div>
        <h2 className="mb-6 text-lg font-bold">{t('title')}</h2>

        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-dark focus:border-active w-full rounded-full border border-gray-700/50 py-2.5 pr-4 pl-10 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 lg:flex-nowrap">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-dark focus:border-active appearance-none rounded-full border border-gray-700/50 py-2 pr-8 pl-4 text-xs text-gray-300 focus:outline-none"
              >
                <option value="Todos os status">{t('allStatuses')}</option>
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
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-dark focus:border-active appearance-none rounded-full border border-gray-700/50 py-2 pr-8 pl-4 text-xs text-gray-300 focus:outline-none"
              >
                <option value="Todas as prioridades">
                  {t('allPriorities')}
                </option>
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
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className="bg-dark focus:border-active appearance-none rounded-full border border-gray-700/50 py-2 pr-8 pl-4 text-xs text-gray-300 focus:outline-none"
              >
                <option value="Todos os responsáveis">
                  {t('allAssignees')}
                </option>
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
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-gray-400">
                <th className="pb-4 pl-4 font-medium">{t('colId')}</th>
                <th className="pb-4 font-medium">{t('colPriority')}</th>
                <th className="pb-4 font-medium">{t('colClient')}</th>
                <th className="pb-4 font-medium">{t('colSubject')}</th>
                <th className="pb-4 font-medium">{t('colStatus')}</th>
                <th className="pb-4 font-medium">{t('colCreatedAt')}</th>
                <th className="pb-4 font-medium">{t('colResponsible')}</th>
                <th className="pb-4 text-left font-medium">
                  {t('colActions')}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {paginatedTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="group hover:bg-dark/30 border-b border-gray-800/50 last:border-0"
                >
                  <td className="py-4 pl-4 font-medium text-white">
                    {ticket.id}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold ${getPriorityColor(ticket.priority)}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {ticket.client.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {ticket.client.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 font-medium text-white">
                    {ticket.subject}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold ${getStatusColor(ticket.status)}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-4 text-white">{ticket.createdAt}</td>
                  <td className="py-4 text-white">{ticket.assignee}</td>
                  <td className="py-4 text-left">
                    <div className="flex items-center justify-start gap-3 text-xs text-gray-400">
                      <Button
                        className="flex items-center gap-2"
                        variant="ghost"
                        onClick={() => {
                          setEditingTicketId(ticket.id);
                          setEditModalOpen(true);
                        }}
                      >
                        <p>{t('edit')}</p>
                        <Image
                          src="/icons/edit_icon.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </Button>
                      <Button
                        className="flex items-center gap-1"
                        variant="ghost"
                      >
                        <p>{t('view')}</p>
                        <Image
                          src="/icons/arrow_icon.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTickets.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              {t('noTickets')}
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {filteredTickets.length > 0 && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-4">
          <p className="text-xs text-gray-400">
            {t('showing')}{' '}
            <span className="font-bold text-white">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            -{' '}
            <span className="font-bold text-white">
              {Math.min(currentPage * itemsPerPage, filteredTickets.length)}
            </span>{' '}
            {t('of')}{' '}
            <span className="font-bold text-white">
              {filteredTickets.length}
            </span>
          </p>

          <div className="flex gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-700 bg-transparent px-3 py-1.5 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
            >
              {t('previous')}
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-700 bg-transparent px-3 py-1.5 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}

      <EditTicketModal
        ticketId={editingTicketId}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        onSuccess={onTicketUpdated}
      />
    </div>
  );
}
