import type { ChatResponse, ChatMessage } from '../types/chat.types';
import { GeminiApi } from './geminiApi';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getGeminiApi(): GeminiApi {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY não configurada.');
  }

  return new GeminiApi(apiKey);
}

export const chatApi = {
  async getChatHistory(token: string): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/nortus-v1/chat`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      throw new Error('Erro ao buscar histórico do chat.');
    }

    return response.json();
  },

  async sendMessage(
    message: string,
    history: ChatMessage[],
  ): Promise<ChatMessage> {
    const gemini = getGeminiApi();
    const aiText = await gemini.generateResponse(history, message);

    return {
      id: `msg_ai_${Date.now()}`,
      author: 'Assistente',
      content: aiText,
      timestamp: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      type: 'assistant_message',
    };
  },
};
