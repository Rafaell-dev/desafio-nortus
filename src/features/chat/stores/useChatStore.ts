import { create } from 'zustand';
import { ChatMessage, ConversationAnalysis } from '../types/chat.types';
import { chatService } from '../services/chatService';

interface ChatStore {
  messages: ChatMessage[];
  analysis: ConversationAnalysis | null;
  isLoading: boolean;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  sendMessage: () => Promise<void>;
  initializeChat: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  analysis: null,
  isLoading: false,
  inputMessage: '',

  setInputMessage: (message: string) => set({ inputMessage: message }),

  initializeChat: async () => {
    set({ isLoading: true });
    try {
      const data = await chatService.getChatHistory();
      set({
        messages: data.messages,
        analysis: data.conversationAnalysis,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to load chat history:', error);
      set({ isLoading: false });
    }
  },

  sendMessage: async () => {
    const { inputMessage, messages } = get();

    if (inputMessage.trim()) {
      const newMessage = await chatService.sendMessage(inputMessage);

      set({
        messages: [...messages, newMessage],
        inputMessage: '',
      });
    }
  },
}));
