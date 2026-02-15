import { AuthApi } from './authApi';
import { LoginCredentials } from '../types/auth.types';

export class AuthService {
  constructor(private api: AuthApi) {}

  async login(credentials: LoginCredentials) {
    const response = await this.api.login(credentials);

    localStorage.setItem('token', response.access_token);

    return response;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService(new AuthApi());
