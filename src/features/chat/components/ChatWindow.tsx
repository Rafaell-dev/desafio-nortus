'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useChatStore } from '../stores/useChatStore';
import { MessageBubble } from './MessageBubble';
import { AISuggestionBubble } from './AISuggestionBubble';
import { ChatInput } from './ChatInput';
import { useTranslations, useLocale } from 'next-intl';

function TypingIndicator({ label }: { label: string }) {
  return (
    <div className="mr-auto flex max-w-[80%] flex-col items-start">
      <span className="mb-1 ml-1 text-xs text-gray-400">{label}</span>
      <div className="bg-dark-surface-2 flex gap-1.5 rounded-2xl rounded-tl-none border border-gray-700 px-5 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export function ChatWindow() {
  const t = useTranslations('chat');
  const locale = useLocale();
  const { messages, initializeChat, analysis, isLoading } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const timeLabel = useMemo(
    () =>
      new Date().toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [locale],
  );

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  return (
    <div className="bg-dark-surface flex h-[calc(100vh-120px)] flex-col overflow-hidden rounded-3xl border border-gray-800">
      <div className="flex items-center justify-center border-b border-gray-800 p-4">
        <span className="text-xs tracking-wider text-gray-400 uppercase">
          {t('today')}, {timeLabel}
        </span>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent flex-1 space-y-6 overflow-y-auto p-6"
      >
        {messages.map((msg) =>
          msg.type === 'ai_suggestion' ? (
            <AISuggestionBubble
              key={msg.id}
              suggestion={msg}
              actions={analysis?.futureSteps.actions}
            />
          ) : (
            <MessageBubble key={msg.id} message={msg} />
          ),
        )}

        {isLoading && <TypingIndicator label={t('typing')} />}
      </div>

      <ChatInput />
    </div>
  );
}
