import create from 'zustand'
import { Movie, Seat } from '../data/movies'

type SelectedSeat = Seat & { showtimeId: string; movieId: string }

type BookingState = {
  movie?: Movie | null
  showtimeId?: string | null
  selectedSeats: SelectedSeat[]
  bookings: any[]
  selectMovie: (movie: Movie) => void
  selectShowtime: (id: string) => void
  toggleSeat: (seat: Seat) => void
  clearSelection: () => void
  confirmBooking: (name: string) => void
}

export const useBookingStore = create<BookingState>((set, get) => ({
  movie: null,
  showtimeId: null,
  selectedSeats: [],
  bookings: JSON.parse(localStorage.getItem('bookings') || '[]'),
  selectMovie: (movie) => set({ movie }),
  selectShowtime: (id) => set({ showtimeId: id, selectedSeats: [] }),
  toggleSeat: (seat) => {
    const movie = get().movie
    if (!movie || !get().showtimeId) return
    const key = `${seat.id}:${get().showtimeId}`
    const exists = get().selectedSeats.find((s) => s.id === seat.id)
    if (exists) {
      set({ selectedSeats: get().selectedSeats.filter((s) => s.id !== seat.id) })
    } else {
      set({ selectedSeats: [...get().selectedSeats, { ...seat, showtimeId: get().showtimeId!, movieId: movie.id }] })
    }
  },
  clearSelection: () => set({ selectedSeats: [] }),
  confirmBooking: (name) => {
    const { selectedSeats, bookings, movie } = get()
    if (!movie || selectedSeats.length === 0) return
    const order = { id: Date.now().toString(), name, movieId: movie.id, seats: selectedSeats, total: selectedSeats.reduce((s, a) => s + a.price, 0), createdAt: new Date().toISOString() }
    const newBookings = [order, ...bookings]
    localStorage.setItem('bookings', JSON.stringify(newBookings))
    set({ bookings: newBookings, selectedSeats: [] })
  }
}))
