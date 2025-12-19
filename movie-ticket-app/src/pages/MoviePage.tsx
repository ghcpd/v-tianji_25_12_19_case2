import React, { useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { movies } from '../data/movies'
import { useBookingStore } from '../store/booking'
import SeatMap from '../components/SeatMap'

export default function MoviePage() {
  const { id } = useParams()
  const [q] = useSearchParams()
  const showtime = q.get('showtime') || undefined
  const movie = movies.find((m) => m.id === id)
  const selectMovie = useBookingStore((s) => s.selectMovie)
  const selectShowtime = useBookingStore((s) => s.selectShowtime)
  const navigate = useNavigate()

  useEffect(() => {
    if (movie) selectMovie(movie)
    if (showtime) selectShowtime(showtime)
  }, [movie, showtime, selectMovie, selectShowtime])

  if (!movie) return <div>Movie not found</div>

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="h-64 bg-gray-200 rounded"></div>
          <h2 className="text-2xl font-bold mt-4">{movie.title}</h2>
          <p className="text-sm text-gray-600">{movie.duration}</p>
          <p className="mt-2 text-gray-700">{movie.description}</p>
          <div className="mt-4">
            <button onClick={() => navigate('/booking')} className="bg-teal-500 text-white px-4 py-2 rounded">Go to Booking</button>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-3">Select Seats</h3>
          <SeatMap movie={movie} showtimeId={showtime} />
        </div>
      </div>
    </div>
  )
}
