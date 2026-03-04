const buttons = document.querySelectorAll('[data-mode]');
const root = document.documentElement;
const storageKey = 'theme';

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setActiveButton(mode) {
  buttons.forEach(button => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
}

function applyTheme(theme) {
  if (theme === 'system') {
    const resolvedTheme = systemPrefersDark.matches ? 'dark' : 'light';
    root.dataset.theme = resolvedTheme;
  } else {
    root.dataset.theme = theme;
  }

  setActiveButton(theme);
}

const savedTheme = localStorage.getItem(storageKey);

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme('system');
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedMode = button.dataset.mode;

    localStorage.setItem(storageKey, selectedMode);
    applyTheme(selectedMode);
  });
});

systemPrefersDark.addEventListener('change', () => {
  const current = localStorage.getItem(storageKey);
  if (current === 'system') {
    applyTheme('system');
  }
});