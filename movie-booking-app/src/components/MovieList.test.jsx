import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookingProvider } from '../context/BookingContext'
import MovieList from './MovieList'

describe('MovieList Component', () => {
  const renderMovieList = (onSelectMovie = vi.fn()) => {
    return render(
      <BookingProvider>
        <MovieList onSelectMovie={onSelectMovie} />
      </BookingProvider>
    )
  }

  it('should render movie list heading', () => {
    renderMovieList()
    expect(screen.getByText('Now Showing')).toBeInTheDocument()
  })

  it('should display all movies', () => {
    renderMovieList()
    expect(screen.getByText('The Quantum Paradox')).toBeInTheDocument()
    expect(screen.getByText('Hearts in Motion')).toBeInTheDocument()
    expect(screen.getByText('Shadow Protocol')).toBeInTheDocument()
    expect(screen.getByText('Enchanted Kingdom')).toBeInTheDocument()
    expect(screen.getByText('Cosmic Quest')).toBeInTheDocument()
    expect(screen.getByText('The Last Laugh')).toBeInTheDocument()
  })

  it('should display movie details correctly', () => {
    renderMovieList()
    expect(screen.getAllByText('Sci-Fi').length).toBeGreaterThan(0)
    expect(screen.getAllByText('PG-13').length).toBeGreaterThan(0)
    expect(screen.getByText(/A mind-bending journey/)).toBeInTheDocument()
  })

  it('should call onSelectMovie when booking a movie', async () => {
    const onSelectMovie = vi.fn()
    renderMovieList(onSelectMovie)

    const bookButtons = screen.getAllByText('Book Now')
    await userEvent.click(bookButtons[0])

    expect(onSelectMovie).toHaveBeenCalled()
  })

  it('should have correct number of book now buttons', () => {
    renderMovieList()
    const bookButtons = screen.getAllByText('Book Now')
    expect(bookButtons.length).toBe(6)
  })

  it('should display genre and rating badges for each movie', () => {
    renderMovieList()
    const romanceGenre = screen.getByText('Romance')
    const rRating = screen.getByText('R')
    
    expect(romanceGenre).toBeInTheDocument()
    expect(rRating).toBeInTheDocument()
  })

  it('should display movie durations', () => {
    renderMovieList()
    expect(screen.getByText(/Duration: 148 min/)).toBeInTheDocument()
  })
})
