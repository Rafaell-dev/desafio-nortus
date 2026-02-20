import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../authService';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    localStorage.clear();
  });

  describe('saveUserData', () => {
    it('should save user data and email to localStorage', () => {
      const user = {
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
        state: 'SP',
      };

      service.saveUserData(user);

      expect(localStorage.getItem('user_data')).toBe(JSON.stringify(user));
      expect(localStorage.getItem('user_email')).toBe('test@example.com');
    });
  });

  describe('loadUserData', () => {
    it('should return null when no data is stored', () => {
      expect(service.loadUserData()).toBeNull();
    });

    it('should return parsed user data', () => {
      const user = {
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
        state: 'SP',
      };

      localStorage.setItem('user_data', JSON.stringify(user));

      expect(service.loadUserData()).toEqual(user);
    });

    it('should return null on corrupted JSON', () => {
      localStorage.setItem('user_data', '{invalid-json');

      expect(service.loadUserData()).toBeNull();
    });
  });

  describe('getUserEmail', () => {
    it('should return null when no email is stored', () => {
      expect(service.getUserEmail()).toBeNull();
    });

    it('should return stored email', () => {
      localStorage.setItem('user_email', 'test@example.com');

      expect(service.getUserEmail()).toBe('test@example.com');
    });
  });

  describe('clearLocalData', () => {
    it('should remove user data and email from localStorage', () => {
      localStorage.setItem('user_data', '{}');
      localStorage.setItem('user_email', 'test@example.com');

      service.clearLocalData();

      expect(localStorage.getItem('user_data')).toBeNull();
      expect(localStorage.getItem('user_email')).toBeNull();
    });
  });
});
