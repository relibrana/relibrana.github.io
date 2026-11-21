(() => {
  const initial = localStorage.getItem('liliana-lang') === 'es' ? 'es' : 'en';
  const staticCopy = new Map([
    ['COMMUNITY / LATAM', 'COMUNIDAD / LATAM'],
    ['SANDA / 2024—NOW', 'SANDA / 2024—ACTUALIDAD'],
    ['SANDA is a nonprofit community founded in Peru in February 2024. It helps emerging game developers navigate scattered information, meet peers in a closer and more human way, and access talks, workshops, showcases, game jams, scholarships and networking opportunities.', 'SANDA es una comunidad sin fines de lucro fundada en Perú en febrero de 2024. Ayuda a desarrolladores emergentes de videojuegos a navegar información dispersa, conocer colegas de una manera más cercana y humana, y acceder a charlas, talleres, showcases, game jams, becas y oportunidades de networking.'],
    ['✦︎ Global Game Jam Community Partner', '✦︎ Community Partner de Global Game Jam'],
    ['01 / SANDA LEADERSHIP', '01 / LIDERAZGO EN SANDA'],
    ['Founder, President & Event Coordinator', 'Fundadora, presidenta y coordinadora de eventos'],
    ['I guide SANDA’s mission and vision, represent the organization at Latin American events, make collaboration decisions with the Core Team, lead event work and supervise research, social-media and graphic-design areas.', 'Guío la misión y visión de SANDA, represento a la organización en eventos de Latinoamérica, tomo decisiones de colaboración con el Core Team, lidero el trabajo de eventos y superviso las áreas de research, redes sociales y diseño gráfico.'],
    ['main team members', 'integrantes principales del equipo'],
    ['Showcasing games, then making room for the people behind them', 'Mostrando videojuegos y dando espacio a quienes están detrás de ellos'],
    ['Pixel Play was SANDA’s first initiative. I lead ideation and event planning, venue search, sponsors and partnerships, studio outreach, volunteer coordination, marketing, budget and logistics. In Peru I lead most operational work with the events team; local representatives lead the corresponding work in their countries.', 'Pixel Play fue la primera iniciativa de SANDA. Lidero la ideación y planificación del evento, búsqueda de sede, sponsors y alianzas, contacto con estudios, coordinación de voluntariado, marketing, presupuesto y logística. En Perú lidero la mayor parte del trabajo operativo con el equipo de eventos; representantes locales lideran el trabajo correspondiente en sus países.'],
    ['Developer surveys are private. They ask whether events supported wishlists, playtests, new-mechanic feedback, followers and community feedback; no private responses or causal results are published here.', 'Las encuestas a desarrolladores son privadas. Preguntan si los eventos apoyaron wishlists, playtests, feedback de nuevas mecánicas, seguidores y feedback de comunidad; aquí no se publican respuestas privadas ni resultados causales.'],
    ['The first SANDA activity.', 'La primera actividad de SANDA.'],
    ['Included a highlighted space for games led by women or majority-women teams.', 'Incluyó un espacio destacado para juegos liderados por mujeres o equipos de mayoría de mujeres.'],
    ['A bigger local showcase with studios, teams and players sharing the space.', 'Un showcase local más grande con estudios, equipos y jugadores compartiendo el espacio.'],
    ['PIXEL PLAY / 2026—NOW', 'PIXEL PLAY / 2026—ACTUALIDAD'],
    ['Pixel Play grew from local showcases in Lima into a route designed with local communities across Latin America. Each country adapts the format to its own audience, venue and ecosystem.', 'Pixel Play creció desde showcases locales en Lima hacia una ruta diseñada con comunidades locales de Latinoamérica. Cada país adapta el formato a su audiencia, sede y ecosistema.'],
    ['Upcoming event', 'Próximo evento'],
    ['A format focused on trying games and creating direct connections between developers and players.', 'Un formato centrado en probar juegos y crear conexiones directas entre desarrolladores y jugadores.'],
    ['SPONSORS & COLLABORATORS', 'SPONSORS Y COLABORADORES'],
    ['Three editions, one growing practice', 'Tres ediciones, una práctica que sigue creciendo'],
    ['I organize volunteers and the team, coordinate allies and sponsors, design registration forms and handle general coordination.', 'Organizo al voluntariado y al equipo, coordino aliados y sponsors, diseño formularios de inscripción y llevo la coordinación general.'],
    ['In person · Toulouse Lautrec · ~30 jammers', 'Presencial · Toulouse Lautrec · ~30 jammers'],
    ['Pre-Game Jam playlist ↗︎', 'Playlist Pre-Game Jam ↗︎'],
    ['Online · ~200 jammers', 'Online · ~200 jammers'],
    ['Awards ceremony ↗︎', 'Ceremonia de premiación ↗︎'],
    ['Online · almost 400 jammers', 'Online · casi 400 jammers'],
    ['2026 SPONSORS & COLLABORATORS', 'SPONSORS Y COLABORADORES 2026'],
    ['03 / SANDA CONNECT', '03 / SANDA CONNECT'],
    ['Educational events with direct access to speakers', 'Eventos educativos con acceso directo a speakers'],
    ['A circuit of in-person talks for people entering the industry: specialized subjects alongside accessible introductions, direct interaction and Q&A.', 'Un circuito de charlas presenciales para personas que están entrando a la industria: temas especializados junto a introducciones accesibles, interacción directa y preguntas y respuestas.'],
    ['Open PUCP with Game Devs PUCP · 9 talks · 20 attendees · two sessions in parallel', 'Open PUCP con Game Devs PUCP · 9 charlas · 20 asistentes · dos sesiones en paralelo'],
    ['I define themes, curate and contact speakers, coordinate universities and partners, design programming, coordinate the team and run logistics. I also gave a UX Research talk in 2026.', 'Defino temas, curo y contacto speakers, coordino universidades y aliados, diseño la programación, coordino al equipo y llevo la logística. También di una charla de UX Research en 2026.'],
    ['Opening doors without deciding who walks through them', 'Abriendo puertas sin decidir quién las cruza'],
    ['I seek partnerships, prepare proposals and applications, design calls and forms, and manage applications. I am not part of scholarship evaluation committees.', 'Busco alianzas, preparo propuestas y postulaciones, diseño convocatorias y formularios, y gestiono postulaciones. No formo parte de los comités de evaluación de becas.'],
    ['4 in-person + 4 virtual places', '4 cupos presenciales + 4 virtuales'],
    ['3 in-person places', '3 cupos presenciales'],
    ['8 in-person places announced', '8 cupos presenciales anunciados'],
    ['05 / OTHER VOLUNTEER ROLES', '05 / OTROS ROLES DE VOLUNTARIADO'],
    ['Different communities, different ways of showing up', 'Comunidades distintas, distintas formas de aportar'],
    ['Women in Games Ambassador', 'Embajadora de Women in Games'],
    ['Visit Women in Games ↗︎', 'Visitar Women in Games ↗︎'],
    ['Global Game Jam · Community Engagement Intern', 'Global Game Jam · Practicante de Community Engagement'],
    ['Visit Global Game Jam ↗︎', 'Visitar Global Game Jam ↗︎'],
    ['Unreal Engine Lima · Community Manager & Event Coordinator', 'Unreal Engine Lima · Community Manager y coordinadora de eventos'],
    ['Visit Unreal Engine Lima ↗︎', 'Visitar Unreal Engine Lima ↗︎'],
    ['Made with care, a little chaos & lots of pink. © 2026 Liliana Bravo.', 'Hecho con cariño, un poco de caos y mucho rosa. © 2026 Liliana Bravo.'],
    ['Back to top ↑', 'Volver arriba ↑']
  ]);
  function applyStaticCommunityCopy(lang) {
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
    applyStaticCommunityCopy(lang);
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
