import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TimelineStates {
  progress: number
}

export const initialState: TimelineStates = {
  progress: 0
}

const TIMELINE_MAX = 10000

export const clampDeltaX = (
  deltaX: number,
  progress: number,
  max: number = TIMELINE_MAX
) => {
  // if less than 0, use negative of progress
  if (progress + deltaX < 0) {
    deltaX = -progress
  }

  if (progress + deltaX > max) {
    deltaX = max - progress
  }

  return deltaX
}

const reducers = {
  updateProgress(state, action: PayloadAction<number>) {
    const deltaX = action.payload

    state.progress = state.progress + clampDeltaX(deltaX, state.progress)

    return state
  }
}

export const timelineSlice = createSlice<TimelineStates, typeof reducers>({
  name: 'timeline',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers
})
