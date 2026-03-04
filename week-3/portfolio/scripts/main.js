/*
Create a three-mode theme toggle system.
Requirements:
- Uses data-theme on <html>
- Modes: light, dark, system
- Save choice to localStorage
- On first visit detect prefers-color-scheme
- System mode updates live if OS changes
- No theme flashing on load
- No classList toggling
*/

const buttons = document.querySelectorAll('[data-mode]');
const root = document.documentElement;
const storageKey = 'theme';

// Detect system preference
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  if (theme === 'system') {
    root.dataset.theme = systemPrefersDark.matches ? 'dark' : 'light';
  } else {
    root.dataset.theme = theme;
  }
}

// Load saved theme
const savedTheme = localStorage.getItem(storageKey);

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme('system');
}

// Button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedMode = button.dataset.mode;

    localStorage.setItem(storageKey, selectedMode);
    applyTheme(selectedMode);
  });
});

// Live system updates (stretch goal ✔)
systemPrefersDark.addEventListener('change', () => {
  const current = localStorage.getItem(storageKey);
  if (current === 'system') {
    applyTheme('system');
  }
});