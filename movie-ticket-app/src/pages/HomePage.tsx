import React from 'react'
import { movies } from '../data/movies'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Now Showing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {movies.map((m) => (
          <div key={m.id} className="bg-white rounded shadow p-4 flex">
            <div className="w-24 h-36 bg-gray-200 rounded mr-4 flex-shrink-0"></div>
            <div>
              <h2 className="text-xl font-bold">{m.title}</h2>
              <p className="text-sm text-gray-600">{m.duration}</p>
              <p className="mt-2 text-sm text-gray-700">{m.description}</p>
              <div className="mt-4 space-x-2">
                {m.showtimes.map((s) => (
                  <Link to={`/movie/${m.id}?showtime=${s.id}`} key={s.id} className="inline-block bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600">{s.time}</Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
