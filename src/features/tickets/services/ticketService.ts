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
}

export const ticketService = new TicketService(new TicketApi());
