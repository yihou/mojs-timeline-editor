import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = 0

const reducers = {
  setProgress: (_state, action: PayloadAction<number>) => {
    return action.payload
  }
}

export const progressSlice = createSlice<number, typeof reducers>({
  name: 'progress',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers
})
