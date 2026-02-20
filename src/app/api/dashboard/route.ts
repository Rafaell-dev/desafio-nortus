import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { DashboardApi } from '@/src/features/dashboard/services/dashboardApi';

const dashboardApi = new DashboardApi();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const data = await dashboardApi.getDashboard(token);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
