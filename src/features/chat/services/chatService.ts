import { ChatResponse, ChatMessage } from '../types/chat.types';
import { ChatApi } from './chatApi';
import { authService } from '../../auth/services/authService';

export const chatService = {
  api: new ChatApi(),

  async getChatHistory(): Promise<ChatResponse> {
    const token = authService.getToken();
    if (!token) {
      throw new Error('Token não encontrado.');
    }
    return this.api.getChatHistory(token);
  },

  async sendMessage(content: string): Promise<ChatMessage> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      id: crypto.randomUUID(),
      content,
      author: 'Ricardo Leite - Seguro Automotivo', //ajustar
      type: 'user_message',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  },
};
