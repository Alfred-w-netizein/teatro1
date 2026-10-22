import { createRouter } from './core/router.js';
import { loadProfile, saveProfile, clearProfile, updatePrefs, DEFAULT_PREFS } from './core/store.js';
import { escapeHtml, initials, toast, downloadDocument } from './core/ui.js';
import { getCharacter } from './data/characters.js';
import { getDocument } from './data/documents.js';

import { viewOnboarding } from './views/onboarding.js';
import { viewDashboard, viewCharacter } from './views/dashboard.js';
import { viewLibrary, viewScripts } from './views/library.js';
import { viewReader } from './views/reader.js';
import { viewSettings } from './views/settings.js';

const appEl = document.getElementById('app');
const sidebar = document.getElementById('sidebar');
const scrim = document.getElementById('scrim');
const menuBtn = document.getElementById('menuBtn');
const themeBtn = document.getElementById('themeBtn');
const sidebarFoot = document.getElementById('sidebarFoot');

let profile = loadProfile();

/* ---------------- Tema ---------------- */

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
}

applyTheme(profile?.prefs?.theme || 'dark');

themeBtn.addEventListener('click', () => {
  const next = (profile?.prefs?.theme === 'light') ? 'dark' : 'light';
  if (profile) updatePrefs({ theme: next });
  profile = loadProfile();
  applyTheme(next);
});

/* ---------------- Menu mobile ---------------- */

function setMenu(open) {
  sidebar.classList.toggle('is-open', open);
  scrim.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
}
menuBtn.addEventListener('click', () => setMenu(!sidebar.classList.contains('is-open')));
scrim.addEventListener('click', () => setMenu(false));

/* ---------------- Contexto compartilhado ---------------- */

const ctx = {
  get profile() { return profile; },
  toast,
  applyTheme,
  initialsOf: initials,
  enter({ name, characterId }) {
    const prefs = profile?.prefs || DEFAULT_PREFS;
    profile = saveProfile({ name, characterId, prefs });
    renderSidebar();
    router.go('/painel');
    toast(`Bem-vindo, ${name}.`, 'ok');
  },
  updatePrefs(patch) {
    profile = updatePrefs(patch);
    applyTheme(profile?.prefs?.theme || 'dark');
  },
  resetPrefs() {
    profile = updatePrefs({ ...DEFAULT_PREFS });
    applyTheme(DEFAULT_PREFS.theme);
  },
  clearAll() {
    clearProfile();
    profile = null;
    renderSidebar();
    router.go('/entrar');
  }
};

/* ---------------- Sidebar ---------------- */

function renderSidebar() {
  if (!profile) {
    sidebarFoot.innerHTML = '';
    return;
  }
  const char = getCharacter(profile.characterId);
  sidebarFoot.innerHTML = `
    <a class="profile-chip" href="#/configuracoes" title="Configurações do perfil">
      <span class="avatar">${escapeHtml(initials(profile.name))}</span>
      <span class="profile-chip__text">
        <strong>${escapeHtml(profile.name)}</strong>
        <span>${escapeHtml(char?.name || '')}</span>
      </span>
    </a>`;
}

function markActiveNav(name) {
  document.querySelectorAll('[data-route]').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.route === name);
  });
}

/* ---------------- Render ---------------- */

function render(route) {
  const publicRoutes = ['entrar'];

  if (!profile && !publicRoutes.includes(route.name)) {
    router.go('/entrar');
    return;
  }

  let view;

  switch (route.name) {
    case 'entrar': view = viewOnboarding(ctx); break;
    case 'personagem': view = viewCharacter(ctx); break;
    case 'roteiro': view = viewScripts(ctx); break;
    case 'biblioteca': view = viewLibrary(ctx); break;
    case 'ler': view = viewReader(ctx, route.param); break;
    case 'configuracoes': view = viewSettings(ctx); break;
    case 'painel':
    default: view = profile ? viewDashboard(ctx) : viewOnboarding(ctx); break;
  }

  appEl.innerHTML = view.html;
  document.title = `${view.title || 'Portal'} · Portal Teatral`;

  if (typeof view.mount === 'function') view.mount(appEl);

  markActiveNav(route.name === 'ler' ? 'biblioteca' : route.name);
  setMenu(false);
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

/* ---------------- Router ---------------- */

const router = createRouter(render);

/* ---------------- Download delegado ---------------- */

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-download]');
  if (!trigger) return;

  event.preventDefault();
  const doc = getDocument(trigger.dataset.download);
  if (!doc) { toast('Documento não encontrado no catálogo.', 'error'); return; }
  downloadDocument(doc, trigger);
});

/* ---------------- Boot ---------------- */

renderSidebar();
router.start();