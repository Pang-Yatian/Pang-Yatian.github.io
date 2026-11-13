// Apply the saved theme before paint. Storage can be unavailable in private contexts.
(() => {
  let theme = 'dark';
  try { theme = localStorage.getItem('theme') || theme; } catch {}
  if (theme === 'system') theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
})();
