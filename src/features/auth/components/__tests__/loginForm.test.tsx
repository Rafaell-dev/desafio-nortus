import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/src/tests/test-utils';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../loginForm';

const mockLogin = vi.fn();
let mockIsLoading = false;
let mockError: string | null = null;

vi.mock('../../hooks/useLogin', () => ({
  useLogin: () => ({
    login: mockLogin,
    get isLoading() { return mockIsLoading; },
    get error() { return mockError; },
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsLoading = false;
    mockError = null;
  });

  describe('Rendering', () => {
    it('should render email input', () => {
      renderWithProviders(<LoginForm />);

      expect(screen.getByPlaceholderText('userPlaceholder')).toBeInTheDocument();
    });

    it('should render password input', () => {
      renderWithProviders(<LoginForm />);

      const passwordInput = document.querySelector('input[type="password"]');
      expect(passwordInput).toBeInTheDocument();
    });

    it('should render submit button', () => {
      renderWithProviders(<LoginForm />);

      expect(screen.getByRole('button', { name: 'loginButton' })).toBeInTheDocument();
    });

    it('should render remember me checkbox', () => {
      renderWithProviders(<LoginForm />);

      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should render forgot password link', () => {
      renderWithProviders(<LoginForm />);

      expect(screen.getByRole('button', { name: 'forgotPassword' })).toBeInTheDocument();
    });
  });

  describe('Password visibility toggle', () => {
    it('should toggle password visibility on click', async () => {
      renderWithProviders(<LoginForm />);
      const user = userEvent.setup();

      const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput.type).toBe('password');

      const toggleButton = screen.getByRole('button', { name: 'togglePassword' });
      await user.click(toggleButton);

      expect(passwordInput.type).toBe('text');

      await user.click(toggleButton);
      expect(passwordInput.type).toBe('password');
    });
  });

  describe('Form validation', () => {
    it('should show validation error for empty email on submit', async () => {
      renderWithProviders(<LoginForm />);
      const user = userEvent.setup();

      const submitBtn = screen.getByRole('button', { name: 'loginButton' });
      await user.click(submitBtn);

      await waitFor(() => {
        const errorMessages = document.querySelectorAll('.text-red-400');
        expect(errorMessages.length).toBeGreaterThan(0);
      });
    });

    it('should show validation error for invalid email format', async () => {
      renderWithProviders(<LoginForm />);
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText('userPlaceholder');
      await user.type(emailInput, 'invalid-email');

      const submitBtn = screen.getByRole('button', { name: 'loginButton' });
      await user.click(submitBtn);

      await waitFor(() => {
        const errorMessages = document.querySelectorAll('.text-red-400');
        expect(errorMessages.length).toBeGreaterThan(0);
      });
    });

    it('should show validation error for short password', async () => {
      renderWithProviders(<LoginForm />);
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText('userPlaceholder');
      await user.type(emailInput, 'test@example.com');

      const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
      await user.type(passwordInput, '123');

      const submitBtn = screen.getByRole('button', { name: 'loginButton' });
      await user.click(submitBtn);

      await waitFor(() => {
        const errorMessages = document.querySelectorAll('.text-red-400');
        expect(errorMessages.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Form submission', () => {
    it('should call login with email and password on valid submit', async () => {
      renderWithProviders(<LoginForm />);
      const user = userEvent.setup();

      const emailInput = screen.getByPlaceholderText('userPlaceholder');
      await user.type(emailInput, 'test@example.com');

      const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
      await user.type(passwordInput, '123456');

      const submitBtn = screen.getByRole('button', { name: 'loginButton' });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: '123456',
        });
      });
    });

    it('should NOT call login when form is invalid', async () => {
      renderWithProviders(<LoginForm />);
      const user = userEvent.setup();

      const submitBtn = screen.getByRole('button', { name: 'loginButton' });
      await user.click(submitBtn);

      await waitFor(() => {
        expect(mockLogin).not.toHaveBeenCalled();
      });
    });
  });

  describe('Loading state', () => {
    it('should show loading text when isLoading is true', () => {
      mockIsLoading = true;

      renderWithProviders(<LoginForm />);

      expect(screen.getByRole('button', { name: 'loggingIn' })).toBeInTheDocument();
    });

    it('should disable submit button when isLoading', () => {
      mockIsLoading = true;

      renderWithProviders(<LoginForm />);

      expect(screen.getByRole('button', { name: 'loggingIn' })).toBeDisabled();
    });
  });

  describe('Error display', () => {
    it('should display error message from useLogin', () => {
      mockError = 'Credenciais inválidas';

      renderWithProviders(<LoginForm />);

      expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
    });

    it('should NOT display error section when there is no error', () => {
      mockError = null;

      renderWithProviders(<LoginForm />);

      const errorContainer = document.querySelector('.bg-red-500\\/10');
      expect(errorContainer).not.toBeInTheDocument();
    });
  });
});
