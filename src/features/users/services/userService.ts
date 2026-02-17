import { UserApi } from './userApi';
import { User } from '../types/user.types';
import { authService } from '../../auth/services/authService';

export class UserService {
  constructor(private api: UserApi) {}

  async getUserByEmail(email: string): Promise<User> {
    const token = authService.getToken();

    if (!token) {
      throw new Error('Token not found');
    }
    return this.api.getUserByEmail(email, token);
  }
}

export const userService = new UserService(new UserApi());
