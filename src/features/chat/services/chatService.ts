import type { ChatResponse, ChatMessage } from '../types/chat.types';

export const chatService = {
  async getChatHistory(): Promise<ChatResponse> {
    const response = await fetch('/api/chat');
    if (!response.ok) {
      throw new Error('Erro ao buscar histórico do chat.');
    }
    return response.json();
  },

  async sendMessage(
    content: string,
    history: ChatMessage[],
  ): Promise<ChatMessage> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content, history }),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar mensagem.');
    }

    return response.json();
  },
};
