export type Movie = {
  id: string
  title: string
  duration: number
  rating: string
  poster?: string
  description?: string
  showtimes: Array<{ id: string; time: string; auditorium: string; price: number }>
}

export const movies: Movie[] = [
  {
    id: 'm1',
    title: 'The Last Sunrise',
    duration: 128,
    rating: 'PG-13',
    poster: '',
    description: 'An emotional journey about family and hope.',
    showtimes: [
      { id: 's1', time: '13:30', auditorium: 'A', price: 12 },
      { id: 's2', time: '16:00', auditorium: 'A', price: 12 },
      { id: 's3', time: '19:30', auditorium: 'B', price: 15 }
    ]
  },
  {
    id: 'm2',
    title: 'Neon Horizon',
    duration: 112,
    rating: 'R',
    poster: '',
    description: 'A slick cyber-noir thriller exploring identity.',
    showtimes: [
      { id: 's4', time: '14:00', auditorium: 'B', price: 11 },
      { id: 's5', time: '18:00', auditorium: 'B', price: 14 },
      { id: 's6', time: '21:00', auditorium: 'C', price: 16 }
    ]
  }
]
