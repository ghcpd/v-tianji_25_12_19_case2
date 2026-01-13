import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieList from '../MovieList';

jest.mock('../../context/BookingContext', () => ({
  useBooking: () => ({
    state: {
      movies: [
        { id: 1, title: 'Movie 1', poster: 'https://via.placeholder.com/150' }
      ]
    }
  }),
  BookingProvider: ({ children }) => <div>{children}</div>
}));

test('renders movie list', () => {
  render(
    <BrowserRouter>
      <MovieList />
    </BrowserRouter>
  );
  expect(screen.getByText('Movie 1')).toBeInTheDocument();
});