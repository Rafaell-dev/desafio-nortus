import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useLogin } from '../useLogin';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, replace: vi.fn(), back: vi.fn(), refresh: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/',
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'pt-BR',
  useTranslations: () => (key: string) => key,
}));

const mockLoginAction = vi.fn();
vi.mock('../../actions', () => ({
  loginAction: (...args: unknown[]) => mockLoginAction(...args),
}));

const mockSaveUserData = vi.fn();
vi.mock('../../services/authService', () => ({
  authService: {
    saveUserData: (...args: unknown[]) => mockSaveUserData(...args),
  },
}));

vi.mock('@/src/i18n/request', () => ({
  defaultLocale: 'pt-BR',
}));

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start with isLoading false and no error', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should navigate to /dashboard on successful login', async () => {
    const mockUser = { id: '1', name: 'User', email: 'test@example.com', state: 'SP' };

    mockLoginAction.mockResolvedValue({ success: true, user: mockUser });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: '123456' });
    });

    expect(mockLoginAction).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456',
    });
    expect(mockSaveUserData).toHaveBeenCalledWith(mockUser);
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('should set error when loginAction returns error', async () => {
    mockLoginAction.mockResolvedValue({
      success: false,
      error: 'Credenciais inválidas',
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: 'wrong@example.com', password: 'wrong' });
    });

    expect(result.current.error).toBe('Credenciais inválidas');
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should set generic error when loginAction returns no error message', async () => {
    mockLoginAction.mockResolvedValue({ success: false });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: '123456' });
    });

    expect(result.current.error).toBe('Erro ao realizar login');
  });

  it('should set error on unexpected exception', async () => {
    mockLoginAction.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: '123456' });
    });

    expect(result.current.error).toBe('Network error');
  });

  it('should set isLoading to false after login completes (success)', async () => {
    mockLoginAction.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: '123456' });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should set isLoading to false after login completes (failure)', async () => {
    mockLoginAction.mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: '123456' });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should not save user data when user is undefined', async () => {
    mockLoginAction.mockResolvedValue({ success: true, user: undefined });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: '123456' });
    });

    expect(mockSaveUserData).not.toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalled();
  });
});
