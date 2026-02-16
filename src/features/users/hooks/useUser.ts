import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { User } from '../types/user.types';
import { authService } from '../../auth/services/authService';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = authService.getUserEmail();

        if (!email) {
          setIsLoading(false);
          return;
        }

        const userData = await userService.getUserByEmail(email);
        setUser(userData);
        setError(null);
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
