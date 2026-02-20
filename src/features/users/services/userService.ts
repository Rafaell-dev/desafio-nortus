import { UserApi } from './userApi';
import { User } from '../types/user.types';
import { cookies } from 'next/headers';

export class UserService {
  constructor(private api: UserApi) {}

  async getUserByEmail(email: string): Promise<User> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      throw new Error('Token não encontrado. Faça login novamente.');
    }
    return this.api.getUserByEmail(email, token);
  }
}

export const userService = new UserService(new UserApi());
