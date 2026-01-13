import React, { useState } from 'react'
import type { Movie } from '~/data/mockData'
import SeatSelector from './SeatSelector'

export default function Showtimes({ movie }: { movie: Movie }) {
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null)

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {movie.showtimes.map((s) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="badge">{s.time} • {s.auditorium}</div>
            <div className="muted">${s.price}</div>
            <button className="btn btn-ghost" onClick={() => setSelectedShowtime(s.id)}>Select seats</button>
          </div>
        ))}
      </div>

      {selectedShowtime && (
        <div style={{ marginTop: 12 }}>
          <SeatSelector movie={movie} showtimeId={selectedShowtime} onDone={() => setSelectedShowtime(null)} />
        </div>
      )}
    </div>
  )
}
