import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { server } from '@/src/tests/mocks/server';
import { AuthApi } from '../authApi';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const API_BASE = 'http://localhost:3000';
const api = new AuthApi(API_BASE);

describe('AuthApi', () => {
  describe('login', () => {
    it('should return access_token on successful login', async () => {
      const result = await api.login({
        email: 'test@example.com',
        password: '123456',
      });

      expect(result).toEqual({ access_token: 'mock-access-token-123' });
    });

    it('should throw on invalid credentials', async () => {
      await expect(
        api.login({ email: 'wrong@example.com', password: 'wrong' }),
      ).rejects.toThrow('Falha ao realizar login');
    });
  });
});
