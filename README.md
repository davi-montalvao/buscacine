# 🎬 BuscaCine

BuscaCine é uma plataforma para buscar e descobrir filmes, séries e atores usando a API do TMDB.

🔗 Demo: [buscacine-xi.vercel.app](https://buscacine-xi.vercel.app)

## Descrição

BuscaCine permite pesquisar por título, navegar por filmes populares e ver detalhes (sinopse, duração, nota). Também é possível filtrar resultados por ano de lançamento.

## Principais funcionalidades

Busca por título com paginação, filtro por ano (opcional), modal com detalhes do filme (sinopse, duração, nota média) e carregamento de pôsteres via CDN do TMDB.

## Tecnologias

React + TypeScript, com Vite como bundler e dev server.

## Pré-requisitos

Node.js (recomendado >= 16), npm e uma chave de API do The Movie Database (TMDB).

## Como configurar localmente

Obtenha uma chave de API no [TMDB](https://www.themoviedb.org/). Na raiz do projeto, crie um arquivo `.env` com a variável:

```text
VITE_TMDB_API_KEY=SEU_TOKEN_AQUI
```

Depois, instale as dependências e rode o projeto:

```bash
npm install
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Comandos úteis

Desenvolvimento: `npm run dev`. Build de produção: `npm run build`. Visualizar build: `npm run preview`.

## Boas práticas

Não comite o arquivo `.env` com sua chave real (ele já está no `.gitignore`). Use `.env.example` como referência das variáveis necessárias.

## Licença / Créditos

Os dados e imagens são fornecidos pelo [The Movie Database (TMDB)](https://www.themoviedb.org/). Consulte as condições de uso da API no site oficial.

---

Copyright © 2025 | Feito com 💜 e persistência 🚀
