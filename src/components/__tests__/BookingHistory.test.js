import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingHistory from '../BookingHistory';

jest.mock('../../context/BookingContext', () => ({
  useBooking: () => ({
    state: {
      bookings: [
        {
          id: 1,
          movie: { title: 'Movie 1' },
          showtime: { time: '10:00 AM' },
          seats: [{row: 0, col: 0}],
          total: 10
        }
      ]
    }
  }),
  BookingProvider: ({ children }) => <div>{children}</div>
}));

test('renders booking history', () => {
  render(
    <BrowserRouter>
      <BookingHistory />
    </BrowserRouter>
  );
  expect(screen.getByText('Booking History')).toBeInTheDocument();
  expect(screen.getByText('Movie 1 - 10:00 AM')).toBeInTheDocument();
});