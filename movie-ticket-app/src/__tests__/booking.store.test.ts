import { describe, it, expect, beforeEach } from 'vitest'
import { useBookingStore } from '../store/booking'
import { movies } from '../data/movies'

describe('booking store', () => {
  beforeEach(() => {
    // reset localStorage and store
    localStorage.clear()
  })

  it('selects movie and showtime and toggles seats', () => {
    const movie = movies[0]

    const { selectMovie, selectShowtime, toggleSeat } = useBookingStore.getState()
    selectMovie(movie)
    selectShowtime(movie.showtimes[0].id)
    toggleSeat(movie.showtimes[0].seats[0])

    const state = useBookingStore.getState()
    expect(state.movie?.id).toBe(movie.id)
    expect(state.showtimeId).toBe(movie.showtimes[0].id)
    expect(state.selectedSeats.length).toBe(1)

    // toggle off
    toggleSeat(movie.showtimes[0].seats[0])
    expect(useBookingStore.getState().selectedSeats.length).toBe(0)
  })

  it('confirms booking', () => {
    const movie = movies[0]
    const { selectMovie, selectShowtime, toggleSeat, confirmBooking } = useBookingStore.getState()
    selectMovie(movie)
    selectShowtime(movie.showtimes[0].id)
    toggleSeat(movie.showtimes[0].seats[0])
    confirmBooking('Alice')

    const bookings = useBookingStore.getState().bookings
    expect(bookings.length).toBe(1)
    expect(bookings[0].name).toBe('Alice')
    expect(bookings[0].seats.length).toBe(1)
  })
})
