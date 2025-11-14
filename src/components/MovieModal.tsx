import { IMAGE_BASE } from '../api/tmdb'

type Details = {
  id: number
  title: string
  overview?: string
  poster_path?: string | null
  release_date?: string
  vote_average?: number
  runtime?: number
}

export default function MovieModal({ movie, onClose }: { movie: Details | null; onClose: () => void }) {
  if (!movie) return null

  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : undefined
  const isCompact = !movie.overview || movie.overview.trim().length === 0

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className={`modal ${isCompact ? 'modal--compact' : ''}`}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
        <div className="modal-body">
          {poster ? <img src={poster} alt={movie.title} className="modal-poster" /> : <div className="poster-placeholder">Sem imagem</div>}
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <p className="meta">{movie.release_date} • {movie.runtime ? `${movie.runtime} min` : '—'} • Nota: {movie.vote_average ?? '—'}</p>
            {movie.overview && movie.overview.trim().length > 0 && (
              <p className="overview">{movie.overview}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
