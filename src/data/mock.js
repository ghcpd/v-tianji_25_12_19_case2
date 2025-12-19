export const movies = [
  {
    id: 'm1',
    title: 'Starlight Odyssey',
    runtime: 132,
    rating: 'PG-13',
    posterText: 'SO',
    showtimes: [
      { id: 's1', time: '11:00', price: 9.5, seats: generateSeats(64, [2,5,6,12,22]) },
      { id: 's2', time: '14:30', price: 11.0, seats: generateSeats(64, [1,4,7,30,31,32]) },
      { id: 's3', time: '19:15', price: 13.0, seats: generateSeats(64, [0,3,8,9,10,11,25]) }
    ]
  },
  {
    id: 'm2',
    title: 'Neon Samurai',
    runtime: 118,
    rating: 'R',
    posterText: 'NS',
    showtimes: [
      { id: 's4', time: '10:30', price: 8.5, seats: generateSeats(64, [0,1,2,8,9,10]) },
      { id: 's5', time: '16:45', price: 12.0, seats: generateSeats(64, [3,5,18,19]) },
      { id: 's6', time: '20:30', price: 14.0, seats: generateSeats(64, [6,7,8,9,20,21,22]) }
    ]
  }
]

function generateSeats(count, occupiedIdx = []){
  return Array.from({length: count}).map((_,i)=>({
    id: `seat-${i}`,
    label: `${Math.floor(i/8)+1}-${String.fromCharCode(65 + (i%8))}`,
    occupied: occupiedIdx.includes(i)
  }))
}
