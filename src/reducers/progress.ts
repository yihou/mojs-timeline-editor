import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState = 1

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
