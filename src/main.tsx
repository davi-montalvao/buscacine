import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Fix mobile 100vh issues: set --vh to 1% of the window inner height
function setVh() {
  try {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  } catch (e) {
    // ignore
  }
}
setVh()
window.addEventListener('resize', setVh)
window.addEventListener('orientationchange', setVh)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
