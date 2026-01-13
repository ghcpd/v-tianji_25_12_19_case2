import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingProvider from './context/BookingContext';
import MovieList from './components/MovieList';
import ShowtimeSelector from './components/ShowtimeSelector';
import SeatMap from './components/SeatMap';
import BookingForm from './components/BookingForm';
import BookingHistory from './components/BookingHistory';
import Header from './components/Header';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<ShowtimeSelector />} />
          <Route path="/showtime/:id" element={<SeatMap />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/history" element={<BookingHistory />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;