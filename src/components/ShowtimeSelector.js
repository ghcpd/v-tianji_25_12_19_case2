import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
`;

function ShowtimeSelector() {
  const { id } = useParams();
  const { state, dispatch } = useBooking();
  const movie = state.movies.find(m => m.id === parseInt(id));
  if (!movie) return <div>Movie not found</div>;
  const selectShowtime = (showtime) => {
    dispatch({ type: 'SELECT_MOVIE', payload: movie });
    dispatch({ type: 'SELECT_SHOWTIME', payload: showtime });
  };
  return (
    <Container>
      <h2>{movie.title}</h2>
      <h3>Showtimes</h3>
      {movie.showtimes.map(showtime => (
        <div key={showtime.id}>
          <button onClick={() => selectShowtime(showtime)}>{showtime.time}</button>
          <Link to={`/showtime/${showtime.id}`}>Select Seats</Link>
        </div>
      ))}
    </Container>
  );
}

export default ShowtimeSelector;