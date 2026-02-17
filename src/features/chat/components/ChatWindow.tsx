'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '../stores/useChatStore';
import { MessageBubble } from './MessageBubble';
import { AISuggestionBubble } from './AISuggestionBubble';
import { ChatInput } from './ChatInput';

export function ChatWindow() {
  const { messages, initializeChat, analysis } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-dark-surface flex h-[calc(100vh-120px)] flex-col overflow-hidden rounded-3xl border border-gray-800">
      <div className="flex items-center justify-center border-b border-gray-800 p-4">
        <span className="text-xs tracking-wider text-gray-400 uppercase">
          HOJE, 12:23
        </span>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent flex-1 space-y-6 overflow-y-auto p-6"
      >
        {messages.map((msg) => {
          if (msg.type === 'ai_suggestion') {
            return (
              <AISuggestionBubble
                key={msg.id}
                suggestion={msg}
                actions={analysis?.futureSteps.actions}
              />
            );
          } else {
            return <MessageBubble key={msg.id} message={msg} />;
          }
        })}
      </div>

      <ChatInput />
    </div>
  );
}
