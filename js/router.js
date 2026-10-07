// js/router.js - Screen router using hash navigation (Chapter 3.5)

const listeners = {}; // id -> function that runs when screen is displayed

export function on(id, fn){
  listeners[id] = fn;
}

export function go(hash){
  if (location.hash !== hash) location.hash = hash;
  else render();
}

function render(){
  const full = location.hash.slice(1) || 'splash';
  const [name, arg] = full.split('/');
  const id = 's-' + name;
  const screens = [...document.querySelectorAll('main > section')];
  const target = document.getElementById(id);
  if (!target) return go('#home');
  screens.forEach(s => { s.hidden = (s !== target); });
  target.classList.remove('enter');
  void target.offsetWidth;
  target.classList.add('enter');
  if (listeners[id]) listeners[id](arg);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);

export function start(){
  render();
}
