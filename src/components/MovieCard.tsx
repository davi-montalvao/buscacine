import React from 'react'
import { IMAGE_BASE } from '../api/tmdb'

type Movie = {
  id: number
  title: string
  poster_path: string | null
  release_date?: string
  vote_average?: number
}

export default function MovieCard({ movie, onClick }: { movie: Movie; onClick: (id: number) => void }) {
  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : undefined

  return (
    <button className="movie-card" onClick={() => onClick(movie.id)} aria-label={movie.title}>
      {poster ? <img src={poster} alt={movie.title} /> : <div className="poster-placeholder">Sem imagem</div>}
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="meta">
          <span>{movie.release_date ? movie.release_date.slice(0, 4) : '—'}</span>
          <span className="rating">{movie.vote_average ? movie.vote_average.toFixed(1) : '—'}</span>
        </div>
      </div>
    </button>
  )
}
