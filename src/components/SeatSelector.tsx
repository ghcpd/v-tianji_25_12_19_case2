import React, { useMemo, useState } from 'react'
import type { Movie } from '~/data/mockData'
import { useApp, Seat, Order } from '~/state/AppContext'

function buildSeats(): Seat[] {
  const seats: Seat[] = []
  for (let r = 1; r <= 6; r++) {
    for (let c = 1; c <= 10; c++) {
      const premium = r <= 2
      seats.push({ id: `r${r}c${c}`, row: r, col: c, type: premium ? 'premium' : 'standard', reserved: Math.random() < 0.1 })
    }
  }
  return seats
}

export default function SeatSelector({ movie, showtimeId, onDone }: { movie: Movie; showtimeId: string; onDone: () => void }) {
  const { dispatch } = useApp()
  const [seats] = useState<Seat[]>(buildSeats)
  const [selected, setSelected] = useState<Seat[]>([])

  const showtime = movie.showtimes.find((s) => s.id === showtimeId)!

  const toggle = (s: Seat) => {
    if (s.reserved) return
    if (selected.some((x) => x.id === s.id)) setSelected((p) => p.filter((x) => x.id !== s.id))
    else setSelected((p) => [...p, s])
  }

  const total = useMemo(() => selected.reduce((sum, s) => sum + (s.type === 'premium' ? showtime.price + 4 : showtime.price), 0), [selected, showtime])

  const confirm = () => {
    if (selected.length === 0) return
    const order: Order = { id: `${Date.now()}`, movieId: movie.id, showtimeId, seats: selected, total, time: new Date().toISOString() }
    dispatch({ type: 'ADD_ORDER', payload: order })
    onDone()
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="movie-title">{movie.title}</div>
          <div className="muted">{showtime.time} • {showtime.auditorium}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="muted">Selected: {selected.length}</div>
          <div style={{ fontWeight: 700 }}>${total.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="seat-map">
          {seats.map((s) => {
            const cls = s.reserved ? 'seat reserved' : selected.some((x) => x.id === s.id) ? 'seat selected' : 'seat available'
            return (
              <div key={s.id} className={cls} onClick={() => toggle(s)} data-seatid={s.id}>
                {s.row}-{s.col}
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn" onClick={confirm} data-testid="confirm-btn">Confirm purchase</button>
          <button className="btn btn-ghost" onClick={onDone}>Cancel</button>
          <div style={{ marginLeft: 'auto' }} className="muted">Legend: <span className="badge">Premium +$4</span> <span className="badge">Reserved</span></div>
        </div>
      </div>
    </div>
  )
}
