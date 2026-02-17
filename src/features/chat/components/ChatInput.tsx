import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '../stores/useChatStore';

export function ChatInput() {
  const { inputMessage, setInputMessage, sendMessage, isLoading } =
    useChatStore();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="border-t border-gray-800 p-4">
      <div className="bg-dark-surface-2 ring-offset-background flex items-center gap-2 rounded-full border border-gray-700 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
        <input
          type="text"
          placeholder="Escreva aqui..."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <Button
          size="icon"
          className="bg-blue h-8 w-8 rounded-full text-white hover:bg-blue-700"
          onClick={() => sendMessage()}
          disabled={!inputMessage.trim() || isLoading}
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
