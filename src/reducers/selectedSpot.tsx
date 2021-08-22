import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SelectedSpot {
  id: string | undefined
  spotIndex: number | undefined
  type: string | undefined
  prop: any
}

// Define the initial state using that type
const initialState: SelectedSpot = {
  id: undefined,
  spotIndex: undefined,
  type: undefined,
  prop: undefined
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
