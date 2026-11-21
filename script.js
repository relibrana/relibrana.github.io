(() => {
  const initial = localStorage.getItem('liliana-lang') === 'es' ? 'es' : 'en';
  const translations = document.querySelectorAll('[data-en][data-es]');
  const staticCopy = new Map([
    ['Game Director', 'Directora de videojuegos'],
    ['Community Leader', 'Líder de comunidad'],
    ['UX + GAMES + PEOPLE', 'UX + JUEGOS + PERSONAS'],
    ['LatAm-first', 'Primero LatAm'],
    ['Filter projects', 'Filtrar proyectos']
  ]);
  function applyStaticCopy(lang) {
    const lookup = lang === 'es' ? staticCopy : new Map([...staticCopy].map(([en, es]) => [es, en]));
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const text = node.nodeValue;
      const trimmed = text.trim();
      const replacement = lookup.get(trimmed);
      if (replacement) node.nodeValue = text.replace(trimmed, replacement);
    });
  }
  function setLanguage(lang) {
    document.documentElement.lang = lang;
    translations.forEach(el => {
      const val = el.getAttribute('data-' + lang);
      if (/<[a-z][\s\S]*>/i.test(val)) el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-lang]').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    localStorage.setItem('liliana-lang', lang);
    document.querySelector('.nav').setAttribute('aria-label', lang === 'es' ? 'Navegación principal' : 'Primary navigation');
    document.getElementById('harumiButton')?.setAttribute('aria-label', lang === 'es' ? 'Acariciar a Harumi' : 'Pet Harumi');
    document.querySelector('[aria-label="Filter projects"]')?.setAttribute('aria-label', lang === 'es' ? 'Filtrar proyectos' : 'Filter projects');
    applyStaticCopy(lang);
  }
  document.querySelectorAll('[data-lang]').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
  setLanguage(initial);

  document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
    const category = btn.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(other => {
      const active = other === btn;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('is-hidden', category !== 'all' && !card.dataset.category.split(' ').includes(category));
    });
  }));
  document.querySelector('[data-filter="all"]')?.setAttribute('aria-pressed','true');

  const menu = document.getElementById('menuButton');
  const navLinks = document.getElementById('navLinks');
  menu?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
  }));

  const harumi = document.getElementById('harumiButton');
  const emitter = document.getElementById('heartEmitter');
  let hearts = 0;
  harumi?.addEventListener('click', () => {
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart-pop';
      heart.textContent = i === 1 ? '♥︎' : '♡︎';
      heart.style.left = (38 + i * 12) + '%';
      heart.style.setProperty('--drift', ((i - 1) * 45) + 'px');
      heart.style.animationDelay = (i * 95) + 'ms';
      emitter.appendChild(heart);
      heart.addEventListener('animationend', () => heart.remove(), {once:true});
    }
    hearts++;
    if (hearts % 5 === 0) {
      harumi.animate([{transform:'rotate(7deg)'},{transform:'rotate(-6deg) scale(1.07)'},{transform:'rotate(7deg)'}], {duration:400});
    }
  });
})();
