import React from 'react';
import { useBooking } from '../context/BookingContext';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
`;

function BookingHistory() {
  const { state } = useBooking();
  return (
    <Container>
      <h2>Booking History</h2>
      {state.bookings.map(booking => (
        <div key={booking.id}>
          <p>{booking.movie.title} - {booking.showtime.time}</p>
          <p>Seats: {booking.seats.map(s => `${s.row}-${s.col}`).join(', ')}</p>
          <p>Total: ${booking.total}</p>
        </div>
      ))}
    </Container>
  );
}

export default BookingHistory;