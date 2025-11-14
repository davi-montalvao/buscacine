const BASE = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

function ensureKey() {
  if (!API_KEY) throw new Error('VITE_TMDB_API_KEY não definido. Crie um arquivo .env com a chave.')
}

async function fetchFrom(path: string, params: Record<string, any> = {}) {
  ensureKey()
  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'pt-BR')
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
  })

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
  return res.json()
}

export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

export async function getPopular(page = 1) {
  return fetchFrom('/movie/popular', { page })
}

export async function searchMovies(query: string, page = 1) {
  return fetchFrom('/search/movie', { query, page })
}

export async function getMovieDetails(id: number) {
  return fetchFrom(`/movie/${id}`)
}

export async function getWatchProviders(id: number) {
  return fetchFrom(`/movie/${id}/watch/providers`)
}

export default { getPopular, searchMovies, getMovieDetails, getWatchProviders }
