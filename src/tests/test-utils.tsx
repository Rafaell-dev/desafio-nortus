import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import ptBR from '@/messages/pt-BR.json';

interface ProvidersProps {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, unknown>;
}

function AllProviders({
  children,
  locale = 'pt-BR',
  messages = ptBR as unknown as Record<string, unknown>,
}: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string;
  messages?: Record<string, unknown>;
}

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {},
) {
  const { locale, messages, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllProviders locale={locale} messages={messages}>
      {children}
    </AllProviders>
  );

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export function createMockUser(overrides = {}) {
  return {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    state: 'SP',
    ...overrides,
  };
}

export function createMockLoginCredentials(overrides = {}) {
  return {
    email: 'test@example.com',
    password: '123456',
    ...overrides,
  };
}

export { default as userEvent } from '@testing-library/user-event';
export * from '@testing-library/react';
