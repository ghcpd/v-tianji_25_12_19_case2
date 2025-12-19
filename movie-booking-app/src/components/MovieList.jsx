import React from 'react'
import { useBooking } from '../context/BookingContext'

const MovieList = ({ onSelectMovie }) => {
  const { movies, startBooking } = useBooking()

  const handleSelectMovie = (movieId) => {
    startBooking(movieId)
    onSelectMovie()
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Now Showing</h2>
        <p className="text-gray-400">Select a movie to book your tickets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
          >
            <div className="h-48 bg-gradient-to-b from-indigo-500/20 to-pink-500/20 flex items-center justify-center text-7xl">
              {movie.poster}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
                  {movie.genre}
                </span>
                <span className="px-3 py-1 bg-pink-600 text-white text-sm rounded-full">
                  {movie.rating}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{movie.description}</p>
              <p className="text-gray-500 text-sm mb-4">Duration: {movie.duration} min</p>
              <button
                onClick={() => handleSelectMovie(movie.id)}
                className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieList
