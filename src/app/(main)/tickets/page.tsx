'use client';

import { TitlePage } from '@/src/features/common/components/titlePage';
import { TicketList } from '@/src/features/tickets/components/TicketList';
import { TicketStats } from '@/src/features/tickets/components/TicketStats';
import { Ticket } from '@/src/features/tickets/types/ticket.types';

export default function TicketsPage() {
  const mockTickets: Ticket[] = [
    {
      id: 'TK001',
      priority: 'Urgente',
      client: { name: 'Ricardo Leite', email: 'ricardo@email.com' },
      subject: 'Solicitação de alteração',
      status: 'Aberto',
      createdAt: '14/12/2024',
      assignee: 'Ana Silva',
    },
    {
      id: 'TK002',
      priority: 'Média',
      client: { name: 'Maria Silva', email: 'mariasilva@email.com' },
      subject: 'Dúvida sobre cobertura',
      status: 'Aberto',
      createdAt: '13/12/2024',
      assignee: 'João Costa',
    },
    {
      id: 'TK003',
      priority: 'Baixa',
      client: { name: 'João Costa', email: 'costajoao@email.com' },
      subject: 'Sinistro na residência',
      status: 'Em andamento',
      createdAt: '13/12/2024',
      assignee: 'Carlos Lima',
    },
    {
      id: 'TK004',
      priority: 'Urgente',
      client: { name: 'Residencial Premium', email: 'rpremium@email.com' },
      subject: 'Seguro residencial',
      status: 'Aberto',
      createdAt: '12/12/2024',
      assignee: 'Anderson Freitas',
    },
    {
      id: 'TK005',
      priority: 'Média',
      client: { name: 'Familia Total', email: 'familiatotal@email.com' },
      subject: 'Dúvida sobre combo automóvel e residencial',
      status: 'Aberto',
      createdAt: '09/12/2024',
      assignee: 'Ana Silva',
    },
  ];

  const mockStats = {
    open: 15,
    inProgress: 8,
    solvedToday: 12,
    averageTime: '2.5h',
  };

  return (
    <div className="bg-dark flex min-h-screen max-w-screen flex-col">
      <TitlePage title="Gestão de Tickets" />
      <div className="mx-auto w-full max-w-7xl px-8 py-8">
        <div className="mb-8">
          <TicketStats stats={mockStats} />
        </div>
        <TicketList tickets={mockTickets} />
      </div>
    </div>
  );
}
