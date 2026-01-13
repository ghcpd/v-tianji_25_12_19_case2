import { render, act } from '@testing-library/react';
import BookingProvider, { useBooking } from '../BookingContext';

test('provides context', () => {
  let contextValue;
  function TestComponent() {
    contextValue = useBooking();
    return null;
  }
  render(
    <BookingProvider>
      <TestComponent />
    </BookingProvider>
  );
  expect(contextValue.state.movies).toHaveLength(2);
});

test('dispatches actions', () => {
  let contextValue;
  function TestComponent() {
    contextValue = useBooking();
    return null;
  }
  render(
    <BookingProvider>
      <TestComponent />
    </BookingProvider>
  );
  act(() => {
    contextValue.dispatch({ type: 'SELECT_MOVIE', payload: {id: 1} });
  });
  expect(contextValue.state.selectedMovie.id).toBe(1);
});