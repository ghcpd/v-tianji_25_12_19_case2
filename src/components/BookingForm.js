import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
`;

function BookingForm() {
  const { state, dispatch } = useBooking();
  const navigate = useNavigate();
  if (!state.selectedMovie || !state.selectedShowtime) return <div>No selection</div>;
  const quantity = state.selectedSeats.length;
  const total = quantity * 10;
  const confirmBooking = () => {
    dispatch({ type: 'BOOK_TICKETS' });
    navigate('/history');
  };
  return (
    <Container>
      <h2>Booking Confirmation</h2>
      <p>Movie: {state.selectedMovie.title}</p>
      <p>Showtime: {state.selectedShowtime.time}</p>
      <p>Seats: {state.selectedSeats.map(s => `${s.row}-${s.col}`).join(', ')}</p>
      <p>Quantity: {quantity}</p>
      <p>Total: ${total}</p>
      <button onClick={confirmBooking}>Confirm Booking</button>
    </Container>
  );
}

export default BookingForm;