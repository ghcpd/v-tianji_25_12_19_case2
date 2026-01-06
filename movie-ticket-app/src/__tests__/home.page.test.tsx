import React from 'react'
import { render } from '@testing-library/react'
import HomePage from '../pages/HomePage'
import { MemoryRouter } from 'react-router-dom'

it('renders movie list with showtimes', () => {
  const { getByText } = render(<MemoryRouter><HomePage /></MemoryRouter>)
  expect(getByText(/Now Showing/)).toBeTruthy()
  // movie titles from mock data
  expect(getByText(/The Last Voyage/)).toBeTruthy()
  expect(getByText(/Spacebound/)).toBeTruthy()
})
