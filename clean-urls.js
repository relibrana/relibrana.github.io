(() => {
  const { pathname, search, hash } = window.location;
  if (!/\.html$/i.test(pathname)) return;
  const cleanPath = pathname.replace(/(?:^|\/)index\.html$/i, '/').replace(/\.html$/i, '/');
  window.history.replaceState(null, '', cleanPath + search + hash);
})();
