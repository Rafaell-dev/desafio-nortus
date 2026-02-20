'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { loginAction } from '../actions';
import { authService } from '../services/authService';
import { LoginCredentials } from '../types/auth.types';
import { defaultLocale } from '@/src/i18n/request';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const locale = useLocale();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await loginAction(credentials);

      if (!result.success) {
        setError(result.error ?? 'Erro ao realizar login');
        return;
      }

      if (result.user) {
        authService.saveUserData(result.user);
      }

      const prefix = locale === defaultLocale ? '' : `/${locale}`;
      router.push(`${prefix}/dashboard`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao realizar login');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
