import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <div id="root">
      <header className="app-header">
        <h1>BuscaCine</h1>
        <p className="subtitle">Busque filmes usando a API do The Movie Database (TMDB)</p>
      </header>
      <main>
        <Home />
      </main>
      <footer className="app-footer">Powered by TMDB • exemplo educacional</footer>
    </div>
  )
}

export default App
