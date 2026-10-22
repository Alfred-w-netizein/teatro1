import { characters, getCharacter } from '../data/characters.js';
import { escapeHtml } from '../core/ui.js';

export function viewOnboarding(ctx) {
  const profile = ctx.profile;
  const prefillName = profile?.name || '';
  const prefillChar = profile?.characterId || '';

  const html = `
  <section class="onboarding">
    <p class="eyebrow">${profile ? 'Alterar perfil' : 'Primeiro acesso'}</p>
    <h1 class="onboarding__title">Seu palco começa aqui.</h1>
    <p class="onboarding__sub">Acesse seus textos, consulte o roteiro completo e prepare sua próxima cena.</p>

    <form id="onboardingForm" novalidate>
      <div class="form-row">
        <label for="nome">Seu nome</label>
        <input class="input" id="nome" name="nome" type="text" autocomplete="name"
               placeholder="Como você quer ser chamado" maxlength="60"
               value="${escapeHtml(prefillName)}" required>
      </div>

      <div class="form-row">
        <label for="buscaPersonagem">Personagem que você interpreta</label>
        <div class="search-field">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input class="input" id="buscaPersonagem" type="search" placeholder="Buscar personagem…" autocomplete="off">
        </div>
        <div class="char-grid" id="charGrid" role="radiogroup" aria-label="Personagens disponíveis">
          ${characters.map((c) => `
            <button type="button" class="char-option" role="radio"
                    aria-checked="${c.id === prefillChar}"
                    data-character="${c.id}">
              <strong>${escapeHtml(c.name)}</strong>
              <span>${escapeHtml(c.role)}</span>
            </button>`).join('')}
        </div>
        <p class="dim" id="charFeedback" style="font-size:12.5px;margin-top:6px;">
          ${prefillChar ? `Selecionado: ${escapeHtml(getCharacter(prefillChar)?.name || '')}` : 'Nenhum personagem selecionado.'}
        </p>
      </div>

      <div class="row">
        <button class="btn btn--primary" type="submit">Entrar no meu espaço</button>
        ${profile ? '<a class="btn btn--ghost" href="#/painel">Cancelar</a>' : ''}
      </div>
    </form>
  </section>`;

  function mount(root) {
    let selected = prefillChar;

    const grid = root.querySelector('#charGrid');
    const feedback = root.querySelector('#charFeedback');
    const search = root.querySelector('#buscaPersonagem');

    grid.addEventListener('click', (event) => {
      const option = event.target.closest('[data-character]');
      if (!option) return;
      selected = option.dataset.character;
      grid.querySelectorAll('[data-character]').forEach((btn) => {
        btn.setAttribute('aria-checked', String(btn === option));
      });
      feedback.textContent = `Selecionado: ${getCharacter(selected)?.name || ''}`;
    });

    search.addEventListener('input', () => {
      const term = search.value.trim().toLowerCase();
      grid.querySelectorAll('[data-character]').forEach((btn) => {
        const char = getCharacter(btn.dataset.character);
        const haystack = `${char.name} ${char.role}`.toLowerCase();
        btn.hidden = Boolean(term) && !haystack.includes(term);
      });
    });

    root.querySelector('#onboardingForm').addEventListener('submit', (event) => {
      event.preventDefault();

      const name = root.querySelector('#nome').value.trim();

      if (!name) { ctx.toast('Informe seu nome para continuar.', 'error'); root.querySelector('#nome').focus(); return; }
      if (!selected) { ctx.toast('Escolha o personagem que você interpreta.', 'error'); return; }

      ctx.enter({ name, characterId: selected });
    });

    root.querySelector('#nome')?.focus({ preventScroll: true });
  }

  return { html, mount, title: 'Entrar' };
}