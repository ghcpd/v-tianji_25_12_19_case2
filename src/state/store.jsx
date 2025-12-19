import React, { createContext, useContext, useReducer } from 'react'
import { movies as mockMovies } from '../data/mock'

const initialState = {
  movies: mockMovies,
  selectedMovieId: mockMovies[0].id,
  selectedShowtimeId: mockMovies[0].showtimes[0].id,
  selectedSeats: [], // array of seat ids
  orders: []
}

const actions = {
  SELECT_MOVIE: 'SELECT_MOVIE',
  SELECT_SHOWTIME: 'SELECT_SHOWTIME',
  TOGGLE_SEAT: 'TOGGLE_SEAT',
  CONFIRM_BOOKING: 'CONFIRM_BOOKING',
  CLEAR_SELECTION: 'CLEAR_SELECTION'
}

function reducer(state, action){
  switch(action.type){
    case actions.SELECT_MOVIE:
      return {
        ...state,
        selectedMovieId: action.payload.movieId,
        selectedShowtimeId: action.payload.showtimeId,
        selectedSeats: []
      }
    case actions.SELECT_SHOWTIME:
      return {
        ...state,
        selectedShowtimeId: action.payload.showtimeId,
        selectedSeats: []
      }
    case actions.TOGGLE_SEAT: {
      const seatId = action.payload.seatId
      const seat = findSeat(state, seatId)
      if(!seat || seat.occupied) return state
      const selected = new Set(state.selectedSeats)
      if(selected.has(seatId)) selected.delete(seatId)
      else selected.add(seatId)
      return { ...state, selectedSeats: Array.from(selected) }
    }
    case actions.CONFIRM_BOOKING: {
      if(state.selectedSeats.length === 0) return state
      // mark seats occupied in movies copy
      const movies = state.movies.map(m => ({ ...m, showtimes: m.showtimes.map(st => ({ ...st, seats: st.seats.map(s => ({ ...s })) })) }))
      const movie = movies.find(m => m.id === state.selectedMovieId)
      const showtime = movie.showtimes.find(st => st.id === state.selectedShowtimeId)
      const total = showtime.price * state.selectedSeats.length
      showtime.seats.forEach(s => { if(state.selectedSeats.includes(s.id)) s.occupied = true })
      const order = {
        id: `o-${Date.now()}`,
        movieId: movie.id,
        movieTitle: movie.title,
        showtimeId: showtime.id,
        showtimeLabel: showtime.time,
        seats: state.selectedSeats.slice(),
        pricePer: showtime.price,
        total,
        createdAt: new Date().toISOString()
      }
      return {
        ...state,
        movies,
        orders: [order, ...state.orders],
        selectedSeats: []
      }
    }
    case actions.CLEAR_SELECTION:
      return { ...state, selectedSeats: [] }
    default: return state
  }
}

function findSeat(state, seatId){
  for(const m of state.movies){
    for(const st of m.showtimes){
      for(const s of st.seats){ if(s.id === seatId) return s }
    }
  }
  return null
}

const AppContext = createContext()
export function AppProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState)
  const api = {
    state,
    selectMovie: (movieId, showtimeId) => dispatch({ type: actions.SELECT_MOVIE, payload: { movieId, showtimeId } }),
    selectShowtime: (showtimeId) => dispatch({ type: actions.SELECT_SHOWTIME, payload: { showtimeId } }),
    toggleSeat: (seatId) => dispatch({ type: actions.TOGGLE_SEAT, payload: { seatId } }),
    confirmBooking: () => dispatch({ type: actions.CONFIRM_BOOKING }),
    clearSelection: () => dispatch({ type: actions.CLEAR_SELECTION })
  }
  return <AppContext.Provider value={api}>{children}</AppContext.Provider>
}

export function useApp(){
  return useContext(AppContext)
}
