import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SeatSelector from '~/components/SeatSelector'
import { AppProvider } from '~/state/AppContext'

const movie = {
  id: 't1',
  title: 'Test Movie',
  duration: 100,
  rating: 'PG',
  showtimes: [{ id: 'st1', time: '12:00', auditorium: 'A', price: 10 }]
}

describe('Price calculation', () => {
  test('premium seat adds surcharge', async () => {
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.9) // no reserved

    render(
      <AppProvider>
        <SeatSelector movie={movie as any} showtimeId="st1" onDone={() => {}} />
      </AppProvider>
    )

    // find a premium seat: rows 1-2 premium
    const premium = screen.getByText('1-1')
    const standard = screen.getByText('3-1')

    await userEvent.click(premium)
    expect(screen.getByText('$14.00')).toBeInTheDocument() // 10 + 4

    await userEvent.click(standard)
    expect(screen.getByText('$24.00')).toBeInTheDocument() // 14 + 10

    rnd.mockRestore()
  })
})
