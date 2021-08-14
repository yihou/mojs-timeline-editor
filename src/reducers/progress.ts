import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = 0

export const progressSlice = createSlice({
  name: 'progress',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProgress: (_state, action: PayloadAction<number>) => {
      return action.payload
    }
  }
})
