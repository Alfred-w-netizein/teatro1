import { fichas } from './content/fichas.js';
import { roteiros } from './content/roteiros.js';

/** Conteúdo textual para leitura no navegador (chaveado por id do documento). */
export const documentContents = { ...fichas, ...roteiros };

export const categories = [
  { id: 'personagem', label: 'Texto de personagem' },
  { id: 'roteiro', label: 'Roteiro completo' },
  { id: 'adaptado', label: 'Roteiro adaptado' }
];

/**
 * CATÁLOGO CENTRAL DE DOCUMENTOS
 * ---------------------------------------------------------------
 * Para adicionar/substituir um material:
 *  1. Coloque o arquivo original em /docs
 *  2. Ajuste ou acrescente um objeto abaixo
 *  3. Se quiser leitura no navegador, adicione o texto em
 *     data/content/fichas.js ou data/content/roteiros.js usando o mesmo id
 *  4. Vincule o personagem em data/characters.js (campo docIds)
 */
export const documents = [
  /* ---------------- Roteiros ---------------- */
  {
    id: 'roteiro-completo',
    title: 'Roteiro completo',
    subtitle: 'A Tropa e o Sertão — versão integral',
    category: 'roteiro',
    characterId: null,
    file: 'docs/ROTEIRO.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },
  {
    id: 'roteiro-sem-filha',
    title: 'Roteiro sem a Filha de Zé',
    subtitle: 'Versão adaptada — 7 a 11 atores',
    category: 'adaptado',
    characterId: null,
    file: 'docs/ROTEIRO-SEM-FILHA.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },
  {
    id: 'roteiro-sem-filha-regionalismo',
    title: 'Roteiro sem a Filha de Zé — com regionalismo',
    subtitle: 'Versão adaptada com fala regionalista ampliada',
    category: 'adaptado',
    characterId: null,
    file: 'docs/ROTEIRO-SEM-FILHA-MAIS-REGIONALISMO.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },

  /* ---------------- Textos individuais ---------------- */
  {
    id: 'lampiao',
    title: 'LAMPIÃO',
    subtitle: 'Ficha 2 — falas do personagem',
    category: 'personagem',
    characterId: 'lampiao',
    file: 'docs/LAMPIÃO.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },
  {
    id: 'maria-bonita',
    title: 'MARIA BONITA',
    subtitle: 'Ficha 3 — falas do personagem',
    category: 'personagem',
    characterId: 'maria-bonita',
    file: 'docs/MARIA.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },
  {
    id: 'corisco',
    title: 'CORISCO',
    subtitle: 'Ficha 4 — falas do personagem',
    category: 'personagem',
    characterId: 'corisco',
    file: 'docs/CORISCO.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },
  {
    id: 'dada',
    title: 'DADÁ',
    subtitle: 'Ficha 5 — falas do personagem',
    category: 'personagem',
    characterId: 'dada',
    file: 'docs/DÁDÁ.dotx',
    format: 'dotx',
    readable: false,
    downloadable: true,
    version: '1.0',
    updatedAt: null,
    note: 'Arquivo no formato .dotx (modelo do Word). A leitura no navegador não está disponível — baixe o original e abra no Word.'
  },
  {
    id: 'ze-de-dada',
    title: 'ZÉ DE DADÁ',
    subtitle: 'Ficha 6 — falas do personagem',
    category: 'personagem',
    characterId: 'ze-de-dada',
    file: 'docs/ZÉ.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },
  {
    id: 'filha-de-ze',
    title: 'FILHA DE ZÉ',
    subtitle: 'Ficha 7 — falas do personagem',
    category: 'personagem',
    characterId: 'filha-de-ze',
    file: 'docs/FILHA DE ZÉ.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },
  {
    id: 'volante-1',
    title: 'VOLANTE 1',
    subtitle: 'Ficha 8 — falas do personagem',
    category: 'personagem',
    characterId: 'volante-1',
    file: 'docs/VOLANTE 1.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },
  {
    id: 'volantes-2-3',
    title: 'VOLANTES 2 e 3',
    subtitle: 'Fichas 9 e 10 — personagens sem fala',
    category: 'personagem',
    characterId: 'volante-2',
    file: 'docs/VOLANTES2-3.docx',
    format: 'docx',
    readable: true,
    downloadable: true,
    version: '1.0',
    updatedAt: null
  },
  {
    id: 'narrador',
    title: 'NARRADOR',
    subtitle: 'Ficha 1 — falas do personagem',
    category: 'personagem',
    characterId: 'narrador',
    file: 'docs/NARRADOR.dotx',
    format: 'dotx',
    readable: false,
    downloadable: true,
    version: '1.0',
    updatedAt: null,
    note: 'Arquivo no formato .dotx (modelo do Word). A leitura no navegador não está disponível — baixe o original e abra no Word.'
  }
];

/* ---------- Relação personagem → documentos ---------- */

export const characterDocuments = {
  lampiao: ['lampiao'],
  'maria-bonita': ['maria-bonita'],
  corisco: ['corisco'],
  dada: ['dada'],
  'ze-de-dada': ['ze-de-dada'],
  'filha-de-ze': ['filha-de-ze'],
  narrador: ['narrador'],
  'volante-1': ['volante-1'],
  'volante-2': ['volantes-2-3'],
  'volante-3': ['volantes-2-3']
};

/* ---------- Consultas ---------- */

export function getDocument(id) {
  return documents.find((d) => d.id === id) || null;
}

export function getDocumentsByCategory(categoryId) {
  return documents.filter((d) => d.category === categoryId);
}

export function getIndividualDocuments(characterId) {
  const ids = characterDocuments[characterId] || [];
  return ids.map(getDocument).filter(Boolean);
}

export function getGeneralDocuments() {
  return documents.filter((d) => d.category !== 'personagem');
}

export function categoryLabel(categoryId) {
  return categories.find((c) => c.id === categoryId)?.label || 'Documento';
}

export function hasReadableContent(id) {
  const doc = getDocument(id);
  return Boolean(doc && doc.readable && documentContents[id]);
}