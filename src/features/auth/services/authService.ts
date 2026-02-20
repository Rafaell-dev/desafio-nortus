import { User } from '@/src/features/users/types/user.types';

const USER_DATA_KEY = 'user_data';
const USER_EMAIL_KEY = 'user_email';

/**
 * Client-side only helpers for cached user data.
 * The auth token is managed server-side as an HttpOnly cookie
 * via the loginAction / logoutAction Server Actions.
 */
export class AuthService {
  saveUserData(user: User): void {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    localStorage.setItem(USER_EMAIL_KEY, user.email);
  }

  loadUserData(): User | null {
    try {
      const raw = localStorage.getItem(USER_DATA_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }

  getUserEmail(): string | null {
    return localStorage.getItem(USER_EMAIL_KEY);
  }

  /** Clears client-side state. The HttpOnly cookie is cleared by logoutAction. */
  clearLocalData(): void {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
  }
}

export const authService = new AuthService();
