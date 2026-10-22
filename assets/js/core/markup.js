import { escapeHtml } from './ui.js';

/**
 * Mini-markup usado nos arquivos de conteúdo (data/content/*.js):
 *
 *   # Título            -> h2
 *   ## Seção            -> h3 (rótulo de cena, em caixa alta)
 *   ### Subseção        -> h4
 *   > rubrica           -> parágrafo de rubrica (itálico)
 *   **NOME:** fala      -> bloco de fala (NOME em caixa alta)
 *   - item              -> lista
 *   ---                 -> separador
 *   *texto*             -> ênfase
 *
 * O nome do personagem só é reconhecido quando escrito em CAIXA ALTA,
 * evitando que linhas como "**Quem é:**" virem fala.
 */

const SPEECH_RE = /^\*\*([A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ0-9][A-ZÁÀÂÃÉÊÍÓÔÕÚÜÇ0-9 \-]*?):\*\*\s*(.*)$/;

function inline(text) {
  return escapeHtml(text).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

export function renderMarkup(source) {
  const lines = String(source).replace(/\r\n/g, '\n').trim().split('\n');
  const out = [];
  let paragraph = [];
  let list = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      out.push(`<ul>${list.map((li) => `<li>${inline(li)}</li>`).join('')}</ul>`);
      list = [];
    }
  };

  const flushAll = () => { flushParagraph(); flushList(); };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) { flushAll(); continue; }
    if (line === '---') { flushAll(); out.push('<hr>'); continue; }

    if (line.startsWith('#### ')) { flushAll(); out.push(`<h4>${inline(line.slice(5))}</h4>`); continue; }
    if (line.startsWith('### ')) { flushAll(); out.push(`<h4>${inline(line.slice(4))}</h4>`); continue; }
    if (line.startsWith('## ')) { flushAll(); out.push(`<h3>${inline(line.slice(3))}</h3>`); continue; }
    if (line.startsWith('# ')) { flushAll(); out.push(`<h2>${inline(line.slice(2))}</h2>`); continue; }

    if (line.startsWith('> ')) { flushAll(); out.push(`<p class="stage">${inline(line.slice(2))}</p>`); continue; }

    if (line.startsWith('- ')) { flushParagraph(); list.push(line.slice(2)); continue; }

    const speech = line.match(SPEECH_RE);
    if (speech) {
      flushAll();
      out.push(
        `<p class="speech"><span class="speech__who">${escapeHtml(speech[1])}</span>${inline(speech[2])}</p>`
      );
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushAll();
  return out.join('\n');
}