import { User } from '../types/user.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class UserApi {
  async getUserByEmail(email: string, token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/by-email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }
      if (response.status === 404) {
        throw new Error('Usuário não encontrado.');
      }
      throw new Error('Erro ao buscar dados do usuário.');
    }

    return response.json();
  }
}
