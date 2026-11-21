(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const interactive = 'button, a, [role="button"], .project-card[data-open-case], .all-project-card[data-open-case]';
  document.addEventListener('click', event => {
    const target = event.target.closest(interactive);
    if (!target) return;
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
})();
