'use client';

import { TitlePage } from '@/src/features/common/components/titlePage';
import { TicketList } from '@/src/features/tickets/components/TicketList';
import { TicketStats } from '@/src/features/tickets/components/TicketStats';

import { useTickets } from '@/src/features/tickets/hooks/useTickets';

export default function TicketsPage() {
  const { tickets, isLoading, error } = useTickets();

  const stats = {
    open: tickets.filter((t) => t.status === 'Aberto').length,
    inProgress: tickets.filter((t) => t.status === 'Em andamento').length,
    solvedToday: tickets.filter(
      (t) => t.status === 'Resolvido' || t.status === 'Fechado'
    ).length,
    averageTime: '2.5h',
  };

  if (isLoading) {
    return (
      <div className="bg-dark flex min-h-screen flex-col text-white">
        <TitlePage title="Gestão de Tickets" />
        <div className="mx-auto w-full max-w-7xl px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-dark-surface h-32 rounded-2xl p-6" />
              ))}
            </div>
            <div className="bg-dark-surface h-96 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark flex min-h-screen flex-col text-white">
        <TitlePage title="Gestão de Tickets" />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Erro ao carregar tickets: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark flex min-h-screen flex-col">
      <TitlePage title="Gestão de Tickets" />
      <div className="mx-auto w-full max-w-7xl px-8 py-8">
        <div className="mb-8">
          <TicketStats stats={stats} />
        </div>
        <TicketList tickets={tickets} />
      </div>
    </div>
  );
}
