import { IMAGE_BASE, getWatchProvidersCached as getWatchProviders } from '../api/tmdb'
import { useEffect, useRef, useState } from 'react'

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
  const movieId = movie.id

  const [visible, setVisible] = useState(false)
  const [providers, setProviders] = useState<any | null>(null)
  const [providersLoading, setProvidersLoading] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  useEffect(() => {
    // play open animation
    const t = setTimeout(() => setVisible(true), 10)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseRequest()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // fetch watch providers for this movie
  useEffect(() => {
    let mounted = true
    async function loadProviders() {
      try {
        setProvidersLoading(true)
        const data = await getWatchProviders(movieId)
        if (!mounted) return
        setProviders(data || null)
      } catch (err) {
        console.error('Failed to load providers', err)
        if (mounted) setProviders(null)
      } finally {
        if (mounted) setProvidersLoading(false)
      }
    }
    loadProviders()
    return () => { mounted = false }
  }, [movie.id])

  // when providers load, set default selected country
  useEffect(() => {
    if (!providers) return
    const results = providers.results || {}
    const userLang = navigator.language || 'pt-BR'
    const countryGuess = userLang.includes('-') ? userLang.split('-')[1].toUpperCase() : 'BR'
    const defaultCountry = results[countryGuess] ? countryGuess : Object.keys(results)[0] || null
    setSelectedCountry(defaultCountry)
  }, [providers])

  // Custom country dropdown component (searchable, fixed height)
  function CountryDropdown({ countries, value, onChange }: { countries: string[]; value: string | null; onChange: (c: string) => void }) {
    const [open, setOpen] = useState(false)
    const [q, setQ] = useState('')
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      function onDoc(e: MouseEvent) {
        if (!ref.current) return
        if (!ref.current.contains(e.target as Node)) setOpen(false)
      }
      document.addEventListener('click', onDoc)
      return () => document.removeEventListener('click', onDoc)
    }, [])

    const filtered = countries.filter(c => {
      if (!q) return true
      return c.toLowerCase().includes(q.toLowerCase())
    })

    return (
      <div className="country-dropdown" ref={ref}>
        <button type="button" className="country-dropdown-toggle" onClick={() => setOpen(s => !s)} aria-haspopup="listbox" aria-expanded={open}>
          {value || 'Selecionar...'}
          <span className="caret">▾</span>
        </button>
        {open && (
          <div className="country-dropdown-panel">
            <input className="country-search" placeholder="Pesquisar país..." value={q} onChange={(e) => setQ(e.target.value)} />
            <div role="listbox" className="country-dropdown-list">
              {filtered.map(c => {
                let name = c
                try {
                  // @ts-ignore
                  const dn = new Intl.DisplayNames(['pt-BR'], { type: 'region' })
                  name = dn.of(c) || c
                } catch (_) { name = c }
                return (
                  <button key={c} type="button" className="country-dropdown-item" onClick={() => { onChange(c); setOpen(false); setQ('') }}>
                    {name} ({c})
                  </button>
                )
              })}
              {filtered.length === 0 && <div className="country-empty">Nenhum país encontrado</div>}
            </div>
          </div>
        )}
      </div>
    )
  }


  // lock body scroll while modal is open (preserve scroll position)
  const scrollYRef = useRef<number | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // save current scroll
    const scrollY = window.scrollY || document.documentElement.scrollTop
    scrollYRef.current = scrollY

    // apply lock
    const body = document.body
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    // prevent touchmove on iOS background but allow touch inside the modal
    const prevent = (e: TouchEvent) => {
      const target = e.target as Node | null
      // if the touch event started inside the modal, allow it (so modal can scroll)
      if (modalRef.current && target && modalRef.current.contains(target)) {
        return
      }
      e.preventDefault()
    }
    document.addEventListener('touchmove', prevent, { passive: false })

    return () => {
      // restore body styles and scroll position
      document.removeEventListener('touchmove', prevent)
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.width = ''
      body.style.overflow = ''

      if (scrollYRef.current !== null) {
        window.scrollTo(0, scrollYRef.current)
        scrollYRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCloseRequest = () => {
    // start closing animation
    setVisible(false)
  }

  const handleOverlayClick = () => handleCloseRequest()
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // when overlay/modal finished hiding, call onClose to unmount
    if (!visible && e.propertyName === 'opacity') {
      onClose()
    }
  }

  return (
    <div className={`modal-overlay ${visible ? 'is-open' : 'is-closing'}`} role="dialog" aria-modal="true" onClick={handleOverlayClick} onTransitionEnd={handleTransitionEnd}>
      <div ref={modalRef} className={`modal ${isCompact ? 'modal--compact' : ''} ${visible ? 'is-open' : 'is-closing'}`} onClick={stopPropagation}>
        <button className="modal-close" onClick={handleCloseRequest} aria-label="Fechar">×</button>
        <div className="modal-body">
          {poster ? <img src={poster} alt={movie.title} className="modal-poster" /> : <div className="poster-placeholder">Sem imagem</div>}
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <p className="meta">{movie.release_date} • {movie.runtime ? `${movie.runtime} min` : '—'} • Nota: {movie.vote_average ?? '—'}</p>
            {movie.overview && movie.overview.trim().length > 0 && (
              <p className="overview">{movie.overview}</p>
            )}
            {/* Onde assistir */}
            <div className="watch-section">
              <h3>Onde assistir</h3>
              {providersLoading && <p className="muted">Carregando opções...</p>}
              {!providersLoading && providers && (() => {
                const results = providers.results || {}
                const countries = Object.keys(results)
                if (countries.length === 0) return <p className="muted">Nenhuma informação disponível.</p>

                const country = selectedCountry || countries[0]
                const data = results[country]
                if (!data) return <p className="muted">Nenhuma informação disponível.</p>

                const categories: Array<[string,string]> = [['flatrate','Streaming'], ['ads','Com anúncios'], ['rent','Aluguel'], ['buy','Compra']]

                return (
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Região:</label>
                      <CountryDropdown countries={countries} value={country} onChange={(c) => setSelectedCountry(c)} />
                    </div>

                    <div className="watch-grid">
                      {categories.map(([key,label]) => {
                        const arr = (data as any)[key]
                        if (!arr || arr.length === 0) return null
                        return (
                          <div key={key} className="watch-category">
                            <strong className="watch-label">{label}</strong>
                            <div className="watch-items">
                              {arr.map((p: any) => (
                                <a key={p.provider_id} className="watch-item" href={data.link || `https://www.themoviedb.org/movie/${movieId}`} target="_blank" rel="noreferrer">
                                  {p.logo_path ? <img src={`https://image.tmdb.org/t/p/w92${p.logo_path}`} alt={p.provider_name} /> : <span>{p.provider_name}</span>}
                                  <span className="watch-name">{p.provider_name}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
