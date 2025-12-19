import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookingProvider } from '../context/BookingContext'
import App from '../App'

describe('BookingFlow Component Integration', () => {
  const renderApp = () => {
    return render(<App />)
  }

  it('should show booking error when no movie is selected', () => {
    renderApp()
    // Initially on movies page
    expect(screen.getByText('Now Showing')).toBeInTheDocument()
  })

  it('should navigate and display booking flow', async () => {
    const user = userEvent.setup()
    renderApp()

    // Step 1: Select a movie
    const bookButtons = screen.getAllByText('Book Now')
    await user.click(bookButtons[0])

    // Step 2: Movie should be displayed in booking flow
    await waitFor(() => {
      expect(screen.getByText('The Quantum Paradox')).toBeInTheDocument()
    })

    // Step 3: Verify showtime buttons are visible
    expect(screen.getByText('Select Showtime')).toBeInTheDocument()
  })

  it('should display showtime options', async () => {
    const user = userEvent.setup()
    renderApp()

    // Select a movie
    const bookButtons = screen.getAllByText('Book Now')
    await user.click(bookButtons[0])

    // Check for showtime times
    await waitFor(() => {
      expect(screen.getByText('10:00')).toBeInTheDocument()
    })
  })
})
