const dropdown = document.querySelector('.theme-dropdown');
const trigger = document.querySelector('.dropdown-trigger');
const menuButtons = document.querySelectorAll('.dropdown-menu [data-mode]');
const root = document.documentElement;
const storageKey = 'theme';
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const selectedIconContainer = document.querySelector('.selected-icon');

function updateSelectedIcon(mode) {
  const activeButton = document.querySelector(`[data-mode="${mode}"]`);
  if (!activeButton) return;

  const icon = activeButton.querySelector('svg').cloneNode(true);
  selectedIconContainer.innerHTML = '';
  selectedIconContainer.appendChild(icon);
}

function applyTheme(theme) {
  let resolvedTheme = theme;

  if (theme === 'system') {
    resolvedTheme = systemPrefersDark.matches ? 'dark' : 'light';
  }

  root.dataset.theme = resolvedTheme;
  updateSelectedIcon(theme);
}

const savedTheme = localStorage.getItem(storageKey);

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme('system');
}

trigger.addEventListener('click', () => {
  const expanded = trigger.getAttribute('aria-expanded') === 'true';
  trigger.setAttribute('aria-expanded', !expanded);
  dropdown.classList.toggle('open');
});

menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedMode = button.dataset.mode;
    localStorage.setItem(storageKey, selectedMode);
    applyTheme(selectedMode);

    dropdown.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  });
});

systemPrefersDark.addEventListener('change', () => {
  const current = localStorage.getItem(storageKey);
  if (current === 'system') {
    applyTheme('system');
  }
});