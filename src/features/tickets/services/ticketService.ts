import { Ticket } from '../types/ticket.types';

export class TicketService {
  async getTickets(): Promise<Ticket[]> {
    const response = await fetch('/api/tickets');
    if (!response.ok) {
      throw new Error('Erro ao buscar tickets.');
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
}

export const ticketService = new TicketService();
