import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Timeline } from '@mojs/core'
import MojsPlayer from '@mojs/player'
import { GlobalState } from '../types'

export interface MojsStates {
  timeline?: Timeline
  player?: MojsPlayer
}

export const initialState: MojsStates = {
  timeline: undefined,
  player: undefined
}

const reducers = {
  setTimeline(state, action: PayloadAction<undefined | Timeline>) {
    console.log(action.payload)
    state.timeline = action.payload
  },
  setPlayer(state, action: PayloadAction<undefined | MojsPlayer>) {
    state.player = action.payload
  },
  reset(state) {
    state.timeline = undefined
    state.player = undefined
  }
}

export const mojsSlice = createSlice<MojsStates, typeof reducers>({
  name: 'mojs',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers
})

const globalState = (state: GlobalState) => state

export const mojsSelector = createSelector(globalState, (state) => state.mojs)
