(() => {
  const initial = localStorage.getItem('liliana-lang') === 'es' ? 'es' : 'en';
  const setLanguage = lang => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en][data-es]').forEach(el => {
      const value = el.getAttribute('data-' + lang);
      if (['H1', 'H2', 'H3'].includes(el.tagName)) el.innerHTML = value;
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

  const pixelPlayBrand = document.querySelector('.pixelplay-brand');
  pixelPlayBrand?.addEventListener('click', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = pixelPlayBrand.getBoundingClientRect();
    const source = 'assets/community/pixel-play-star.png';
    for (let index = 0; index < 8; index += 1) {
      const star = document.createElement('img');
      const angle = (Math.PI * 2 * index) / 8 + (Math.random() - .5) * .3;
      const distance = 65 + Math.random() * 65;
      star.className = 'pixelplay-spark';
      star.src = source;
      star.alt = '';
      star.style.setProperty('--spark-x', Math.cos(angle) * distance + 'px');
      star.style.setProperty('--spark-y', Math.sin(angle) * distance + 'px');
      star.style.setProperty('--spark-turn', (Math.random() * 160 - 80) + 'deg');
      star.style.left = (rect.left + rect.width / 2) + 'px';
      star.style.top = (rect.top + rect.height / 2) + 'px';
      document.body.appendChild(star);
      star.addEventListener('animationend', () => star.remove(), { once: true });
    }
  });
})();
