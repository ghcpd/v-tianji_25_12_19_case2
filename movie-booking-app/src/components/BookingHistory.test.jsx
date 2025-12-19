import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BookingProvider } from '../context/BookingContext'
import BookingHistory from './BookingHistory'

describe('BookingHistory Component', () => {
  const renderBookingHistory = () => {
    return render(
      <BookingProvider>
        <BookingHistory />
      </BookingProvider>
    )
  }

  it('should show empty state when no bookings', () => {
    renderBookingHistory()
    expect(screen.getByText('No Bookings Yet')).toBeInTheDocument()
    expect(screen.getByText(/You haven't booked any tickets yet/)).toBeInTheDocument()
  })

  it('should render heading', () => {
    renderBookingHistory()
    expect(screen.getByText('My Bookings')).toBeInTheDocument()
  })

  it('should display empty state icon', () => {
    renderBookingHistory()
    const emptyIcon = screen.getByText('🎫')
    expect(emptyIcon).toBeInTheDocument()
  })
})
