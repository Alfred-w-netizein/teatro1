/** Roteador baseado em hash — funciona em qualquer servidor estático. */

export function createRouter(onChange) {
  function current() {
    const raw = location.hash.replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean);
    return {
      name: parts[0] || 'painel',
      param: parts[1] || null,
      parts
    };
  }

  function handle() {
    onChange(current());
  }

  window.addEventListener('hashchange', handle);

  return {
    start() { handle(); },
    current,
    go(path) {
      const next = path.startsWith('#') ? path : `#/${path.replace(/^\/?/, '')}`;
      if (location.hash === next) handle();
      else location.hash = next;
    }
  };
}