export interface Ticket {
  id: string;
  ticketId: string;
  priority: 'Urgente' | 'Alta' | 'Média' | 'Baixa';
  client: {
    name: string;
    email: string;
  };
  subject: string;
  status: 'Aberto' | 'Em andamento' | 'Resolvido' | 'Fechado';
  createdAt: string;
  assignee: string;
}

export interface TicketStats {
  open: number;
  inProgress: number;
  solvedToday: number;
  averageTime: string;
}

export interface ApiTicket {
  ticketId?: string;
  id: string;
  priority: Ticket['priority'];
  client: string;
  email: string;
  subject: string;
  status: Ticket['status'];
  createdAt: string;
  responsible: string;
}

export interface CreateTicketDTO {
  ticketId: string;
  priority: Ticket['priority'];
  client: string;
  email: string;
  subject: string;
  status: Ticket['status'];
  responsible: string;
}

export interface UpdateTicketDTO {
  priority?: Ticket['priority'];
  client?: string;
  email?: string;
  subject?: string;
  status?: Ticket['status'];
  responsible?: string;
}
