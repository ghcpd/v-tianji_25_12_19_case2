import React from 'react'
import { Movie, Seat } from '../data/movies'
import { useBookingStore } from '../store/booking'

export default function SeatMap({ movie, showtimeId }: { movie: Movie; showtimeId?: string }) {
  const toggleSeat = useBookingStore((s) => s.toggleSeat)
  const selectedSeats = useBookingStore((s) => s.selectedSeats)

  const show = movie.showtimes.find((s) => s.id === showtimeId) || movie.showtimes[0]
  const seats = show.seats

  function isSelected(seat: Seat) {
    return selectedSeats.some((s) => s.id === seat.id)
  }

  return (
    <div>
      <div className="mb-3 text-sm text-gray-600">Screen</div>
      <div className="bg-gray-100 p-4 rounded">
        {groupByRow(seats).map((row) => (
          <div key={row.row} className="flex gap-2 items-center mb-2">
            <div className="w-6 text-sm">{row.row}</div>
            <div className="flex gap-2">
              {row.seats.map((seat) => (
                <div
                  key={seat.id}
                  className={`seat ${seat.reserved ? 'reserved' : isSelected(seat) ? 'selected' : 'available'}`}
                  aria-label={`Seat ${seat.id} ${seat.reserved ? 'reserved' : ''}`}
                  onClick={() => !seat.reserved && toggleSeat(seat)}
                >
                  {seat.col}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="text-sm">Selected: {selectedSeats.length} seats</div>
        <div className="text-sm">Total: ${selectedSeats.reduce((s, a) => s + a.price, 0)}</div>
      </div>
    </div>
  )
}

function groupByRow(seats: Seat[]) {
  const map: { row: string; seats: Seat[] }[] = []
  const rows = Array.from(new Set(seats.map((s) => s.row)))
  rows.forEach((r) => {
    map.push({ row: r, seats: seats.filter((s) => s.row === r).sort((a, b) => a.col - b.col) })
  })
  return map
}
