import React from 'react'
import { useApp } from '~/state/AppContext'

export default function BookingHistory() {
  const { state } = useApp()

  if (state.orders.length === 0) return <div className="card">No bookings yet — make some reservations!</div>

  return (
    <div className="card booking-history">
      <h3>Booking History</h3>
      {state.orders.map((o) => (
        <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700 }}>Order {o.id}</div>
            <div className="muted">{o.time} • Seats: {o.seats.map((s) => s.id).join(', ')}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="muted">Showtime {o.showtimeId}</div>
            <div style={{ fontWeight: 700 }}>${o.total.toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
