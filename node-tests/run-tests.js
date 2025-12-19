(async ()=>{
  const assert = require('assert')
  const mod = await import('../src/state/reducer.testable.js')
  const { reducer, initialState, actions } = mod
  function clone(obj){ return JSON.parse(JSON.stringify(obj)) }
  function testInitial(){
    const s = clone(initialState)
    assert(Array.isArray(s.movies) && s.movies.length >= 1, 'movies present')
    assert(s.selectedMovieId, 'selectedMovieId present')
    assert(s.selectedShowtimeId, 'selectedShowtimeId present')
  }
  function testSelectMovie(){
    let s = clone(initialState)
    const targetMovie = s.movies[1]
    s = reducer(s, { type: actions.SELECT_MOVIE, payload: { movieId: targetMovie.id, showtimeId: targetMovie.showtimes[1].id } })
    assert.strictEqual(s.selectedMovieId, targetMovie.id)
    assert.strictEqual(s.selectedShowtimeId, targetMovie.showtimes[1].id)
  }
  function testToggleAndConfirm(){
    let s = clone(initialState)
    const movie = s.movies[0]
    const st = movie.showtimes[0]
    const occupied = st.seats.find(se => se.occupied)
    const free = st.seats.find(se => !se.occupied)
    const s2 = reducer(s, { type: actions.TOGGLE_SEAT, payload: { seatId: occupied.id } })
    assert.strictEqual(s2.selectedSeats.length, 0)
    let s3 = reducer(s, { type: actions.TOGGLE_SEAT, payload: { seatId: free.id } })
    assert.strictEqual(s3.selectedSeats.length, 1)
    const s4 = reducer(s3, { type: actions.CONFIRM_BOOKING })
    assert.strictEqual(s4.orders.length, 1)
    const updated = s4.movies.find(m=>m.id===movie.id).showtimes.find(stt=>stt.id===st.id)
    const seatNow = updated.seats.find(ss=>ss.id===free.id)
    assert.strictEqual(seatNow.occupied, true)
  }
  try{
    console.log('Running node-based reducer tests...')
    testInitial()
    testSelectMovie()
    testToggleAndConfirm()
    console.log('All node tests passed ✅')
    process.exit(0)
  }catch(err){
    console.error('Tests failed:', err && err.message)
    process.exit(2)
  }
})()
