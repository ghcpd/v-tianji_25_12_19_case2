import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  margin: 1rem;
  padding: 1rem;
  width: 200px;
`;

function MovieList() {
  const { state } = useBooking();
  return (
    <Container>
      {state.movies.map(movie => (
        <Card key={movie.id}>
          <img src={movie.poster} alt={movie.title} />
          <h3>{movie.title}</h3>
          <Link to={`/movie/${movie.id}`}>View Showtimes</Link>
        </Card>
      ))}
    </Container>
  );
}

export default MovieList;