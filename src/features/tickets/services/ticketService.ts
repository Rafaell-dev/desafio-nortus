import { TicketApi } from './ticketApi';
import { Ticket } from '../types/ticket.types';
import { authService } from '../../auth/services/authService';

export class TicketService {
  constructor(private api: TicketApi) {}

  async getTickets(): Promise<Ticket[]> {
    const token = authService.getToken();

    if (!token) {
      throw new Error('Token não encontrado.');
    }

    return this.api.getTickets(token);
  }

  async createTicket(
    ticketData: Omit<Ticket, 'id' | 'createdAt'>
  ): Promise<void> {
    const token = authService.getToken();

    if (!token) {
      throw new Error('Token não encontrado.');
    }

    const newTicket = {
      ticketId: crypto.randomUUID(),
      priority: ticketData.priority,
      client: ticketData.client.name,
      email: ticketData.client.email,
      subject: ticketData.subject,
      status: ticketData.status,
      responsible: ticketData.assignee,
    };

    return this.api.createTicket(newTicket, token);
  }
}

export const ticketService = new TicketService(new TicketApi());
