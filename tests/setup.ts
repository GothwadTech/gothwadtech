import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

/** jsdom has no matchMedia; give every test a controllable stub. */
type MediaListener = (event: { matches: boolean }) => void;

export function setSystemTheme(dark: boolean) {
  const mql = {
    matches: dark,
    media: '(prefers-color-scheme: dark)',
    onchange: null as MediaListener | null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  };
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: () => mql,
  });
}

setSystemTheme(false);

afterEach(() => {
  cleanup();
});
