import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatMessage, ConversationAnalysis } from '../types/chat.types';
import { chatService } from '../services/chatService';

interface ChatStore {
  messages: ChatMessage[];
  analysis: ConversationAnalysis | null;
  iaSuggestion: string | null;
  isLoading: boolean;
  error: string | null;
  inputMessage: string;
  initialized: boolean;
  setInputMessage: (message: string) => void;
  sendMessage: (directMessage?: string) => Promise<void>;
  initializeChat: () => Promise<void>;
  clearHistory: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      analysis: null,
      iaSuggestion: null,
      isLoading: false,
      error: null,
      inputMessage: '',
      initialized: false,

      setInputMessage: (message: string) => set({ inputMessage: message }),

      initializeChat: async () => {
        const { initialized, messages } = get();

        if (initialized && messages.length > 0) return;

        set({ isLoading: true });
        try {
          const data = await chatService.getChatHistory();
          set({
            messages: data.messages,
            analysis: data.conversationAnalysis,
            iaSuggestion: data.iaSuggestion,
            isLoading: false,
            initialized: true,
          });
        } catch (error) {
          console.error('Failed to load chat history:', error);
          set({ isLoading: false, initialized: true });
        }
      },

      sendMessage: async (directMessage?: string) => {
        const { inputMessage, messages } = get();
        const content = directMessage ?? inputMessage;

        if (!content.trim()) return;

        const userMessage: ChatMessage = {
          id: `msg_user_${Date.now()}`,
          content,
          author: 'Você',
          type: 'user_message',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        const updatedMessages = [...messages, userMessage];
        set({
          messages: updatedMessages,
          inputMessage: '',
          isLoading: true,
          error: null,
        });

        try {
          const aiMessage = await chatService.sendMessage(
            content,
            updatedMessages,
          );
          set((state) => ({
            messages: [...state.messages, aiMessage],
            isLoading: false,
          }));
        } catch {
          set({ isLoading: false, error: 'Erro ao obter resposta da IA.' });
        }
      },

      clearHistory: () =>
        set({
          messages: [],
          analysis: null,
          iaSuggestion: null,
          initialized: false,
          error: null,
        }),
    }),
    {
      name: 'nortus-chat-history',
      partialize: (state) => ({
        messages: state.messages,
        analysis: state.analysis,
        iaSuggestion: state.iaSuggestion,
        initialized: state.initialized,
      }),
    },
  ),
);
