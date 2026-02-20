import { ChatResponse, ChatMessage } from '../types/chat.types';

export const chatService = {
  async getChatHistory(): Promise<ChatResponse> {
    const response = await fetch('/api/chat');
    if (!response.ok) {
      throw new Error('Erro ao buscar histórico do chat.');
    }
    return response.json();
  },

  async sendMessage(content: string): Promise<ChatMessage> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      id: crypto.randomUUID(),
      content,
      author: 'Ricardo Leite - Seguro Automotivo',
      type: 'user_message',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  },
};
