import { describe, it, expect } from 'vitest'
import { MOVIES, SHOWTIMES, SEAT_LAYOUTS, generateSeats } from '../data/mockData'

describe('Mock Data', () => {
  describe('MOVIES', () => {
    it('should have at least 5 movies', () => {
      expect(MOVIES.length).toBeGreaterThanOrEqual(5)
    })

    it('should have all required movie properties', () => {
      MOVIES.forEach(movie => {
        expect(movie).toHaveProperty('id')
        expect(movie).toHaveProperty('title')
        expect(movie).toHaveProperty('genre')
        expect(movie).toHaveProperty('rating')
        expect(movie).toHaveProperty('duration')
        expect(movie).toHaveProperty('description')
        expect(movie).toHaveProperty('poster')
      })
    })

    it('should have unique movie ids', () => {
      const ids = MOVIES.map(m => m.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('SHOWTIMES', () => {
    it('should have showtimes', () => {
      expect(SHOWTIMES.length).toBeGreaterThan(0)
    })

    it('should have all required showtime properties', () => {
      SHOWTIMES.forEach(showtime => {
        expect(showtime).toHaveProperty('id')
        expect(showtime).toHaveProperty('movieId')
        expect(showtime).toHaveProperty('date')
        expect(showtime).toHaveProperty('time')
        expect(showtime).toHaveProperty('format')
        expect(showtime).toHaveProperty('language')
        expect(showtime).toHaveProperty('pricePerSeat')
        expect(showtime).toHaveProperty('hallNumber')
      })
    })

    it('should have valid price per seat', () => {
      SHOWTIMES.forEach(showtime => {
        expect(showtime.pricePerSeat).toBeGreaterThan(0)
        expect(typeof showtime.pricePerSeat).toBe('number')
      })
    })

    it('should have valid hall numbers', () => {
      SHOWTIMES.forEach(showtime => {
        expect(showtime.hallNumber).toBeGreaterThan(0)
        expect(showtime.hallNumber).toBeLessThanOrEqual(5)
      })
    })
  })

  describe('generateSeats', () => {
    it('should generate 80 seats (8 rows x 10 columns)', () => {
      const seats = generateSeats(1)
      expect(seats.length).toBe(80)
    })

    it('should have all required seat properties', () => {
      const seats = generateSeats(1)
      seats.forEach(seat => {
        expect(seat).toHaveProperty('id')
        expect(seat).toHaveProperty('row')
        expect(seat).toHaveProperty('number')
        expect(seat).toHaveProperty('available')
        expect(seat).toHaveProperty('price')
      })
    })

    it('should have valid row letters', () => {
      const seats = generateSeats(1)
      const rows = new Set(seats.map(s => s.row))
      expect(rows.size).toBe(8)
      expect(rows.has('A')).toBe(true)
      expect(rows.has('H')).toBe(true)
    })

    it('should have valid seat numbers', () => {
      const seats = generateSeats(1)
      seats.forEach(seat => {
        expect(seat.number).toBeGreaterThan(0)
        expect(seat.number).toBeLessThanOrEqual(10)
      })
    })

    it('should have valid prices', () => {
      const seats = generateSeats(1)
      seats.forEach(seat => {
        expect(seat.price).toBeGreaterThan(0)
        expect([12, 14, 16]).toContain(seat.price)
      })
    })

    it('should have available property as boolean', () => {
      const seats = generateSeats(1)
      seats.forEach(seat => {
        expect(typeof seat.available).toBe('boolean')
      })
    })

    it('should generate unique seat ids', () => {
      const seats = generateSeats(1)
      const ids = seats.map(s => s.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('SEAT_LAYOUTS', () => {
    it('should have layouts for all halls', () => {
      expect(SEAT_LAYOUTS).toHaveProperty('1')
      expect(SEAT_LAYOUTS).toHaveProperty('2')
      expect(SEAT_LAYOUTS).toHaveProperty('3')
      expect(SEAT_LAYOUTS).toHaveProperty('4')
      expect(SEAT_LAYOUTS).toHaveProperty('5')
    })

    it('should have 80 seats per hall', () => {
      Object.values(SEAT_LAYOUTS).forEach(layout => {
        expect(layout.length).toBe(80)
      })
    })
  })
})
