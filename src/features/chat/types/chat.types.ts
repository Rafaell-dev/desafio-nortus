export type MessageType =
  | 'user_message'
  | 'assistant_message'
  | 'ai_suggestion';

export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: MessageType;
}

export interface Insight {
  id: string;
  type: string;
  category: string;
}

export interface FutureAction {
  id: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ConversationAnalysis {
  insights: {
    title: string;
    insights: Insight[];
  };
  futureSteps: {
    title: string;
    actions: FutureAction[];
  };
}

export interface ChatResponse {
  messages: ChatMessage[];
  iaSuggestion: string;
  conversationAnalysis: ConversationAnalysis;
}
