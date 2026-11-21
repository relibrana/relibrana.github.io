(() => {
  const symbols = {
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.8 14.8 9.2 22.2 12l-7.4 2.8L12 22.2l-2.8-7.4L1.8 12l7.4-2.8Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.3S3 15 3 8.8C3 5.9 5.1 4 7.7 4c1.7 0 3.3.9 4.3 2.3C13 4.9 14.6 4 16.3 4 18.9 4 21 5.9 21 8.8c0 6.2-9 11.5-9 11.5Z"/></svg>',
    flower: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.1C8.9 3.2 3.6 2.5 3.5 6.1c-.1 2.7 2.3 4.1 4.7 4.6-2.4.5-4.8 1.9-4.7 4.6.1 3.6 5.4 2.9 8.5-2 .2 5.8 4.2 8.8 6.4 6 1.7-2.2-.3-4.9-2.4-6 2.4.5 5.3-.2 5.4-3 .1-3.7-5.1-4.2-9.4-2.2Z"/></svg>'
  };
  const patterns = [
    { regex: /✳︎?|✦︎?/g, type: 'spark' },
    { regex: /↗︎?/g, type: 'arrow' },
    { regex: /♡︎?|♥︎?/g, type: 'heart' },
    { regex: /✿︎?/g, type: 'flower' }
  ];
  const shouldSkip = node => node.parentElement?.closest('script,style,svg,.ui-symbol');
  function replaceIn(node) {
    if (!node.nodeValue || shouldSkip(node)) return;
    let value = node.nodeValue;
    if (!patterns.some(({ regex }) => { regex.lastIndex = 0; return regex.test(value); })) return;
    const fragment = document.createDocumentFragment();
    while (value.length) {
      let match = null;
      let index = Infinity;
      let type = '';
      patterns.forEach(item => {
        item.regex.lastIndex = 0;
        const found = item.regex.exec(value);
        if (found && found.index < index) { match = found; index = found.index; type = item.type; }
      });
      if (!match) { fragment.append(value); break; }
      if (index) fragment.append(value.slice(0, index));
      const icon = document.createElement('span');
      icon.className = 'ui-symbol ui-symbol--' + type;
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = symbols[type];
      fragment.append(icon);
      value = value.slice(index + match[0].length);
    }
    node.replaceWith(fragment);
  }
  function normalizeSymbols(scope = document.body) {
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceIn);
  }
  normalizeSymbols();
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) replaceIn(node);
    else if (node.nodeType === Node.ELEMENT_NODE && !node.matches('script,style,.ui-symbol')) normalizeSymbols(node);
  }))).observe(document.body, { childList: true, subtree: true });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const interactive = 'button, a, [role="button"], .project-card[data-open-case], .all-project-card[data-open-case]';
  document.addEventListener('click', event => {
    if (!event.target.closest(interactive)) return;
    const colors = ['#df477d', '#d5ef39', '#d7c5ff', '#ffc9dc'];
    for (let index = 0; index < 6; index += 1) {
      const sparkle = document.createElement('span');
      const angle = (Math.PI * 2 * index) / 6 + (Math.random() - .5) * .35;
      const distance = 22 + Math.random() * 28;
      sparkle.className = 'kawaii-sparkle';
      sparkle.style.left = event.clientX + 'px';
      sparkle.style.top = event.clientY + 'px';
      sparkle.style.setProperty('--spark-x', Math.cos(angle) * distance + 'px');
      sparkle.style.setProperty('--spark-y', Math.sin(angle) * distance + 'px');
      sparkle.style.setProperty('--spark-color', colors[index % colors.length]);
      document.body.appendChild(sparkle);
      sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true });
    }
  }, { passive: true });
  // A small, page-wide flower wipe makes internal navigation feel intentional.
  // It is built from CSS shapes rather than emoji so it stays consistent on iOS.
  const transitionKey = 'relibrana-flower-transition';
  const flowerColors = ['#df477d', '#d5ef39', '#d7c5ff', '#ffc9dc', '#8fdaef'];
  const makeFlowerWipe = mode => {
    const layer = document.createElement('div');
    layer.className = `flower-wipe flower-wipe--${mode}`;
    layer.setAttribute('aria-hidden', 'true');
    for (let index = 0; index < 26; index += 1) {
      const flower = document.createElement('i');
      flower.className = 'flower-wipe__flower';
      flower.style.setProperty('--flower-x', `${4 + Math.random() * 92}%`);
      flower.style.setProperty('--flower-y', `${3 + Math.random() * 94}%`);
      flower.style.setProperty('--flower-size', `${26 + Math.random() * 62}px`);
      flower.style.setProperty('--flower-delay', `${Math.random() * 220}ms`);
      flower.style.setProperty('--flower-turn', `${-35 + Math.random() * 70}deg`);
      flower.style.setProperty('--flower-color', flowerColors[index % flowerColors.length]);
      layer.append(flower);
    }
    document.body.append(layer);
    return layer;
  };
  const leaveWithFlowers = destination => {
    const wipe = makeFlowerWipe('enter');
    sessionStorage.setItem(transitionKey, 'true');
    window.setTimeout(() => { window.location.assign(destination); }, 540);
    return wipe;
  };
  if (sessionStorage.getItem(transitionKey)) {
    sessionStorage.removeItem(transitionKey);
    const wipe = makeFlowerWipe('leave');
    wipe.addEventListener('animationend', () => wipe.remove(), { once: true });
  }
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.target || link.hasAttribute('download')) return;
    if (link.closest('[data-open-case]')) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || !/^https?:$/.test(destination.protocol)) return;
    const current = new URL(window.location.href);
    if (destination.pathname === current.pathname && destination.search === current.search) return;
    event.preventDefault();
    leaveWithFlowers(destination.href);
  }, true);
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      const wipe = makeFlowerWipe('leave');
      wipe.addEventListener('animationend', () => wipe.remove(), { once: true });
    }
  });
})();
