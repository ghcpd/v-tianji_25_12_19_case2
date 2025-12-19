import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { BookingProvider, useBooking } from '../context/BookingContext'

describe('BookingContext', () => {
  const wrapper = ({ children }) => <BookingProvider>{children}</BookingProvider>

  it('should initialize with empty bookings', () => {
    const { result } = renderHook(() => useBooking(), { wrapper })
    expect(result.current.bookings).toEqual([])
    expect(result.current.currentBooking).toBeNull()
  })

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useBooking())
    }).toThrow('useBooking must be used within a BookingProvider')
  })

  describe('startBooking', () => {
    it('should create a new booking for selected movie', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      act(() => {
        result.current.startBooking('1')
      })

      expect(result.current.currentBooking).not.toBeNull()
      expect(result.current.currentBooking.movieId).toBe('1')
      expect(result.current.currentBooking.movie.title).toBe('The Quantum Paradox')
      expect(result.current.currentBooking.status).toBe('movie-selected')
    })

    it('should return null for invalid movie id', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      let booking
      act(() => {
        booking = result.current.startBooking('invalid-id')
      })

      expect(booking).toBeNull()
    })
  })

  describe('selectShowtime', () => {
    it('should update booking with selected showtime', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      act(() => {
        result.current.startBooking('1')
      })

      expect(result.current.currentBooking).not.toBeNull()

      act(() => {
        result.current.selectShowtime('st1')
      })

      expect(result.current.currentBooking.showtimeId).toBe('st1')
      expect(result.current.currentBooking.showtime).not.toBeNull()
      expect(result.current.currentBooking.status).toBe('showtime-selected')
    })

    it('should return null when no booking is in progress', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      act(() => {
        result.current.selectShowtime('st1')
      })

      expect(result.current.currentBooking).toBeNull()
    })
  })

  describe('selectSeats', () => {
    it('should update booking with selected seats and calculate price', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      act(() => {
        result.current.startBooking('1')
        result.current.selectShowtime('st1')
      })

      const seatsBefore = result.current.currentBooking?.selectedSeats?.length || 0

      act(() => {
        result.current.selectSeats(['A1', 'A2'])
      })

      expect(result.current.currentBooking.selectedSeats.length).toBe(2)
      expect(result.current.currentBooking.status).toBe('seats-selected')
      expect(result.current.currentBooking.totalPrice).toBeGreaterThan(0)
    })

    it('should clear seats when selecting new showtime', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      act(() => {
        result.current.startBooking('1')
        result.current.selectShowtime('st1')
        result.current.selectSeats(['A1'])
      })

      expect(result.current.currentBooking.selectedSeats.length).toBe(1)

      act(() => {
        result.current.selectShowtime('st2')
      })

      expect(result.current.currentBooking.selectedSeats).toEqual([])
      expect(result.current.currentBooking.totalPrice).toBe(0)
    })
  })

  describe('confirmBooking', () => {
    it('should confirm booking and move it to history', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      act(() => {
        result.current.startBooking('1')
        result.current.selectShowtime('st1')
        result.current.selectSeats(['A1', 'A2'])
      })

      expect(result.current.currentBooking.status).toBe('seats-selected')

      act(() => {
        result.current.confirmBooking()
      })

      expect(result.current.bookings.length).toBe(1)
      expect(result.current.bookings[0].status).toBe('confirmed')
      expect(result.current.currentBooking).toBeNull()
    })

    it('should not confirm booking without seats', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      act(() => {
        result.current.startBooking('1')
        result.current.selectShowtime('st1')
        result.current.confirmBooking()
      })

      expect(result.current.bookings.length).toBe(0)
      expect(result.current.currentBooking).not.toBeNull()
    })
  })

  describe('cancelBooking', () => {
    it('should clear current booking', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      act(() => {
        result.current.startBooking('1')
      })

      expect(result.current.currentBooking).not.toBeNull()

      act(() => {
        result.current.cancelBooking()
      })

      expect(result.current.currentBooking).toBeNull()
    })
  })

  describe('getAllBookings', () => {
    it('should return all confirmed bookings', () => {
      const { result } = renderHook(() => useBooking(), { wrapper })
      
      act(() => {
        result.current.startBooking('1')
        result.current.selectShowtime('st1')
        result.current.selectSeats(['A1'])
        result.current.confirmBooking()

        result.current.startBooking('2')
        result.current.selectShowtime('st4')
        result.current.selectSeats(['B1', 'B2'])
        result.current.confirmBooking()
      })

      const allBookings = result.current.getAllBookings()
      expect(allBookings.length).toBe(2)
      expect(allBookings.every(b => b.status === 'confirmed')).toBe(true)
    })
  })
})
