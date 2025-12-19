import './App.css'
import React, { useState } from 'react'
import { BookingProvider } from './context/BookingContext'
import MovieList from './components/MovieList'
import BookingFlow from './components/BookingFlow'
import BookingHistory from './components/BookingHistory'

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('movies') // movies, booking, history

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="bg-gray-950 shadow-lg border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎬</span>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                CinemaBook
              </h1>
            </div>
            <nav className="flex gap-4">
              <button
                onClick={() => setCurrentScreen('movies')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  currentScreen === 'movies'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Browse Movies
              </button>
              <button
                onClick={() => setCurrentScreen('history')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  currentScreen === 'history'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                My Bookings
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentScreen === 'movies' && (
          <MovieList onSelectMovie={() => setCurrentScreen('booking')} />
        )}
        {currentScreen === 'booking' && (
          <BookingFlow onBack={() => setCurrentScreen('movies')} />
        )}
        {currentScreen === 'history' && (
          <BookingHistory />
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  )
}
