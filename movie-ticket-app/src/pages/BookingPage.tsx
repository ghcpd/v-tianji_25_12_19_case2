import React, { useState } from 'react'
import { useBookingStore } from '../store/booking'
import { useNavigate } from 'react-router-dom'

export default function BookingPage() {
  const selectedSeats = useBookingStore((s) => s.selectedSeats)
  const confirmBooking = useBookingStore((s) => s.confirmBooking)
  const movie = useBookingStore((s) => s.movie)
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const total = selectedSeats.reduce((s, a) => s + a.price, 0)

  function onConfirm() {
    if (!name || selectedSeats.length === 0) return
    confirmBooking(name)
    navigate('/history')
  }

  return (
    <div className="bg-white rounded shadow p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
      <div className="text-sm text-gray-700 mb-2">Movie: {movie?.title}</div>
      <div className="text-sm text-gray-700 mb-2">Seats: {selectedSeats.map((s) => s.id).join(', ') || '—'}</div>
      <div className="text-sm text-gray-700 mb-4">Total: ${total}</div>
      <input placeholder="Your name" className="w-full border px-3 py-2 rounded mb-3" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={onConfirm} className="bg-teal-500 text-white px-4 py-2 rounded">Confirm</button>
        <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Back</button>
      </div>
    </div>
  )
}
