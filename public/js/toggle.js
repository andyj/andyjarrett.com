(() => {
  'use strict';

  // Add 'active' class to the currently selected theme button
  const showActiveTheme = (theme) => {
    document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {
      console.log(element.getAttribute('data-bs-theme-value'))
      if (element.getAttribute('data-bs-theme-value') === theme) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  };

  // Your existing theme toggle logic
  const getStoredTheme = () => localStorage.getItem('theme');
  const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  };

  setTheme(getPreferredTheme());
  showActiveTheme(getStoredTheme() || 'auto');

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme());
    }
  });

  document.querySelectorAll('[data-bs-theme-value]').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const theme = toggle.getAttribute('data-bs-theme-value');
      setStoredTheme(theme);
      setTheme(theme);
      showActiveTheme(theme);
    });
  });
})();
