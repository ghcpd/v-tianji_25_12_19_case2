import React, { useState } from 'react'
import type { Movie } from '~/data/mockData'
import Showtimes from './Showtimes'

export default function MovieList({ movies }: { movies: Movie[] }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div>
      <div className="grid">
        {movies.map((m) => (
          <div className="card" key={m.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div className="movie-title">{m.title}</div>
                <div className="muted">{m.duration} min — {m.rating}</div>
                <div style={{ marginTop: 8 }} className="muted">{m.description}</div>
              </div>
              <div>
                <button className="btn" onClick={() => setSelected(selected === m.id ? null : m.id)}>Select</button>
              </div>
            </div>

            {selected === m.id && (
              <div style={{ marginTop: 12 }}>
                <Showtimes movie={m} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
