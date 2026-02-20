import { Ticket } from '../types/ticket.types';

export class TicketService {
  async getTickets(): Promise<Ticket[]> {
    const response = await fetch('/api/tickets');
    if (!response.ok) {
      throw new Error('Erro ao buscar tickets.');
    }
    return response.json();
  }

  async getTicketById(id: string): Promise<Ticket> {
    const response = await fetch(`/api/tickets/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ticket não encontrado.');
      }
      throw new Error('Erro ao buscar ticket.');
    }
    return response.json();
  }

  async createTicket(
    ticketData: Omit<Ticket, 'id' | 'createdAt'>
  ): Promise<void> {
    const body = {
      ticketId: crypto.randomUUID(),
      priority: ticketData.priority,
      client: ticketData.client.name,
      email: ticketData.client.email,
      subject: ticketData.subject,
      status: ticketData.status,
      responsible: ticketData.assignee,
    };

    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar ticket.');
    }
  }

  async updateTicket(
    id: string,
    ticketData: Partial<Omit<Ticket, 'id' | 'createdAt'>>
  ): Promise<void> {
    const body: Record<string, string> = {};

    if (ticketData.priority) body.priority = ticketData.priority;
    if (ticketData.client?.name) body.client = ticketData.client.name;
    if (ticketData.client?.email) body.email = ticketData.client.email;
    if (ticketData.subject) body.subject = ticketData.subject;
    if (ticketData.status) body.status = ticketData.status;
    if (ticketData.assignee) body.responsible = ticketData.assignee;

    const response = await fetch(`/api/tickets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ticket não encontrado.');
      }
      throw new Error('Erro ao atualizar ticket.');
    }
  }
}

export const ticketService = new TicketService();
