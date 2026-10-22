# Portal Teatral — A Tropa e o Sertão

Portal privado de consulta e distribuição dos documentos da produção teatral
**"A Tropa e o Sertão"**.

## O que está pronto

- Configuração inicial (nome + personagem) com busca de personagens.
- Painel personalizado por personagem, com persistência em `localStorage`.
- Biblioteca completa com busca instantânea, filtros por categoria e personagem e ordenação.
- Leitor interno com o **conteúdo real** dos textos, tipografia de leitura,
  controle de tamanho, largura de coluna e alternância de tema.
- Downloads dos arquivos originais com verificação de existência no servidor.
- Layout responsivo (desktop, tablet e celular), navegação por teclado e foco visível.
- Catálogo central de documentos — nenhum caminho de arquivo espalhado pelo código.

## Como executar localmente

O projeto usa **ES Modules**, que exigem um servidor HTTP (não abrem via `file://`).

```bash
# na raiz do projeto
python3 -m http.server 8000
# ou
npx serve .