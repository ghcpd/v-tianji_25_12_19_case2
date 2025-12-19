import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from '../BookingForm';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const mockDispatch = jest.fn();
jest.mock('../../context/BookingContext', () => ({
  useBooking: () => ({
    state: {
      selectedMovie: { title: 'Movie 1' },
      selectedShowtime: { time: '10:00 AM' },
      selectedSeats: [{id: 0, row: 0, col: 0}]
    },
    dispatch: mockDispatch
  }),
  BookingProvider: ({ children }) => <div>{children}</div>
}));

test('renders booking form', () => {
  render(
    <BrowserRouter>
      <BookingForm />
    </BrowserRouter>
  );
  expect(screen.getByText('Booking Confirmation')).toBeInTheDocument();
});

test('confirms booking', () => {
  render(
    <BrowserRouter>
      <BookingForm />
    </BrowserRouter>
  );
  const button = screen.getByText('Confirm Booking');
  fireEvent.click(button);
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'BOOK_TICKETS' });
  expect(mockNavigate).toHaveBeenCalledWith('/history');
});