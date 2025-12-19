import React, { createContext, useContext, useReducer } from 'react'
import type { Movie } from '~/data/mockData'

export type Seat = { id: string; row: number; col: number; type: 'standard' | 'premium'; reserved?: boolean }
export type Order = { id: string; movieId: string; showtimeId: string; seats: Seat[]; total: number; time: string }

type State = {
  orders: Order[]
}

type Action = { type: 'ADD_ORDER'; payload: Order } | { type: 'RESET' }

const initialState: State = { orders: [] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
