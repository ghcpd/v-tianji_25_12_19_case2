import React, { createContext, useContext, useState, useCallback } from 'react';
import { MOVIES, SHOWTIMES, SEAT_LAYOUTS } from '../data/mockData';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);

  const getMovieById = useCallback((movieId) => {
    return MOVIES.find(m => m.id === movieId);
  }, []);

  const getShowtimesByMovieId = useCallback((movieId) => {
    return SHOWTIMES.filter(s => s.movieId === movieId);
  }, []);

  const getShowtimeById = useCallback((showtimeId) => {
    return SHOWTIMES.find(s => s.id === showtimeId);
  }, []);

  const getSeatsForShowtime = useCallback((showtimeId) => {
    const showtime = getShowtimeById(showtimeId);
    if (!showtime) return [];
    return SEAT_LAYOUTS[showtime.hallNumber] || [];
  }, [getShowtimeById]);

  const startBooking = useCallback((movieId) => {
    const movie = getMovieById(movieId);
    if (!movie) return null;
    
    const booking = {
      id: Date.now().toString(),
      movieId,
      movie,
      showtimeId: null,
      showtime: null,
      selectedSeats: [],
      totalPrice: 0,
      status: 'movie-selected',
      createdAt: new Date(),
    };
    
    setCurrentBooking(booking);
    return booking;
  }, [getMovieById]);

  const selectShowtime = useCallback((showtimeId) => {
    setCurrentBooking(prev => {
      if (!prev) return null;
      
      const showtime = getShowtimeById(showtimeId);
      if (!showtime) return prev;

      return {
        ...prev,
        showtimeId,
        showtime,
        selectedSeats: [],
        totalPrice: 0,
        status: 'showtime-selected',
      };
    });
  }, [getShowtimeById]);

  const selectSeats = useCallback((seatIds) => {
    setCurrentBooking(prev => {
      if (!prev || !prev.showtime) return prev;

      const seats = getSeatsForShowtime(prev.showtimeId);
      const selected = seats.filter(s => seatIds.includes(s.id));
      const totalPrice = selected.reduce((sum, s) => sum + s.price, 0);

      return {
        ...prev,
        selectedSeats: selected,
        totalPrice,
        status: 'seats-selected',
      };
    });
  }, [getSeatsForShowtime]);

  const confirmBooking = useCallback(() => {
    setCurrentBooking(prev => {
      if (!prev || prev.selectedSeats.length === 0) {
        return prev;
      }

      const confirmedBooking = {
        ...prev,
        status: 'confirmed',
        confirmedAt: new Date(),
      };

      setBookings(existingBookings => [...existingBookings, confirmedBooking]);
      return null;
    });
  }, []);

  const cancelBooking = useCallback(() => {
    setCurrentBooking(null);
  }, []);

  const getAllBookings = useCallback(() => {
    return bookings;
  }, [bookings]);

  const value = {
    // Data
    movies: MOVIES,
    showtimes: SHOWTIMES,
    bookings,
    currentBooking,
    
    // Methods
    getMovieById,
    getShowtimesByMovieId,
    getShowtimeById,
    getSeatsForShowtime,
    startBooking,
    selectShowtime,
    selectSeats,
    confirmBooking,
    cancelBooking,
    getAllBookings,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
