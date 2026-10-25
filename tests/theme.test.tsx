/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';
import { setSystemTheme } from './setup';

const Probe = () => {
  const { isDark, toggleTheme, themeMode } = useTheme();
  return (
    <button type="button" onClick={toggleTheme}>
      {themeMode}:{isDark ? 'dark' : 'light'}
    </button>
  );
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
});

afterEach(() => {
  localStorage.clear();
});

describe('ThemeProvider', () => {
  it('follows the operating system without writing a preference', () => {
    setSystemTheme(true);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    expect(screen.getByRole('button').textContent).toBe('system:dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    // Regression: the old implementation persisted "light" on first paint,
    // which silently dropped the user out of `system` mode.
    expect(localStorage.getItem('gothwad-theme')).toBeNull();
  });

  it('toggles to an explicit theme and remembers it', () => {
    setSystemTheme(false);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button.textContent).toBe('system:light');

    fireEvent.click(button);

    expect(button.textContent).toBe('dark:dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('gothwad-theme')).toBe('dark');
  });

  it('honours a stored explicit theme over the system setting', () => {
    localStorage.setItem('gothwad-theme', 'dark');
    setSystemTheme(false);
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );

    expect(screen.getByRole('button').textContent).toBe('dark:dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
