/*
  Robust theme toggle script.
  - Supports both dropdown-based controls and inline `.theme-toggle` buttons
  - Safe guards against missing DOM elements so script won't throw
  - Persists selection to localStorage
*/

const root = document.documentElement;
const storageKey = 'theme';
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const dropdown = document.querySelector('.theme-dropdown');
const trigger = document.querySelector('.dropdown-trigger');
const themeToggle = document.querySelector('.theme-toggle');
const selectedIconContainer = document.querySelector('.selected-icon');

function updateSelectedIcon(mode) {
  if (!selectedIconContainer) return;
  const activeButton = document.querySelector(`[data-mode="${mode}"]`);
  if (!activeButton) return;
  
  const svg = activeButton.querySelector('svg');
  
  selectedIconContainer.innerHTML = '';
  
  if (svg) {
    selectedIconContainer.appendChild(svg.cloneNode(true));
  } else {
    // fallback: show text label
    selectedIconContainer.textContent = mode;
  }
}

function applyTheme(theme) {
  let resolvedTheme = theme === 'system'
    ? (systemPrefersDark.matches ? 'dark' : 'light')
    : theme;

  root.dataset.theme = resolvedTheme;
  updateSelectedIcon(theme);
  // update active button states
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === theme);
    btn.setAttribute('aria-pressed', btn.dataset.mode === theme ? 'true' : 'false');
  });
}

// initialize
const savedTheme = localStorage.getItem(storageKey) || 'system';
applyTheme(savedTheme);

// Helper to wire up a NodeList of buttons
function wireButtons(buttons) {
  if (!buttons) return;
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedMode = button.dataset.mode;
      if (!selectedMode) return;
      localStorage.setItem(storageKey, selectedMode);
      applyTheme(selectedMode);

      // close dropdown if present
      if (dropdown && trigger) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// If a dropdown-based UI exists, wire it up
if (trigger && dropdown) {
  const menuButtons = dropdown.querySelectorAll('[data-mode]');
  // ensure accessible attributes
  trigger.setAttribute('aria-expanded', 'false');
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    dropdown.classList.toggle('open');
  });
  dropdown.addEventListener('click', (e) => {
    const button = e.target.closest('[data-mode]');
    if (!button) return;

    const selectedMode = button.dataset.mode;

    localStorage.setItem(storageKey, selectedMode);
    applyTheme(selectedMode);

    dropdown.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  });
}

// Otherwise, if a simple inline theme toggle exists, use that
else if (themeToggle) {
  const buttons = themeToggle.querySelectorAll('button[data-mode]');
  wireButtons(buttons);
}

// react to system preference changes when stored preference is 'system'
systemPrefersDark.addEventListener('change', () => {
  const current = localStorage.getItem(storageKey) || 'system';
  if (current === 'system') {
    applyTheme('system');
  }
});