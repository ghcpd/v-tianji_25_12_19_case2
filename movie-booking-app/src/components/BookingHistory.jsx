import React from 'react'
import { useBooking } from '../context/BookingContext'

const BookingHistory = () => {
  const { getAllBookings } = useBooking()
  const bookings = getAllBookings()

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">My Bookings</h2>
        <p className="text-gray-400">View your confirmed movie tickets</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center border border-gray-700">
          <div className="text-6xl mb-4">🎫</div>
          <h3 className="text-2xl font-bold text-white mb-2">No Bookings Yet</h3>
          <p className="text-gray-400">You haven't booked any tickets yet. Browse movies to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{booking.movie.title}</h3>
                  <p className="text-gray-400 mt-1">{booking.movie.genre} • {booking.movie.rating}</p>
                </div>
                <div className="text-right">
                  <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg font-bold">
                    ✓ Confirmed
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 text-sm">Date & Time</p>
                  <p className="text-white font-semibold">{booking.showtime.date} at {booking.showtime.time}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Format</p>
                  <p className="text-white font-semibold">{booking.showtime.format} • {booking.showtime.language}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Seats</p>
                  <p className="text-white font-semibold">{booking.selectedSeats.map(s => s.id).join(', ')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Hall</p>
                  <p className="text-white font-semibold">Hall {booking.showtime.hallNumber}</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                <div>
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                    ${booking.totalPrice}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Booking ID</p>
                  <p className="text-white font-mono text-sm">{booking.id}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-500 text-sm">Confirmed on {new Date(booking.confirmedAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BookingHistory
