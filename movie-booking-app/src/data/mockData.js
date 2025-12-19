// Mock data for movies, showtimes, and bookings
export const MOVIES = [
  {
    id: '1',
    title: 'The Quantum Paradox',
    genre: 'Sci-Fi',
    rating: 'PG-13',
    duration: 148,
    description: 'A mind-bending journey through parallel dimensions.',
    poster: '🚀',
  },
  {
    id: '2',
    title: 'Hearts in Motion',
    genre: 'Romance',
    rating: 'PG',
    duration: 122,
    description: 'Two souls find love against all odds.',
    poster: '💕',
  },
  {
    id: '3',
    title: 'Shadow Protocol',
    genre: 'Thriller',
    rating: 'R',
    duration: 135,
    description: 'A government agent uncovers a deadly conspiracy.',
    poster: '🕵️',
  },
  {
    id: '4',
    title: 'Enchanted Kingdom',
    genre: 'Fantasy',
    rating: 'PG',
    duration: 156,
    description: 'An epic adventure in a magical realm.',
    poster: '🏰',
  },
  {
    id: '5',
    title: 'Cosmic Quest',
    genre: 'Sci-Fi',
    rating: 'PG-13',
    duration: 162,
    description: 'Explorers venture into the depths of space.',
    poster: '🌌',
  },
  {
    id: '6',
    title: 'The Last Laugh',
    genre: 'Comedy',
    rating: 'PG',
    duration: 104,
    description: 'A hilarious journey of friendship and comedy.',
    poster: '😂',
  },
];

export const SHOWTIMES = [
  {
    id: 'st1',
    movieId: '1',
    date: '2025-12-20',
    time: '10:00',
    format: '2D',
    language: 'English',
    pricePerSeat: 12,
    hallNumber: 1,
  },
  {
    id: 'st2',
    movieId: '1',
    date: '2025-12-20',
    time: '13:30',
    format: '3D',
    language: 'English',
    pricePerSeat: 15,
    hallNumber: 2,
  },
  {
    id: 'st3',
    movieId: '1',
    date: '2025-12-20',
    time: '19:00',
    format: '2D',
    language: 'English',
    pricePerSeat: 12,
    hallNumber: 1,
  },
  {
    id: 'st4',
    movieId: '2',
    date: '2025-12-20',
    time: '14:00',
    format: '2D',
    language: 'English',
    pricePerSeat: 12,
    hallNumber: 3,
  },
  {
    id: 'st5',
    movieId: '2',
    date: '2025-12-20',
    time: '21:00',
    format: '2D',
    language: 'English',
    pricePerSeat: 12,
    hallNumber: 3,
  },
  {
    id: 'st6',
    movieId: '3',
    date: '2025-12-20',
    time: '16:30',
    format: '2D',
    language: 'English',
    pricePerSeat: 14,
    hallNumber: 4,
  },
  {
    id: 'st7',
    movieId: '4',
    date: '2025-12-20',
    time: '18:00',
    format: '3D',
    language: 'English',
    pricePerSeat: 16,
    hallNumber: 5,
  },
];

// Generate seat layout for a hall (8 rows x 10 columns)
export const generateSeats = (hallNumber) => {
  const seats = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = 10;
  
  for (let i = 0; i < rows.length; i++) {
    for (let j = 1; j <= cols; j++) {
      const seatId = `${rows[i]}${j}`;
      // Random seat availability (80% available)
      const isAvailable = Math.random() > 0.2;
      seats.push({
        id: seatId,
        row: rows[i],
        number: j,
        available: isAvailable,
        price: i < 2 ? 12 : i < 5 ? 14 : 16, // Different prices for different sections
      });
    }
  }
  return seats;
};

export const SEAT_LAYOUTS = {
  1: generateSeats(1),
  2: generateSeats(2),
  3: generateSeats(3),
  4: generateSeats(4),
  5: generateSeats(5),
};
