import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SeatMap from '../SeatMap';

const mockDispatch = jest.fn();
jest.mock('../../context/BookingContext', () => ({
  useBooking: () => ({
    state: {
      selectedShowtime: {
        seats: [
          {id: 0, row: 0, col: 0, available: true},
          {id: 1, row: 0, col: 1, available: false}
        ]
      },
      selectedSeats: []
    },
    dispatch: mockDispatch
  }),
  BookingProvider: ({ children }) => <div>{children}</div>
}));

test('renders seat map', () => {
  render(
    <BrowserRouter>
      <SeatMap />
    </BrowserRouter>
  );
  expect(screen.getByText('Select Seats')).toBeInTheDocument();
});

test('selects seat', () => {
  render(
    <BrowserRouter>
      <SeatMap />
    </BrowserRouter>
  );
  const seat = screen.getByText('0-0');
  fireEvent.click(seat);
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'SELECT_SEAT', payload: {id: 0, row: 0, col: 0, available: true} });
});