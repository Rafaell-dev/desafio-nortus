import { ChatWindow } from '@/src/features/chat/components/ChatWindow';
import { TitlePage } from '@/src/features/common/components/TitlePage';
import { getTranslations } from 'next-intl/server';

export default async function ChatPage() {
  const t = await getTranslations('chat');
  return (
    <div className="bg-dark flex min-h-screen flex-col">
      <TitlePage title={t('title')} />
      <div className="mx-auto w-full max-w-7xl px-8 py-4">
        <ChatWindow />
      </div>
    </div>
  );
}
