import React from 'react'
import { render } from '@testing-library/react'
import HistoryPage from '../pages/HistoryPage'
import { useBookingStore } from '../store/booking'

it('renders bookings', () => {
  useBookingStore.setState({ bookings: [{ id: '1', name: 'Test', seats: [{ id: 'A1' }], total: 12, createdAt: new Date().toISOString() }] })
  const { getByText } = render(<HistoryPage />)
  expect(getByText('Test')).toBeTruthy()
  expect(getByText('$12')).toBeTruthy()
})
