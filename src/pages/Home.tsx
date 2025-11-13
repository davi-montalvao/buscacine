import React, { useEffect, useState } from 'react'
import tmdb from '../api/tmdb'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'

type Movie = {
  id: number
  title: string
  poster_path: string | null
  release_date?: string
  vote_average?: number
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [details, setDetails] = useState<any | null>(null)
  const [yearFilter, setYearFilter] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPopular(1)
  }, [])

  async function fetchPopular(p = 1) {
    try {
      setLoading(true)
      setError(null)
      const data = await tmdb.getPopular(p)
      setMovies(data.results || [])
      setTotalPages(data.total_pages ?? null)
      setPage(p)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(e?: React.FormEvent, p = 1) {
    if (e) e.preventDefault()
    if (!query) return fetchPopular()
    try {
      setLoading(true)
      setError(null)
      const data = await tmdb.searchMovies(query, p)
      // apply optional year filter client-side
      let results = data.results || []
      if (yearFilter) {
        results = results.filter((m: any) => m.release_date?.startsWith(yearFilter))
      }
      setMovies(results)
      setTotalPages(data.total_pages ?? null)
      setPage(p)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  async function openDetails(id: number) {
    setSelected(id)
    try {
      setLoading(true)
      setError(null)
      const d = await tmdb.getMovieDetails(id)
      setDetails(d)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  function closeModal() {
    setSelected(null)
    setDetails(null)
  }

  return (
    <section className="home">
      <form className="search" onSubmit={(e) => handleSearch(e, 1)} role="search">
        <input
          placeholder="Buscar filmes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar filmes"
        />
        <input
          placeholder="Ano (opcional)"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="year-filter"
          aria-label="Filtrar por ano"
        />
        <div className="search-actions">
          <button type="submit">Buscar</button>
          <button type="button" onClick={() => { setQuery(''); setYearFilter(''); fetchPopular(1) }}>Limpar</button>
        </div>
      </form>

      {loading && <p className="loading">Carregando...</p>}
      {error && (
        <div className="error-box" role="alert">
          <strong>Erro:</strong> {error}
          <div className="error-actions">Verifique se você criou um arquivo <code>.env</code> com <code>VITE_TMDB_API_KEY</code>.</div>
        </div>
      )}

      <div className="movies-grid">
        {movies.length === 0 && !loading && <p>Nenhum resultado.</p>}
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} onClick={openDetails} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => {
          const p = Math.max(1, page - 1)
          if (query) handleSearch(undefined, p)
          else fetchPopular(p)
        }} disabled={page <= 1}>Anterior</button>
        <span> Página {page}{totalPages ? ` de ${totalPages}` : ''} </span>
        <button onClick={() => {
          const p = page + 1
          if (totalPages && p > totalPages) return
          if (query) handleSearch(undefined, p)
          else fetchPopular(p)
        }} disabled={!!totalPages && page >= (totalPages || 0)}>Próxima</button>
      </div>

      {details && <MovieModal movie={details} onClose={closeModal} />}
    </section>
  )
}
