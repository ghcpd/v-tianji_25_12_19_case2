import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '~/App'

describe('Seat selection and booking flow', () => {
  test('user can select seats and see booking in history', async () => {
    // make seat generation deterministic by forcing Math.random > 0.1
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.9)

    render(<App />)

    // Open first movie
    const selectButtons = await screen.findAllByRole('button', { name: /Select/i })
    expect(selectButtons.length).toBeGreaterThan(0)
    await userEvent.click(selectButtons[0])

    // Click "Select seats" on first showtime
    const selectSeatButtons = await screen.findAllByRole('button', { name: /Select seats/i })
    await userEvent.click(selectSeatButtons[0])

    // Choose two seats
    const seats = await screen.findAllByText(/1-1|1-2|1-3|2-1/)
    expect(seats.length).toBeGreaterThan(0)
    await userEvent.click(seats[0])
    await userEvent.click(seats[1])

    // Confirm
    const confirm = screen.getByTestId('confirm-btn')
    await userEvent.click(confirm)

    // Go to history
    const historyBtn = screen.getByRole('button', { name: /Booking History/i })
    await userEvent.click(historyBtn)

    // Expect at least one order recorded
    const order = screen.getByText(/Order/)
    expect(order).toBeInTheDocument()

    rnd.mockRestore()
  })
})
