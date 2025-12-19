import React, { createContext, useContext, useReducer } from 'react';

// Mock data
const initialMovies = [
  {
    id: 1,
    title: 'Movie 1',
    poster: 'https://via.placeholder.com/150',
    showtimes: [
      {
        id: 1,
        time: '10:00 AM',
        seats: Array.from({length: 50}, (_, i) => ({id: i, row: Math.floor(i/10), col: i%10, available: true}))
      },
      {
        id: 2,
        time: '2:00 PM',
        seats: Array.from({length: 50}, (_, i) => ({id: i, row: Math.floor(i/10), col: i%10, available: true}))
      }
    ]
  },
  {
    id: 2,
    title: 'Movie 2',
    poster: 'https://via.placeholder.com/150',
    showtimes: [
      {
        id: 3,
        time: '12:00 PM',
        seats: Array.from({length: 50}, (_, i) => ({id: i, row: Math.floor(i/10), col: i%10, available: true}))
      }
    ]
  }
];

const initialState = {
  movies: initialMovies,
  selectedMovie: null,
  selectedShowtime: null,
  selectedSeats: [],
  bookings: []
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SELECT_MOVIE':
      return { ...state, selectedMovie: action.payload };
    case 'SELECT_SHOWTIME':
      return { ...state, selectedShowtime: action.payload };
    case 'SELECT_SEAT':
      return { ...state, selectedSeats: [...state.selectedSeats, action.payload] };
    case 'DESELECT_SEAT':
      return { ...state, selectedSeats: state.selectedSeats.filter(s => s.id !== action.payload.id) };
    case 'BOOK_TICKETS':
      // update seats availability
      const updatedMovies = state.movies.map(movie => {
        if (movie.id === state.selectedMovie.id) {
          return {
            ...movie,
            showtimes: movie.showtimes.map(showtime => {
              if (showtime.id === state.selectedShowtime.id) {
                return {
                  ...showtime,
                  seats: showtime.seats.map(seat =>
                    state.selectedSeats.some(s => s.id === seat.id) ? { ...seat, available: false } : seat
                  )
                };
              }
              return showtime;
            })
          };
        }
        return movie;
      });
      const booking = {
        id: Date.now(),
        movie: state.selectedMovie,
        showtime: state.selectedShowtime,
        seats: state.selectedSeats,
        total: state.selectedSeats.length * 10 // price
      };
      return {
        ...state,
        movies: updatedMovies,
        bookings: [...state.bookings, booking],
        selectedSeats: [],
        selectedMovie: null,
        selectedShowtime: null
      };
    default:
      return state;
  }
}

const BookingContext = createContext();

export function useBooking() {
  return useContext(BookingContext);
}

export default function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}