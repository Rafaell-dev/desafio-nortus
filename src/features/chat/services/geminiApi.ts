import { GoogleGenAI } from '@google/genai';
import type { ChatMessage } from '../types/chat.types';

type GeminiRole = 'user' | 'model';

const GEMINI_MODEL = 'gemini-3-flash-preview';
const FALLBACK_RESPONSE = 'Desculpe, não consegui gerar uma resposta.';

const SYSTEM_INSTRUCTION = `Você é um assistente de IA especializado em seguros, integrado à plataforma Nortus — um sistema de gestão de seguradoras. Seu papel é ajudar corretores e atendentes a:

- Responder dúvidas de clientes sobre apólices, coberturas e sinistros
- Sugerir cross-sell e upsell de produtos (auto, residencial, vida, saúde, equipamentos)
- Analisar o perfil do cliente e recomendar ações
- Fornecer informações sobre renovações e prazos

Seja profissional, empático e conciso. Responda sempre em português do Brasil.
Não use markdown na resposta, apenas texto simples.`;

function buildHistory(messages: ChatMessage[]) {
  return messages
    .filter((msg) => msg.type !== 'ai_suggestion')
    .map((msg) => ({
      role: (msg.type === 'user_message' ? 'user' : 'model') as GeminiRole,
      parts: [{ text: msg.content }],
    }));
}

export class GeminiApi {
  private readonly ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateResponse(
    history: ChatMessage[],
    message: string,
  ): Promise<string> {
    const chat = this.ai.chats.create({
      model: GEMINI_MODEL,
      history: buildHistory(history),
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });

    const response = await chat.sendMessage({ message });

    return response.text ?? FALLBACK_RESPONSE;
  }
}
