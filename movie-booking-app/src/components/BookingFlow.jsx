import React, { useState } from 'react'
import { useBooking } from '../context/BookingContext'

const BookingFlow = ({ onBack }) => {
  const { currentBooking, selectShowtime, selectSeats, confirmBooking, getShowtimesByMovieId, getSeatsForShowtime } = useBooking()
  const [selectedSeatIds, setSelectedSeatIds] = useState([])

  if (!currentBooking) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No booking in progress</p>
        <button
          onClick={onBack}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          Back to Movies
        </button>
      </div>
    )
  }

  const showtimes = getShowtimesByMovieId(currentBooking.movieId)
  const seats = currentBooking.showtimeId ? getSeatsForShowtime(currentBooking.showtimeId) : []

  const handleSelectShowtime = (showtimeId) => {
    selectShowtime(showtimeId)
    setSelectedSeatIds([])
  }

  const handleSeatClick = (seatId) => {
    if (selectedSeatIds.includes(seatId)) {
      setSelectedSeatIds(selectedSeatIds.filter(id => id !== seatId))
    } else {
      setSelectedSeatIds([...selectedSeatIds, seatId])
    }
  }

  const handleConfirmSeats = () => {
    selectSeats(selectedSeatIds)
  }

  const handleConfirmBooking = () => {
    confirmBooking()
    onBack()
  }

  return (
    <div className="space-y-8">
      {/* Step 1: Movie Info */}
      <div className="bg-gray-800 rounded-lg p-6 border border-indigo-500/20">
        <h3 className="text-2xl font-bold text-white mb-2">{currentBooking.movie.title}</h3>
        <p className="text-gray-400">{currentBooking.movie.genre} • {currentBooking.movie.rating}</p>
      </div>

      {/* Step 2: Select Showtime */}
      <div className="bg-gray-800 rounded-lg p-6 border border-indigo-500/20">
        <h3 className="text-xl font-bold text-white mb-4">Select Showtime</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showtimes.map((showtime) => (
            <button
              key={showtime.id}
              onClick={() => handleSelectShowtime(showtime.id)}
              className={`p-4 rounded-lg transition-all ${
                currentBooking.showtimeId === showtime.id
                  ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              <div className="font-bold text-lg">{showtime.time}</div>
              <div className="text-sm">{showtime.date}</div>
              <div className="text-sm">{showtime.format} • {showtime.language}</div>
              <div className="text-sm mt-2 font-semibold">${showtime.pricePerSeat}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Select Seats */}
      {currentBooking.showtimeId && (
        <div className="bg-gray-800 rounded-lg p-6 border border-indigo-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Select Seats</h3>
          
          {/* Seat Map */}
          <div className="mb-6 overflow-x-auto">
            <div className="inline-block min-w-full">
              {/* Screen */}
              <div className="text-center mb-8">
                <div className="inline-block w-full max-w-2xl h-16 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                  SCREEN
                </div>
              </div>

              {/* Seats */}
              <div className="flex flex-col gap-2 justify-center">
                {Array.from({ length: 8 }, (_, i) => {
                  const row = String.fromCharCode(65 + i)
                  const rowSeats = seats.filter(s => s.row === row)
                  return (
                    <div key={row} className="flex gap-2 justify-center items-center">
                      <span className="w-8 text-right text-gray-400 font-bold text-sm">{row}</span>
                      <div className="flex gap-2">
                        {rowSeats.map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => seat.available && handleSeatClick(seat.id)}
                            disabled={!seat.available}
                            className={`w-8 h-8 rounded text-xs font-bold transition-all ${
                              !seat.available
                                ? 'bg-gray-600 text-gray-500 cursor-not-allowed'
                                : selectedSeatIds.includes(seat.id)
                                ? 'bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/50'
                                : 'bg-gray-700 hover:bg-indigo-600 text-gray-300 hover:text-white'
                            }`}
                            title={seat.available ? `${seat.id} - $${seat.price}` : 'Unavailable'}
                          >
                            {seat.number}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Seat Legend */}
          <div className="flex gap-6 justify-center mb-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 bg-gray-700 rounded"></div>
              <span className="text-gray-400">Available</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-pink-500 rounded"></div>
              <span className="text-gray-400">Selected</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 bg-gray-600 rounded"></div>
              <span className="text-gray-400">Booked</span>
            </div>
          </div>

          {selectedSeatIds.length > 0 && (
            <>
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Selected Seats:</span>
                  <span className="text-white font-bold">{selectedSeatIds.sort().join(', ')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Price:</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                    ${selectedSeatIds.reduce((sum, id) => sum + (seats.find(s => s.id === id)?.price || 0), 0)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleConfirmSeats}
                className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all"
              >
                Continue to Confirmation
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 4: Confirmation */}
      {currentBooking.status === 'seats-selected' && (
        <div className="bg-gray-800 rounded-lg p-6 border border-green-500/30">
          <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-300">
              <span>Movie:</span>
              <span className="text-white font-semibold">{currentBooking.movie.title}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Date & Time:</span>
              <span className="text-white font-semibold">{currentBooking.showtime.date} at {currentBooking.showtime.time}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Seats:</span>
              <span className="text-white font-semibold">{currentBooking.selectedSeats.map(s => s.id).join(', ')}</span>
            </div>
            <div className="flex justify-between text-gray-300 border-t border-gray-700 pt-3 mt-3">
              <span>Total Price:</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                ${currentBooking.totalPrice}
              </span>
            </div>
          </div>
          <button
            onClick={handleConfirmBooking}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg transition-all mb-3"
          >
            Confirm & Pay
          </button>
          <button
            onClick={() => handleSelectShowtime(currentBooking.showtimeId)}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-3 rounded-lg transition-all"
          >
            Change Seats
          </button>
        </div>
      )}

      {/* Back Button */}
      {currentBooking.status !== 'seats-selected' && (
        <button
          onClick={onBack}
          className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-6 rounded-lg"
        >
          ← Back to Movies
        </button>
      )}
    </div>
  )
}

export default BookingFlow
