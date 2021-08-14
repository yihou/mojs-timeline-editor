import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SelectedSpot {
  id: string | null
  spotIndex: number | null
  type: string | null
  prop: any
}

// Define the initial state using that type
const initialState: SelectedSpot = {
  id: null,
  spotIndex: null,
  type: null,
  prop: null
}

export const selectedSpotSlice = createSlice({
  name: 'selectedSpot',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedSpot: (_state, action: PayloadAction<SelectedSpot>) => {
      return { ...action.payload }
    },
    resetSelectedSpot: () => {
      return { ...initialState }
    }
  }
})
