/**
 * Persistência de preferências no navegador.
 * ATENÇÃO: localStorage NÃO é autenticação. Serve apenas para
 * personalizar a experiência neste navegador/perfil.
 */

const STORAGE_KEY = 'portal-teatral:perfil:v1';

export const DEFAULT_PREFS = Object.freeze({
  theme: 'dark',       // 'dark' | 'light'
  fontSize: 2,         // índice 0..4
  measure: 'media'     // 'estreita' | 'media' | 'ampla'
});

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw);
    if (!data || typeof data.name !== 'string' || typeof data.characterId !== 'string') {
      return null;
    }
    if (!data.name.trim() || !data.characterId.trim()) return null;

    return {
      name: data.name,
      characterId: data.characterId,
      prefs: { ...DEFAULT_PREFS, ...(data.prefs || {}) },
      createdAt: data.createdAt || null
    };
  } catch (err) {
    console.warn('[store] Perfil inválido no localStorage. Retornando à configuração inicial.', err);
    return null;
  }
}

export function saveProfile(profile) {
  const payload = {
    name: profile.name,
    characterId: profile.characterId,
    prefs: { ...DEFAULT_PREFS, ...(profile.prefs || {}) },
    createdAt: profile.createdAt || new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export function updatePrefs(patch) {
  const profile = loadProfile();
  if (!profile) return null;
  profile.prefs = { ...profile.prefs, ...patch };
  saveProfile(profile);
  return profile;
}

export function clearProfile() {
  localStorage.removeItem(STORAGE_KEY);
}