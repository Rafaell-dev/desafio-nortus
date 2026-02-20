import { describe, it, expect } from 'vitest';
import { loginSchema } from '../loginSchema';

describe('loginSchema', () => {
  it('should validate correct login data', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '123456',
      rememberMe: false,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('user@example.com');
      expect(result.data.password).toBe('123456');
      expect(result.data.rememberMe).toBe(false);
    }
  });

  it('should accept rememberMe as true', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'validpass',
      rememberMe: true,
    });

    expect(result.success).toBe(true);
  });

  it('should reject empty email', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: '123456',
      rememberMe: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.issues.filter(
        (i) => i.path[0] === 'email',
      );
      expect(emailErrors.length).toBeGreaterThan(0);
    }
  });

  it('should reject invalid email format', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: '123456',
      rememberMe: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.issues.filter(
        (i) => i.path[0] === 'email',
      );
      expect(emailErrors.length).toBeGreaterThan(0);
    }
  });

  it('should reject email without domain', () => {
    const result = loginSchema.safeParse({
      email: 'user@',
      password: '123456',
      rememberMe: false,
    });

    expect(result.success).toBe(false);
  });

  it('should reject empty password', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '',
      rememberMe: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const passErrors = result.error.issues.filter(
        (i) => i.path[0] === 'password',
      );
      expect(passErrors.length).toBeGreaterThan(0);
    }
  });

  it('should reject password shorter than 6 characters', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '12345',
      rememberMe: false,
    });

    expect(result.success).toBe(false);
  });

  it('should accept password with exactly 6 characters', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '123456',
      rememberMe: false,
    });

    expect(result.success).toBe(true);
  });

  it('should reject missing fields', () => {
    const result = loginSchema.safeParse({});

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
    }
  });
});
