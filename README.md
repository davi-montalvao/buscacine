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
  globalIgnores(['dist']),
  {
    # BuscaCine

    BuscaCine é uma plataforma para buscar e descobrir filmes, séries e atores usando a API do TMDB.

    **Resumo rápido**
    - Busca por título com paginação.
    - Filtro opcional por ano de lançamento.
    - Modal com detalhes do filme (sinopse, duração, nota).
    - Imagens de pôster carregadas via CDN do TMDB.

    **Tecnologias**
    - React + TypeScript + Vite

    **Pré-requisitos**
    - Node.js (>=16) e npm
    - Chave de API do The Movie Database (TMDB)

    **Como configurar**
    1. Crie uma chave no TMDB: https://www.themoviedb.org/
    2. Copie a chave e crie um arquivo `.env` na raiz do projeto com o conteúdo:

    ```
    VITE_TMDB_API_KEY=SEU_TOKEN_AQUI
    ```

    3. Instale dependências e rode o servidor de desenvolvimento (PowerShell):

    ```powershell
    npm install
    npm run dev
    ```

    4. Abra `http://localhost:5173` no navegador.

    **Comandos úteis**
    - Desenvolvimento: `npm run dev`
    - Build produção: `npm run build`
    - Preview do build: `npm run preview`

    **Notas**
    - Nunca comite arquivos que contenham chaves reais (o `.env` está listado em `.gitignore`). Use o arquivo `.env.example` como referência.
    - Se o Vite estiver rodando, reinicie o servidor ao alterar o `.env` para que as variáveis sejam recarregadas.

    Copyright © 2025 | Feito com amor 💜 e persistência 🚀
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
