import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { chatApi } from '@/src/features/chat/services/chatApi';
import type { ChatMessage } from '@/src/features/chat/types/chat.types';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const data = await chatApi.getChatHistory(token);
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erro interno do servidor';
    const status = message.includes('expirada') ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = (await request.json()) as {
      message: string;
      history: ChatMessage[];
    };

    if (!body.message?.trim()) {
      return NextResponse.json(
        { error: 'Mensagem não pode ser vazia' },
        { status: 400 },
      );
    }

    const aiMessage = await chatApi.sendMessage(body.message, body.history);
    return NextResponse.json(aiMessage);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Erro interno do servidor';
    console.error('[Chat POST]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
