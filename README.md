# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

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
  - Depois de alterar o `.env`, reinicie o Vite para que as variáveis de ambiente sejam recarregadas.

  Licença / Créditos
  ------------------

  Os dados e imagens são fornecidos pelo The Movie Database (TMDB). Consulte as condições de uso da API no site oficial.

  Copyright © 2025 | Feito com amor 💜 e persistência 🚀
