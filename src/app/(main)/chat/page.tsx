import { ChatWindow } from '@/src/features/chat/components/ChatWindow';
import { TitlePage } from '@/src/features/common/components/titlePage';

export default function ChatPage() {
  return (
    <div className="bg-dark flex min-h-screen flex-col">
      <TitlePage title="Chat & Assistente Virtual" />
      <div className="mx-auto w-full max-w-7xl px-8 py-4">
        <ChatWindow />
      </div>
    </div>
  );
}
