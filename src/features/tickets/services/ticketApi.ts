import { Ticket, ApiTicket } from '../types/ticket.types';
import { authService } from '../../auth/services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class TicketApi {
  async getTickets(token: string): Promise<Ticket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        authService.logout();
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      throw new Error('Erro ao buscar tickets.');
    }

    const data = await response.json();

    // Check if data is wrapped in a 'data' property
    const rawTickets = data.data || data;

    if (!Array.isArray(rawTickets)) {
      console.error('API response is not an array:', data);
      return [];
    }

    return rawTickets.map((ticket: ApiTicket) => ({
      id: ticket.ticketId || ticket.id,
      priority: ticket.priority,
      client: {
        name: ticket.client,
        email: ticket.email,
      },
      subject: ticket.subject,
      status: ticket.status,
      createdAt: new Date(ticket.createdAt).toLocaleDateString('pt-BR'),
      assignee: ticket.responsible,
    }));
  }
}
