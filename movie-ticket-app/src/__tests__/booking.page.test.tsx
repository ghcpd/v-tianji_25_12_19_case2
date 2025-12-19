import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BookingPage from '../pages/BookingPage'
import { useBookingStore } from '../store/booking'
import * as router from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom')
  return { ...actual, useNavigate: () => vi.fn() }
})

describe('BookingPage', () => {
  it('confirms booking and navigates', () => {
    useBookingStore.setState({ selectedSeats: [{ id: 'A1', price: 12, row: 'A', col: 1 }], movie: { id: '1', title: 'Test', poster: '', duration: '1h', description: '', showtimes: [] } as any })
    const navigate = vi.fn()
    vi.spyOn(router, 'useNavigate').mockReturnValue(navigate)
    const { getByPlaceholderText, getByText } = render(<BookingPage />)
    fireEvent.change(getByPlaceholderText('Your name'), { target: { value: 'Bob' } })
    fireEvent.click(getByText('Confirm'))
    expect(navigate).toHaveBeenCalledWith('/history')
  })
})
