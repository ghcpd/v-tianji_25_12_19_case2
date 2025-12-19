import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AppProvider } from '../state/store.jsx'

function renderApp(){
  return render(
    <AppProvider>
      <App />
    </AppProvider>
  )
}

describe('App integration', ()=>{
  test('renders movies and seat map and lets user book', async ()=>{
    const user = userEvent.setup()
    renderApp()
    // we should see movie titles
    expect(screen.getByText(/Starlight Odyssey/)).toBeInTheDocument()
    // click a showtime for second movie
    const neon = screen.getByText(/Neon Samurai/).closest('.card')
    const neonShowtime = within(neon).getByText(/16:45/)
    await user.click(neonShowtime)
    // the seat map should update to that showtime
    const seatMap = screen.getByTestId('seat-map')
    expect(seatMap).toBeInTheDocument()
    // pick a free seat (first non-occupied)
    const seat = within(seatMap).getAllByRole('button').find(el => el.getAttribute('aria-disabled') === 'false')
    expect(seat).toBeDefined()
    await user.click(seat)
    // confirm booking
    const confirm = screen.getByRole('button', { name: /confirm booking/i })
    await user.click(confirm)
    // after booking, recent orders should show one
    expect(await screen.findByText(/Recent orders/)).toBeInTheDocument()
    // ensure there is at least one order in the history list
    expect(screen.getAllByText(/tickets?/i).length).toBeGreaterThan(0)
  })
})
