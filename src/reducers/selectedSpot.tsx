import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SelectedSpot {
  id: string | undefined
  spotIndex: number | undefined
  type: string | undefined
  prop: any
}

// Define the initial state using that type
const initialState: SelectedSpot = Object.freeze({
  id: undefined,
  spotIndex: undefined,
  type: undefined,
  prop: undefined
})

export const selectedSpotSlice = createSlice({
  name: 'selectedSpot',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedSpot: (state, action: PayloadAction<SelectedSpot>) => {
      state = action.payload
      return state
    },
    resetSelectedSpot: (state) => {
      state = initialState
      return state
    }
  }
})
