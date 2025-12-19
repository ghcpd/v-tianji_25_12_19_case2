import React from 'react'
import { useBookingStore } from '../store/booking'

export default function HistoryPage() {
  const bookings = useBookingStore((s) => s.bookings)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      {bookings.length === 0 && <div className="text-gray-600">No bookings yet.</div>}
      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{b.name}</div>
                <div className="text-sm text-gray-600">{b.seats.map((s: any) => s.id).join(', ')}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${b.total}</div>
                <div className="text-xs text-gray-500">{new Date(b.createdAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
