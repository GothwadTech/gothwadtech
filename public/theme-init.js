/* Gothwad Tech — pre-paint theme bootstrap.
 * Runs synchronously in <head> so the correct colour scheme is applied before
 * first paint (no flash of the wrong theme) and so `system` is never overwritten.
 * External file (not inline) to stay compatible with a strict CSP.
 */
(function () {
  try {
    var stored = localStorage.getItem('gothwad-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored === 'dark' || (stored !== 'light' && prefersDark);
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(dark ? 'dark' : 'light');
    root.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {
    /* localStorage blocked — fall through to the CSS default */
  }
})();
