import type { ChatMessage } from '../types/chat.types';
import { cn } from '@/lib/utils';
import { CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user_message';

  return (
    <div
      className={cn(
        'flex max-w-[80%] flex-col',
        isUser ? 'ml-auto items-end' : 'mr-auto items-start',
      )}
    >
      <div
        className={cn(
          'mr-1 mb-1 flex items-center gap-2 text-xs',
          isUser ? 'text-blue-400' : 'text-gray-400',
        )}
      >
        <span>{message.author}</span>
      </div>

      <div
        className={cn(
          'relative rounded-2xl px-5 py-3 text-sm',
          isUser
            ? 'bg-blue rounded-tr-none text-white'
            : 'bg-dark-surface-2 rounded-tl-none border border-gray-700 text-white',
        )}
      >
        <p className="leading-relaxed">{message.content}</p>
        <div className="mt-1 flex items-center justify-end gap-1">
          <span
            className={cn(
              'text-[10px]',
              isUser ? 'text-blue-200' : 'text-gray-400',
            )}
          >
            {message.timestamp}
          </span>
          {isUser && <CheckCheck className="size-3 text-blue-200" />}
        </div>
      </div>
    </div>
  );
}
