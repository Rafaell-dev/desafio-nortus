import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/src/tests/test-utils';
import { LanguageSelector } from '../LanguageSelector';
import { mockPush } from '@/src/tests/setup';

describe('LanguageSelector', () => {
  it('should render the selector trigger', () => {
    renderWithProviders(<LanguageSelector />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should display pt-BR as default value', () => {
    renderWithProviders(<LanguageSelector />);

    expect(screen.getByText('pt-BR')).toBeInTheDocument();
  });

  it('should render all language options when opened', async () => {
    renderWithProviders(<LanguageSelector />);
    const user = userEvent.setup();

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    expect(screen.getByText('en-US')).toBeInTheDocument();
    expect(screen.getByText('es-ES')).toBeInTheDocument();
  });

  it('should navigate to new locale when option is selected', async () => {
    renderWithProviders(<LanguageSelector />);
    const user = userEvent.setup();

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    const enOption = screen.getByText('en-US');
    await user.click(enOption);

    expect(mockPush).toHaveBeenCalledWith('/en/');
  });
});
