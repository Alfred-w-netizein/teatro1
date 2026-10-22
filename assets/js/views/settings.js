import { getCharacter } from '../data/characters.js';
import { getIndividualDocuments } from '../data/documents.js';
import { escapeHtml } from '../core/ui.js';

export function viewSettings(ctx) {
  const profile = ctx.profile;
  const character = getCharacter(profile.characterId);
  const docs = getIndividualDocuments(profile.characterId);

  const html = `
  <section class="page-head">
    <p class="eyebrow">Configurações</p>
    <h1 class="page-title">Seu perfil</h1>
    <p class="page-sub">Preferências salvas apenas neste navegador.</p>
  </section>

  <section class="section">
    <div class="card">
      <h2 style="font-size:16px;margin-bottom:18px;">Perfil atual</h2>
      <div class="profile-chip" style="max-width:360px;">
        <span class="avatar">${escapeHtml(ctx.initialsOf(profile.name))}</span>
        <span class="profile-chip__text">
          <strong>${escapeHtml(profile.name)}</strong>
          <span>${escapeHtml(character?.name || '')}</span>
        </span>
      </div>

      <div class="divider"></div>

      <div class="stack-16">
        <div class="row">
          <a class="btn btn--primary" href="#/entrar">Trocar personagem</a>
          <button class="btn btn--ghost" id="resetPrefs" type="button">Restaurar preferências de leitura</button>
          <button class="btn btn--ghost" id="clearData" type="button">Apagar meus dados deste navegador</button>
        </div>
        <p class="dim" style="font-size:12.5px;">
          Documentos vinculados: ${docs.length ? docs.map((d) => escapeHtml(d.title)).join(', ') : 'nenhum material individual publicado'}.
        </p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="card">
      <h2 style="font-size:16px;margin-bottom:14px;">Privacidade</h2>
      <p class="muted" style="font-size:14px;max-width:64ch;">
        A seleção de personagem é uma preferência de navegação, não uma autenticação.
        Se os roteiros forem confidenciais, é necessário publicar o portal atrás de um sistema
        de login e proteger os arquivos no servidor.
      </p>
    </div>
  </section>`;

  function mount(root) {
    root.querySelector('#resetPrefs').addEventListener('click', () => {
      ctx.resetPrefs();
      ctx.toast('Preferências de leitura restauradas.', 'ok');
    });

    root.querySelector('#clearData').addEventListener('click', () => {
      if (confirm('Apagar seu nome e personagem deste navegador? Você voltará à tela inicial.')) {
        ctx.clearAll();
      }
    });
  }

  return { html, mount, title: 'Configurações' };
}