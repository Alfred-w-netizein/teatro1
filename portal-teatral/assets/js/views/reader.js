import { findDocument } from "../data/documents.js";
import { escapeHtml } from "../core/markup.js";

export function readerView(id) {
  const document = findDocument(decodeURIComponent(id || ""));
  if (!document) {
    return `
      <section class="reader">
        <p class="eyebrow">Biblioteca</p>
        <h1>Material não encontrado</h1>
        <p class="lead">Este conteúdo não está disponível ou o endereço está incorreto.</p>
        <a class="button" href="#/library">Voltar à biblioteca</a>
      </section>
    `;
  }

  return `
    <article class="reader">
      <a class="tag" href="#/library">← Biblioteca</a>
      <p class="eyebrow" style="margin-top:24px">${escapeHtml(document.category)}</p>
      <h1>${escapeHtml(document.title)}</h1>
      <p class="lead">${escapeHtml(document.description)}</p>
      <hr style="border:0;border-top:1px solid var(--line);margin:28px 0">
      <div class="reader-copy">${escapeHtml(document.content)}</div>
    </article>
  `;
}
