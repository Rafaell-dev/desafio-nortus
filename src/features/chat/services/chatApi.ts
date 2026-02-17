import { ChatResponse, ChatMessage } from '../types/chat.types';
import { authService } from '../../auth/services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ChatApi {
  async getChatHistory(token: string): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/nortus-v1/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        authService.logout();
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      throw new Error('Erro ao buscar histórico do chat.');
    }

    return response.json();
  }

  async sendMessage(content: string, token: string): Promise<ChatMessage> {
    throw new Error('Send message API not implemented');
  }
}
