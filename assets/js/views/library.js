import { documents, categories, categoryLabel, getDocument } from '../data/documents.js';
import { characters, getCharacter } from '../data/characters.js';
import { escapeHtml } from '../core/ui.js';

export function viewLibrary() {
  const html = `
  <section class="page-head">
    <p class="eyebrow">Biblioteca</p>
    <h1 class="page-title">Todos os documentos</h1>
    <p class="page-sub"><span id="resultCount">${documents.length}</span> materiais disponíveis</p>
  </section>

  <div class="toolbar">
    <div class="field search-field" style="flex:2 1 260px;">
      <label for="q">Buscar</label>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input class="input" id="q" type="search" placeholder="Nome do arquivo, personagem, categoria…" autocomplete="off">
    </div>
    <div class="field">
      <label for="fCat">Categoria</label>
      <select class="select" id="fCat">
        <option value="">Todas</option>
        ${categories.map((c) => `<option value="${c.id}">${escapeHtml(c.label)}</option>`).join('')}
      </select>
    </div>
    <div class="field">
      <label for="fChar">Personagem</label>
      <select class="select" id="fChar">
        <option value="">Todos</option>
        ${characters.map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('')}
      </select>
    </div>
    <div class="field">
      <label for="fSort">Ordenar</label>
      <select class="select" id="fSort">
        <option value="title">Nome (A–Z)</option>
        <option value="title-desc">Nome (Z–A)</option>
        <option value="category">Categoria</option>
      </select>
    </div>
  </div>

  <div class="list" id="docList"></div>
  <div class="empty-state" id="emptyState" hidden>
    <h3>Nenhum documento encontrado</h3>
    <p>Ajuste a busca ou os filtros para localizar o material desejado.</p>
  </div>`;

  function mount(root) {
    const list = root.querySelector('#docList');
    const empty = root.querySelector('#emptyState');
    const count = root.querySelector('#resultCount');
    const q = root.querySelector('#q');
    const fCat = root.querySelector('#fCat');
    const fChar = root.querySelector('#fChar');
    const fSort = root.querySelector('#fSort');

    function render() {
      const term = q.value.trim().toLowerCase();
      const cat = fCat.value;
      const char = fChar.value;

      let items = documents.filter((doc) => {
        if (cat && doc.category !== cat) return false;
        if (char && doc.characterId !== char) return false;
        if (term) {
          const charName = doc.characterId ? (getCharacter(doc.characterId)?.name || '') : '';
          const haystack = `${doc.title} ${doc.subtitle || ''} ${categoryLabel(doc.category)} ${charName}`.toLowerCase();
          if (!haystack.includes(term)) return false;
        }
        return true;
      });

      if (fSort.value === 'title-desc') items = items.sort((a, b) => b.title.localeCompare(a.title, 'pt-BR'));
      else if (fSort.value === 'category') items = items.sort((a, b) => categoryLabel(a.category).localeCompare(categoryLabel(b.category), 'pt-BR') || a.title.localeCompare(b.title, 'pt-BR'));
      else items = items.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));

      count.textContent = String(items.length);
      empty.hidden = items.length > 0;

      list.innerHTML = items.map((doc) => {
        const charName = doc.characterId ? getCharacter(doc.characterId)?.name : null;
        return `
          <article class="list-item">
            <div>
              <h3 class="list-item__title">
                ${escapeHtml(doc.title)}
                <span class="badge badge--accent">${escapeHtml(doc.format.toUpperCase())}</span>
                ${doc.readable ? '' : '<span class="badge badge--warn">Leitura indisponível</span>'}
              </h3>
              <p class="list-item__meta">
                <span>${escapeHtml(categoryLabel(doc.category))}</span>
                ${charName ? `<span>${escapeHtml(charName)}</span>` : ''}
                <span>v${escapeHtml(doc.version || '1.0')}</span>
                <span>${escapeHtml(doc.file.split('/').pop())}</span>
              </p>
            </div>
            <div class="list-item__actions">
              ${doc.readable ? `<a class="btn btn--primary btn--sm" href="#/ler/${doc.id}">Ler</a>` : ''}
              <button class="btn btn--ghost btn--sm" data-download="${doc.id}">Baixar</button>
            </div>
          </article>`;
      }).join('');
    }

    [q, fCat, fChar, fSort].forEach((el) => el.addEventListener('input', render));
    render();
  }

  return { html, mount, title: 'Biblioteca' };
}

export function viewScripts() {
  const scripts = documents.filter((d) => d.category === 'roteiro' || d.category === 'adaptado');

  const html = `
  <section class="page-head">
    <p class="eyebrow">Roteiro completo</p>
    <h1 class="page-title">Versões da peça</h1>
    <p class="page-sub">Leia no navegador ou baixe o arquivo original.</p>
  </section>

  <section class="section">
    <div class="doc-grid">
      ${scripts.map((doc) => `
        <article class="doc-card">
          <div class="doc-card__head">
            <span class="badge badge--accent">${escapeHtml(doc.format.toUpperCase())}</span>
            <span class="badge">${escapeHtml(categoryLabel(doc.category))}</span>
          </div>
          <h3 class="doc-card__title">${escapeHtml(doc.title)}</h3>
          <p class="doc-card__sub">${escapeHtml(doc.subtitle || '')}</p>
          <p class="doc-card__meta">Versão ${escapeHtml(doc.version || '1.0')}</p>
          <div class="doc-card__actions">
            <a class="btn btn--primary btn--sm" href="#/ler/${doc.id}">Ler no navegador</a>
            <button class="btn btn--ghost btn--sm" data-download="${doc.id}">Baixar</button>
          </div>
        </article>`).join('')}
    </div>
  </section>`;

  return { html, mount: () => { }, title: 'Roteiro completo' };
}