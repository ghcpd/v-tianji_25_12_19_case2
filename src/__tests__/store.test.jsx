import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { AppProvider, useApp } from '../state/store.jsx'

function wrapper({ children }){ return <AppProvider>{children}</AppProvider> }

describe('store basic actions', ()=>{
  test('initial state contains movies and selection', ()=>{
    const { result } = renderHook(()=>useApp(), { wrapper })
    const api = result.current
    expect(api.state.movies.length).toBeGreaterThan(0)
    expect(api.state.selectedMovieId).toBeDefined()
    expect(api.state.selectedShowtimeId).toBeDefined()
  })

  test('selecting movie and showtime updates state and clears seats', ()=>{
    const { result } = renderHook(()=>useApp(), { wrapper })
    const api = result.current
    const first = api.state.movies[0]
    const second = api.state.movies[1]
    act(()=> api.selectMovie(second.id, second.showtimes[1].id))
    expect(api.state.selectedMovieId).toBe(second.id)
    expect(api.state.selectedShowtimeId).toBe(second.showtimes[1].id)
    // toggle some seats then change showtime and ensure cleared
    const seat = api.state.movies[1].showtimes[1].seats.find(s=>!s.occupied)
    act(()=> api.toggleSeat(seat.id))
    expect(api.state.selectedSeats.length).toBe(1)
    act(()=> api.selectShowtime(second.showtimes[2].id))
    expect(api.state.selectedSeats.length).toBe(0)
  })

  test('cannot toggle occupied seats and can confirm booking', ()=>{
    const { result } = renderHook(()=>useApp(), { wrapper })
    const api = result.current
    // pick a showtime and a free seat
    const m = api.state.movies[0]
    const st = m.showtimes[0]
    const occupied = st.seats.find(s=>s.occupied)
    act(()=> api.toggleSeat(occupied.id))
    expect(api.state.selectedSeats).not.toContain(occupied.id)
    const free = st.seats.find(s=>!s.occupied)
    act(()=> api.toggleSeat(free.id))
    expect(api.state.selectedSeats).toContain(free.id)
    act(()=> api.confirmBooking())
    expect(api.state.orders.length).toBeGreaterThan(0)
    // after booking, that seat should be occupied now
    const updated = api.state.movies.find(mm=>mm.id===m.id).showtimes.find(ss=>ss.id===st.id)
    const seatNow = updated.seats.find(s=>s.id===free.id)
    expect(seatNow.occupied).toBe(true)
  })
})
