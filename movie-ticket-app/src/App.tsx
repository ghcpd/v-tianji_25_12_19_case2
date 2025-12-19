import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import BookingPage from './pages/BookingPage'
import HistoryPage from './pages/HistoryPage'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">MovieTickets</Link>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Movies</Link>
            <Link to="/history" className="hover:underline">My Bookings</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
    </div>
  )
}
