import React from 'react'
import { useApp } from './state/store.jsx'

function App(){
  const api = useApp()
  const { movies, selectedMovieId, selectedShowtimeId } = api.state
  const movie = movies.find(m=>m.id===selectedMovieId)
  const showtime = movie.showtimes.find(s=>s.id===selectedShowtimeId)

  return (
    <div className="app">
      <div className="header">
        <div className="brand">
          <div className="logo">MT</div>
          <div>
            <div className="title">Movie Theater</div>
            <div className="subtitle">Browse movies, pick seats and confirm bookings</div>
          </div>
        </div>
        <div style={{textAlign:'right'}}>
          <div className="small">Modern demo • Frontend-only</div>
          <div className="subtitle">Mock data • In-memory orders</div>
        </div>
      </div>

      <div className="layout">
        <div>
          <div className="card">
            <h3 style={{margin:0}}>Now showing</h3>
            <div className="note">Select a movie and a showtime to pick seats</div>
            <div style={{height:14}} />
            <MovieList />
          </div>

          <div style={{height:14}} />

          <div className="card">
            <h3 style={{margin:0}}>Seat selection — {movie.title} • {showtime.time}</h3>
            <div className="note">Click seats to select. Occupied seats are disabled.</div>
            <div style={{height:10}} />
            <SeatMap movie={movie} showtime={showtime} />
          </div>
        </div>

        <div className="right">
          <div className="card section">
            <h4 style={{margin:0}}>Checkout</h4>
            <Checkout movie={movie} showtime={showtime} />
          </div>

          <div style={{height:12}} />

          <div className="card section">
            <h4 style={{margin:0}}>Booking history</h4>
            <History />
          </div>

          <div className="footer card">Tip: This is a demo app with in-memory bookings saved in runtime only.</div>
        </div>
      </div>
    </div>
  )
}

function MovieList(){
  const api = useApp()
  const { movies, selectedMovieId, selectedShowtimeId } = api.state
  return (
    <div className="movie-grid">
      {movies.map(m => (
        <div key={m.id} className="card">
          <div className="movie-card">
            <div className="poster">{m.posterText}</div>
            <div className="movie-info">
              <div className="movie-title">{m.title}</div>
              <div className="meta">{m.runtime} min • {m.rating}</div>

              <div className="showtimes">
                {m.showtimes.map(st => (
                  <div key={st.id}
                    className={`showtime ${selectedMovieId===m.id && selectedShowtimeId===st.id ? 'selected':''}`}
                    onClick={() => api.selectMovie(m.id, st.id)}
                    role="button"
                    aria-pressed={selectedMovieId===m.id && selectedShowtimeId===st.id}
                  >
                    {st.time} • ${st.price.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SeatMap({ movie, showtime }){
  const api = useApp()
  const { selectedSeats } = api.state
  return (
    <div>
      <div className="seat-map" data-testid="seat-map">
        {showtime.seats.map(s => {
          const cls = ['seat']
          if(s.occupied) cls.push('occupied')
          if(selectedSeats.includes(s.id)) cls.push('selected')
          return (
            <div key={s.id}
              className={cls.join(' ')}
              onClick={() => api.toggleSeat(s.id)}
              role="button"
              aria-pressed={selectedSeats.includes(s.id)}
              aria-disabled={s.occupied}
              data-seat-id={s.id}
            >{s.label}</div>
          )
        })}
      </div>

      <div className="legend">
        <div style={{display:'flex',gap:8,alignItems:'center'}}><span className="box" style={{width:18,height:18,background:'linear-gradient(90deg,#065f67,#0ea5a9)'}}></span> Selected</div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}><span className="box" style={{width:18,height:18,background:'#2b2b2b'}}></span> Occupied</div>
        <div style={{flex:1}} />
        <div className="small">Rows 1–{Math.ceil(showtime.seats.length/8)}</div>
      </div>
    </div>
  )
}

function Checkout({ movie, showtime }){
  const api = useApp()
  const { selectedSeats, orders } = api.state
  const qty = selectedSeats.length
  const subtotal = qty * showtime.price
  return (
    <div>
      <div className="small">Movie</div>
      <div style={{fontWeight:700}}>{movie.title}</div>
      <div className="note">Showtime: <strong>{showtime.time}</strong> • ${showtime.price.toFixed(2)} per ticket</div>

      <div style={{height:12}} />

      <div className="small">Your selection</div>
      <div className="checkout-item">
        <div>{qty} ticket(s)</div>
        <div>${subtotal.toFixed(2)}</div>
      </div>

      <div style={{height:12}} />

      <div style={{display:'flex',gap:8}}>
        <button className="btn" onClick={() => api.clearSelection()}>Clear</button>
        <button className="btn primary" onClick={() => api.confirmBooking()} disabled={qty===0}>Confirm booking</button>
      </div>

      <div style={{height:12}} />

      <div className="small">Recent orders</div>
      {orders.length === 0 ? (
        <div className="empty">You have no bookings yet — confirm one to see it here.</div>
      ) : (
        <div className="history-list">
          {orders.slice(0,3).map(o => (
            <div className="history-item" key={o.id}>
              <div>
                <div style={{fontWeight:700}}>{o.movieTitle}</div>
                <div className="meta">{o.showtimeLabel} • {o.seats.length} tickets</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="total">${o.total.toFixed(2)}</div>
                <div className="meta">{new Date(o.createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function History(){
  const api = useApp()
  const { orders } = api.state
  if(orders.length === 0) return <div className="empty">No bookings yet — try selecting seats and confirming a booking.</div>
  return (
    <div className="history-list">
      {orders.map(o => (
        <div className="history-item" key={o.id}>
          <div>
            <div style={{fontWeight:700}}>{o.movieTitle}</div>
            <div className="meta">{o.showtimeLabel} • {o.seats.length} tickets</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div className="total">${o.total.toFixed(2)}</div>
            <div className="meta">{new Date(o.createdAt).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
