/** Cadastro de personagens da produção. Fonte única de verdade. */

export const characters = [
  {
    id: 'lampiao',
    name: 'Lampião',
    role: 'O líder da tropa',
    blurb: 'Virgulino Ferreira da Silva. Firme, calmo, nunca grita — o medo dele é silencioso.'
  },
  {
    id: 'maria-bonita',
    name: 'Maria Bonita',
    role: 'A companheira de Lampião',
    blurb: 'A mais corajosa da tropa — fala na cara de qualquer um.'
  },
  {
    id: 'corisco',
    name: 'Corisco',
    role: 'O mais agressivo da tropa',
    blurb: 'Vive desconfiado, mas é leal ao capitão.'
  },
  {
    id: 'dada',
    name: 'Dadá',
    role: 'Cangaceiro da tropa',
    blurb: 'Jovem e assustado, mas presente até o fim.'
  },
  {
    id: 'ze-de-dada',
    name: 'Zé de Dadá',
    role: 'O sertanejo',
    blurb: 'Pobre, mas orgulhoso. A consciência da peça.'
  },
  {
    id: 'filha-de-ze',
    name: 'Filha de Zé',
    role: 'A filha do sertanejo',
    blurb: 'Poucas falas, mas é ela quem anuncia o perigo.'
  },
  {
    id: 'narrador',
    name: 'Narrador',
    role: 'A voz que conduz a história',
    blurb: 'Entra em cena nas mudanças de tempo e na emboscada.'
  },
  {
    id: 'volante-1',
    name: 'Volante 1',
    role: 'O chefe da volante',
    blurb: 'Brutal, impaciente, mas com um momento de respeito no fim.'
  },
  {
    id: 'volante-2',
    name: 'Volante 2',
    role: 'Soldado da volante',
    blurb: 'Não tem falas — presença e postura valem mais que fala.'
  },
  {
    id: 'volante-3',
    name: 'Volante 3',
    role: 'Soldado da volante',
    blurb: 'Não tem falas — presença e postura valem mais que fala.'
  }
];

export function getCharacter(id) {
  return characters.find((c) => c.id === id) || null;
}