import { Ticket, ApiTicket, UpdateTicketDTO } from '../types/ticket.types';

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
      id: ticket.id,
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

  async createTicket(ticket: unknown, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ticket),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      throw new Error('Erro ao criar ticket.');
    }
  }

  async getTicketById(id: string, token: string): Promise<Ticket> {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      if (response.status === 404) {
        throw new Error('Ticket não encontrado.');
      }
      throw new Error('Erro ao buscar ticket.');
    }

    const data = await response.json();
    const ticket: ApiTicket = data.data || data;

    return {
      id: ticket.id,
      priority: ticket.priority,
      client: {
        name: ticket.client,
        email: ticket.email,
      },
      subject: ticket.subject,
      status: ticket.status,
      createdAt: new Date(ticket.createdAt).toLocaleDateString('pt-BR'),
      assignee: ticket.responsible,
    };
  }

  async updateTicket(
    id: string,
    data: UpdateTicketDTO,
    token: string
  ): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      if (response.status === 404) {
        throw new Error('Ticket não encontrado.');
      }
      throw new Error('Erro ao atualizar ticket.');
    }
  }
}
