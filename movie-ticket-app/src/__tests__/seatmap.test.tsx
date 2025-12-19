import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SeatMap from '../components/SeatMap'
import { movies } from '../data/movies'
import { useBookingStore } from '../store/booking'

it('renders seats and allows selecting', () => {
  useBookingStore.setState({ movie: movies[0], showtimeId: movies[0].showtimes[0].id, selectedSeats: [] })
  const { getAllByLabelText } = render(<SeatMap movie={movies[0]} showtimeId={movies[0].showtimes[0].id} />)
  const candidates = getAllByLabelText(/Seat .*1/)
  const seat = candidates.find((el) => !el.getAttribute('aria-label')?.includes('reserved'))!
  fireEvent.click(seat)
  expect(useBookingStore.getState().selectedSeats.length).toBe(1)
})
