import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;
`;

const Seat = styled.button`
  width: 30px;
  height: 30px;
  background: ${props => props.selected ? 'blue' : props.available ? 'green' : 'red'};
  border: none;
`;

function SeatMap() {
  const { state, dispatch } = useBooking();
  if (!state.selectedShowtime) return <div>No showtime selected</div>;
  const toggleSeat = (seat) => {
    if (state.selectedSeats.some(s => s.id === seat.id)) {
      dispatch({ type: 'DESELECT_SEAT', payload: seat });
    } else {
      dispatch({ type: 'SELECT_SEAT', payload: seat });
    }
  };
  return (
    <Container>
      <h2>Select Seats</h2>
      <Grid>
        {state.selectedShowtime.seats.map(seat => (
          <Seat
            key={seat.id}
            available={seat.available}
            selected={state.selectedSeats.some(s => s.id === seat.id)}
            onClick={() => seat.available && toggleSeat(seat)}
          >
            {seat.row}-{seat.col}
          </Seat>
        ))}
      </Grid>
      <Link to="/booking">Proceed to Booking</Link>
    </Container>
  );
}

export default SeatMap;