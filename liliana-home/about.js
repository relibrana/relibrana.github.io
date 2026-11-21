(() => {
  const initial = localStorage.getItem('liliana-lang') === 'es' ? 'es' : 'en';
  const setLanguage = lang => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
      const value = el.getAttribute('data-' + lang);
      if (/<[a-z][\s\S]*>/i.test(value)) el.innerHTML = value;
      else el.textContent = value;
    });
    document.querySelectorAll('[data-lang]').forEach(button => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    localStorage.setItem('liliana-lang', lang);
  };
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  const menu = document.getElementById('menuButton');
  const links = document.getElementById('navLinks');
  menu.addEventListener('click', () => { const open = links.classList.toggle('is-open'); menu.setAttribute('aria-expanded', String(open)); });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { links.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }));
  setLanguage(initial);
})();
