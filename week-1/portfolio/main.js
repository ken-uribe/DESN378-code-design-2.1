const toggle = document.querySelector('[data-theme-toggle]');

toggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = newTheme;
});