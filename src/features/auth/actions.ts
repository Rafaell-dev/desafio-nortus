'use server';

import { cookies } from 'next/headers';
import { AuthApi } from './services/authApi';
import { LoginCredentials } from './types/auth.types';
import { UserApi } from '@/src/features/users/services/userApi';
import { User } from '@/src/features/users/types/user.types';

const authApi = new AuthApi();
const userApi = new UserApi();

interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

export async function getUserByEmailAction(
  email: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: 'Token não encontrado. Faça login novamente.',
      };
    }

    const user = await userApi.getUserByEmail(email, token);
    return { success: true, user };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Erro ao buscar usuário',
    };
  }
}

export async function loginAction(
  credentials: LoginCredentials
): Promise<LoginResult> {
  try {
    const { access_token } = await authApi.login(credentials);

    const cookieStore = await cookies();
    cookieStore.set('auth_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const user = await userApi.getUserByEmail(credentials.email, access_token);

    return { success: true, user };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Erro ao realizar login',
    };
  }
}
