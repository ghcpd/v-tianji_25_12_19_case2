import React, { useState } from 'react'
import { movies } from './data/mockData'
import MovieList from './components/MovieList'
import BookingHistory from './components/BookingHistory'
import { AppProvider } from './state/AppContext'

export default function App() {
  const [view, setView] = useState<'browse' | 'history'>('browse')

  return (
    <AppProvider>
      <div className="container">
        <header className="header">
          <div>
            <div className="brand">MovieFlow 🎬</div>
            <div className="muted">Browse movies, select seats & book tickets</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-ghost" onClick={() => setView('browse')}>Browse</button>
            <button className="btn" onClick={() => setView('history')}>Booking History</button>
          </div>
        </header>

        {view === 'browse' ? <MovieList movies={movies} /> : <BookingHistory />}

        <footer className="footer">Made with care — Mock data & frontend-only demo</footer>
      </div>
    </AppProvider>
  )
}
