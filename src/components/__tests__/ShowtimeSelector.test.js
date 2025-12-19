import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShowtimeSelector from '../ShowtimeSelector';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' })
}));

jest.mock('../../context/BookingContext', () => ({
  useBooking: () => ({
    state: {
      movies: [
        { id: 1, title: 'Movie 1', showtimes: [{ id: 1, time: '10:00 AM' }] }
      ]
    },
    dispatch: jest.fn()
  }),
  BookingProvider: ({ children }) => <div>{children}</div>
}));

test('renders showtimes', () => {
  render(
    <BrowserRouter>
      <ShowtimeSelector />
    </BrowserRouter>
  );
  expect(screen.getByText('Movie 1')).toBeInTheDocument();
});