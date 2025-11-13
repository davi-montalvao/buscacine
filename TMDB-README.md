# BuscaCine — instruções de uso

1. Obtenha uma chave de API no site do TMDB: https://www.themoviedb.org/
2. Crie um arquivo `.env` na raiz do projeto com a variável:

```
VITE_TMDB_API_KEY=SUA_CHAVE_AQUI
```

3. Instale dependências e rode em modo dev (PowerShell):

```powershell
npm install
npm run dev
```

4. Abra `http://localhost:5173` no navegador.

Observação: este exemplo busca filmes populares por padrão e permite pesquisar por título. Não exponha sua chave em repositórios públicos.

Copyright © 2025 | Feito com amor 💜 e persistência 🚀
