import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { MapApi } from '@/src/features/dashboard/services/mapApi';

const mapApi = new MapApi();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const data = await mapApi.getLocations(token);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
