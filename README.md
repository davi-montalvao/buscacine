# React + TypeScript + Vite

Este template fornece uma configuração mínima para iniciar um projeto React com Vite, incluindo HMR (Hot Module Replacement) e algumas regras de ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

@vitejs/plugin-react – utiliza Babel (ou oxc quando usado com rolldown-vite) para Fast Refresh.

@vitejs/plugin-react-swc – utiliza SWC para Fast Refresh.

## React Compiler

O React Compiler não está habilitado neste template devido ao impacto no desempenho durante o desenvolvimento e o build.
Para adicioná-lo, consulte a documentação oficial:
https://react.dev/learn/react-compiler/installation

## Expandindo a configuração do ESLint

Se você estiver desenvolvendo uma aplicação para produção, recomenda-se atualizar a configuração para habilitar regras de lint com reconhecimento de tipos (type-aware lint rules).

```js
export default defineConfig([
  # BuscaCine

  BuscaCine é uma plataforma para buscar e descobrir filmes, séries e atores usando a API do TMDB.

  Descrição
  ---------

  BuscaCine permite pesquisar por título, navegar por filmes populares e ver detalhes (sinopse, duração, nota). Também é possível filtrar resultados por ano de lançamento.

  Principais funcionalidades
  - Busca por título (com paginação)
  - Filtro por ano (opcional)
  - Modal com detalhes do filme (sinopse, duração, nota média)
  - Carregamento de pôsteres via CDN do TMDB

  Tecnologias
  -----------

  - React + TypeScript
  - Vite como bundler e dev server

  Pré-requisitos
  --------------

  - Node.js (recomendado >= 16)
  - npm
  - Chave de API do The Movie Database (TMDB)

  Como configurar localmente
  --------------------------

  1. Obtenha uma chave de API no TMDB: https://www.themoviedb.org/
  2. Na raiz do projeto, crie um arquivo `.env` com a variável:

  ```text
  VITE_TMDB_API_KEY=SEU_TOKEN_AQUI
  ```

  3. Instale dependências e rode o projeto (PowerShell):

  ```powershell
  npm install
  npm run dev
  ```

  4. Abra `http://localhost:5173` no navegador.

  Comandos úteis
  ---------------

  - Desenvolvimento: `npm run dev`
  - Build (produção): `npm run build`
  - Visualizar build: `npm run preview`

  Boas práticas / Observações
  ---------------------------

  - Não comite o arquivo `.env` com a sua chave real (o `.env` está listado em `.gitignore`).
  - Use `.env.example` como referência para variáveis necessárias.

Fontes customizadas
-------------------

Se você quer usar a fonte `Mangueira` no projeto, coloque os arquivos de fonte (`.woff2`) em `public/fonts/` com os nomes:

- `Mangueira-Regular.woff2`
- `Mangueira-Bold.woff2`

O projeto já inclui a declaração `@font-face` no CSS para carregar esses arquivos automaticamente. Se preferir, substitua os arquivos por versões diferentes ou altere os nomes no CSS (`src/App.css`).
  - Depois de alterar o `.env`, reinicie o Vite para que as variáveis de ambiente sejam recarregadas.

  Licença / Créditos
  ------------------

  Os dados e imagens são fornecidos pelo The Movie Database (TMDB). Consulte as condições de uso da API no site oficial.

  Copyright © 2025 | Feito com amor 💜 e persistência 🚀
