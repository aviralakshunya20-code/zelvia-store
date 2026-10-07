// js/router.js - Screen router using hash navigation (Chapter 3.5)

const listeners = {}; // id -> function that runs when screen is displayed

export function on(id, fn){
  listeners[id] = fn;
}

export function go(hash){
  // Map cross-page tool targets to real URLs
  const path = window.location.pathname;
  if (hash === '#tool' && !path.includes('/ruler/')) {
    window.location.href = '/ruler/';
    return;
  }
  if (hash === '#fit' && !path.includes('/fit-checker/')) {
    window.location.href = '/fit-checker/';
    return;
  }
  if (hash === '#daily' && !path.includes('/daily/')) {
    window.location.href = '/daily/';
    return;
  }
  if (hash.startsWith('#world') && !path.includes('/play/')) {
    window.location.href = '/play/' + hash;
    return;
  }
  if (hash === '#play' && !path.includes('/play/')) {
    window.location.href = '/play/';
    return;
  }
  if (hash === '#home' && path !== '/' && path !== '/index.html') {
    window.location.href = '/';
    return;
  }

  if (location.hash !== hash) location.hash = hash;
  else render();
}

function render(){
  const screens = [...document.querySelectorAll('main > section')];
  if (!screens.length) return;

  let full = location.hash.slice(1);
  if (!full) {
    const defaultScreen = screens.find(s => !s.hidden) || screens[0];
    full = defaultScreen.id.replace(/^s-/, '');
  }
  const [name, arg] = full.split('/');
  const id = 's-' + name;

  let target = document.getElementById(id);
  if (!target) {
    target = screens.find(s => !s.hidden) || screens[0];
    if (!target) {
      window.location.href = '/';
      return;
    }
  }

  screens.forEach(s => { s.hidden = (s !== target); });
  target.classList.remove('enter');
  void target.offsetWidth;
  target.classList.add('enter');
  if (listeners[target.id]) listeners[target.id](arg);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);

export function start(){
  render();
}
