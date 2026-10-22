/** Utilitários de interface compartilhados. */

export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

export function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
}

export function toast(message, type = 'info', duration = 4200) {
  const stack = document.getElementById('toasts');
  if (!stack) return;

  const node = document.createElement('div');
  node.className = `toast${type === 'error' ? ' toast--error' : type === 'ok' ? ' toast--ok' : ''}`;
  node.textContent = message;
  stack.appendChild(node);

  setTimeout(() => {
    node.style.opacity = '0';
    node.style.transition = 'opacity .2s ease';
    setTimeout(() => node.remove(), 220);
  }, duration);
}

/* Cache de verificação de existência dos arquivos em /docs */
const availability = new Map();

export function fileExists(url) {
  if (availability.has(url)) return availability.get(url);

  const promise = fetch(encodeURI(url), { method: 'HEAD' })
    .then((res) => res.ok)
    .catch(() => false);

  availability.set(url, promise);
  return promise;
}

export async function downloadDocument(doc, trigger) {
  if (!doc.downloadable) {
    toast('Este documento não está disponível para download.', 'error');
    return;
  }

  const original = trigger ? trigger.textContent : null;
  if (trigger) { trigger.disabled = true; trigger.textContent = 'Verificando…'; }

  const exists = await fileExists(doc.file);

  if (trigger) {
    trigger.disabled = false;
    trigger.textContent = original;
  }

  if (!exists) {
    toast(`Arquivo não encontrado no servidor: ${doc.file.split('/').pop()}. Coloque o original na pasta "docs/".`, 'error', 6500);
    return;
  }

  const a = document.createElement('a');
  a.href = encodeURI(doc.file);
  a.download = doc.file.split('/').pop();
  document.body.appendChild(a);
  a.click();
  a.remove();
}