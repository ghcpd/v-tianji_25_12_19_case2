export type Seat = { id: string; row: string; col: number; price: number; reserved?: boolean }
export type Showtime = { id: string; time: string; seats: Seat[] }
export type Movie = { id: string; title: string; poster?: string; duration: string; description: string; showtimes: Showtime[] }

// Simple mock data
export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Last Voyage',
    poster: '',
    duration: '1h 45m',
    description: 'An epic sea adventure.',
    showtimes: [
      {
        id: 's1',
        time: '13:00',
        seats: generateSeats(5, 8)
      },
      {
        id: 's2',
        time: '18:00',
        seats: generateSeats(6, 9)
      }
    ]
  },
  {
    id: '2',
    title: 'Spacebound',
    poster: '',
    duration: '2h 10m',
    description: 'A sci-fi thriller beyond the stars.',
    showtimes: [
      {
        id: 's3',
        time: '15:30',
        seats: generateSeats(6, 10)
      }
    ]
  }
]

function generateSeats(rows: number, cols: number) {
  const seats: Seat[] = []
  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r)
    for (let c = 1; c <= cols; c++) {
      seats.push({ id: `${rowLetter}${c}`, row: rowLetter, col: c, price: 10 + (r > 2 ? 2 : 0), reserved: Math.random() < 0.12 })
    }
  }
  return seats
}
