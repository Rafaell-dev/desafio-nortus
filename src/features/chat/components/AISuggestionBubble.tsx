import type { ChatMessage, FutureAction } from '../types/chat.types';
import { Button } from '@/components/ui/button';
import { useChatStore } from '../stores/useChatStore';
import Image from 'next/image';

interface AISuggestionProps {
  suggestion: ChatMessage;
  actions?: FutureAction[];
}

export function AISuggestionBubble({
  suggestion,
  actions = [],
}: AISuggestionProps) {
  const { sendMessage, isLoading } = useChatStore();

  return (
    <div className="mr-auto w-full max-w-[80%]">
      <div className="bg-dark-surface-2 rounded-2xl border border-gray-700 p-4">
        <div className="mb-2 flex items-center gap-2 text-gray-400">
          <Image
            src="/icons/robot_icon.svg"
            alt="robot"
            width={16}
            height={16}
          />
          <span className="text-xs font-medium">{suggestion.author}</span>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-gray-300">
          {suggestion.content}
        </p>

        <div className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="default"
              size="sm"
              className="bg-blue h-8 rounded-full px-4 text-xs font-medium text-white hover:bg-blue-700"
              onClick={() => sendMessage(action.action)}
              disabled={isLoading}
            >
              {action.action}
            </Button>
          ))}
        </div>

        <div className="mt-2 text-right">
          <span className="text-[10px] text-gray-500">
            {suggestion.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
