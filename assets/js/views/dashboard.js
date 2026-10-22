import { getCharacter } from '../data/characters.js';
import {
  getIndividualDocuments, getGeneralDocuments, getDocument,
  categoryLabel, hasReadableContent
} from '../data/documents.js';
import { escapeHtml, initials } from '../core/ui.js';

export function viewDashboard(ctx) {
  const profile = ctx.profile;
  const character = getCharacter(profile.characterId);
  const individual = getIndividualDocuments(profile.characterId);
  const mainDoc = individual[0] || null;
  const general = getGeneralDocuments();
  const completeScript = general.find((d) => d.id === 'roteiro-completo');
  const others = general.filter((d) => d.id !== 'roteiro-completo');

  const docCard = (doc) => `
    <article class="doc-card">
      <div class="doc-card__head">
        <span class="badge badge--accent">${escapeHtml(doc.format.toUpperCase())}</span>
        <span class="badge">${escapeHtml(categoryLabel(doc.category))}</span>
      </div>
      <h3 class="doc-card__title">${escapeHtml(doc.title)}</h3>
      <p class="doc-card__sub">${escapeHtml(doc.subtitle || '')}</p>
      <p class="doc-card__meta">v${escapeHtml(doc.version || '1.0')}</p>
      <div class="doc-card__actions">
        ${doc.readable
      ? `<a class="btn btn--primary btn--sm" href="#/ler/${doc.id}">Ler texto</a>`
      : `<span class="badge badge--warn">Leitura indisponível</span>`}
        <button class="btn btn--ghost btn--sm" data-download="${doc.id}">Baixar</button>
      </div>
    </article>`;

  const html = `
  <section class="page-head">
    <p class="eyebrow">Seu espaço de trabalho teatral</p>
    <h1 class="page-title">Olá, ${escapeHtml(profile.name)}.</h1>
    <div class="page-sub">
      <span class="chip chip--accent">${escapeHtml(character?.name || '')}</span>
      <span>${escapeHtml(character?.role || '')}</span>
    </div>
  </section>

  <section class="section">
    <div class="section__head"><h2>Meu personagem</h2></div>
    <div class="card card--feature">
      <div class="feature__head">
        <span class="badge badge--accent">${escapeHtml(character?.name || '')}</span>
        ${mainDoc ? `<span class="badge">${escapeHtml(mainDoc.format.toUpperCase())}</span>` : ''}
      </div>
      <h2 class="feature__title">${escapeHtml(character?.name || '')}</h2>
      <p class="feature__role">${escapeHtml(character?.role || '')}</p>
      <p class="feature__desc">${escapeHtml(character?.blurb || '')}</p>

      ${mainDoc ? `
        <div class="feature__actions">
          ${mainDoc.readable
        ? `<a class="btn btn--primary" href="#/ler/${mainDoc.id}">Ler meu texto</a>`
        : ''}
          <button class="btn ${mainDoc.readable ? 'btn--ghost' : 'btn--primary'}" data-download="${mainDoc.id}">
            Baixar documento
          </button>
        </div>
        ${mainDoc.readable ? '' : `<p class="dim" style="margin-top:16px;font-size:13px;">${escapeHtml(mainDoc.note || '')}</p>`}
        <div class="meta-row">
          <span>${escapeHtml(mainDoc.title)}</span>
          <span>Versão ${escapeHtml(mainDoc.version || '1.0')}</span>
          <span>${escapeHtml(categoryLabel(mainDoc.category))}</span>
        </div>
      ` : `
        <p class="muted">O material individual deste personagem ainda não foi disponibilizado pela direção.</p>
      `}
    </div>
  </section>

  <section class="section">
    <div class="section__head">
      <h2>Roteiro completo</h2>
      <a href="#/roteiro">Ver todos os roteiros</a>
    </div>
    ${completeScript ? `
      <div class="card">
        <div class="feature__head">
          <span class="badge badge--accent">${escapeHtml(completeScript.format.toUpperCase())}</span>
          <span class="badge">Versão ${escapeHtml(completeScript.version || '1.0')}</span>
        </div>
        <h3 class="doc-card__title">${escapeHtml(completeScript.title)}</h3>
        <p class="doc-card__sub">${escapeHtml(completeScript.subtitle || '')}</p>
        <div class="row">
          <a class="btn btn--primary" href="#/ler/${completeScript.id}">Ler no navegador</a>
          <button class="btn btn--ghost" data-download="${completeScript.id}">Baixar original</button>
        </div>
      </div>` : '<p class="muted">Roteiro completo indisponível.</p>'}
  </section>

  <section class="section">
    <div class="section__head">
      <h2>Outros materiais</h2>
      <a href="#/biblioteca">Abrir biblioteca</a>
    </div>
    <div class="doc-grid">
      ${others.map(docCard).join('') || '<p class="muted">Nenhum material complementar publicado.</p>'}
    </div>
  </section>

  <section class="section">
    <div class="section__head"><h2>Acesso rápido</h2></div>
    <div class="row">
      ${mainDoc?.readable ? `<a class="btn btn--ghost btn--sm" href="#/ler/${mainDoc.id}">Meu texto</a>` : ''}
      <a class="btn btn--ghost btn--sm" href="#/ler/roteiro-completo">Roteiro completo</a>
      <a class="btn btn--ghost btn--sm" href="#/biblioteca">Biblioteca</a>
      <a class="btn btn--ghost btn--sm" href="#/configuracoes">Trocar personagem</a>
    </div>
  </section>`;

  return { html, mount: () => { }, title: 'Visão geral' };
}

export function viewCharacter(ctx) {
  const profile = ctx.profile;
  const character = getCharacter(profile.characterId);
  const docs = getIndividualDocuments(profile.characterId);

  const html = `
  <section class="page-head">
    <p class="eyebrow">Meu personagem</p>
    <h1 class="page-title">${escapeHtml(character?.name || '')}</h1>
    <div class="page-sub">
      <span>${escapeHtml(character?.role || '')}</span>
    </div>
  </section>

  <section class="section">
    <div class="card">
      <p class="feature__desc">${escapeHtml(character?.blurb || '')}</p>
      ${docs.length ? `
        <div class="doc-grid">
          ${docs.map((doc) => `
            <article class="doc-card">
              <div class="doc-card__head">
                <span class="badge badge--accent">${escapeHtml(doc.format.toUpperCase())}</span>
                <span class="badge">Versão ${escapeHtml(doc.version || '1.0')}</span>
              </div>
              <h3 class="doc-card__title">${escapeHtml(doc.title)}</h3>
              <p class="doc-card__sub">${escapeHtml(doc.subtitle || '')}</p>
              <div class="doc-card__actions">
                ${hasReadableContent(doc.id)
      ? `<a class="btn btn--primary btn--sm" href="#/ler/${doc.id}">Ler texto</a>`
      : '<span class="badge badge--warn">Leitura indisponível</span>'}
                <button class="btn btn--ghost btn--sm" data-download="${doc.id}">Baixar</button>
              </div>
            </article>`).join('')}
        </div>` : `
        <div class="empty-state">
          <h3>Material ainda não publicado</h3>
          <p>O texto individual deste personagem ainda não foi disponibilizado pela direção. Enquanto isso, consulte o roteiro completo.</p>
          <p style="margin-top:18px;"><a class="btn btn--primary btn--sm" href="#/ler/roteiro-completo">Abrir roteiro completo</a></p>
        </div>`}
    </div>
  </section>`;

  return { html, mount: () => { }, title: 'Meu personagem' };
}