'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
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
      await authService.login(credentials);
      // Preserve locale in redirect: pt-BR (default) → /dashboard, en → /en/dashboard
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
