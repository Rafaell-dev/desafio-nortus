import { useState, useEffect } from 'react';
import { getUserByEmailAction } from '../../auth/actions';
import { User } from '../types/user.types';
import { authService } from '../../auth/services/authService';

export function useUser() {
  const [user, setUser] = useState<User | null>(() => {
    return authService.loadUserData();
  });
  const [isLoading, setIsLoading] = useState(!authService.loadUserData());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = authService.loadUserData();
    if (cached) {
      setUser(cached);
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const email = authService.getUserEmail();

        if (!email) {
          setIsLoading(false);
          return;
        }

        const result = await getUserByEmailAction(email);

        if (result.success && result.user) {
          authService.saveUserData(result.user);
          setUser(result.user);
          setError(null);
        } else {
          setError(result.error ?? 'Erro ao carregar usuário');
          setUser(null);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar usuário'
        );
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error };
}
