import { constants } from '../constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MainPanelStates {
  prevHeight: number
  ySize: number
  isHidden: boolean
  isTransition: boolean
}

const INITIAL_SIZE = 400
const initialState: MainPanelStates = {
  prevHeight: INITIAL_SIZE,
  ySize: INITIAL_SIZE,
  isHidden: false,
  isTransition: false
}

const reducers = {
  hideToggle(state) {
    const isHidden = !state.isHidden
    const oldHeight = isHidden ? state.ySize : state.prevHeight

    state.isHidden = isHidden
    state.prevHeight = isHidden ? oldHeight : constants.PLAYER_HEIGHT
    state.ySize = isHidden ? constants.PLAYER_HEIGHT : oldHeight
    state.isTransition = true
  },
  setYSize(state, action: PayloadAction<number>) {
    state.ySize = state.ySize - action.payload

    // if height is more than player height, let's treat it as open
    if (state.ySize > constants.PLAYER_HEIGHT + 10) {
      state.isHidden = false
    }
  },
  saveYPrev(state) {
    // reset `isTransition` state that is responsible
    // for removing transition from MainPanel
    if (state.isTransition) {
      state.isTransition = false
    }
    state.prevHeight = state.ySize
  },
  setHidden(state, action: PayloadAction<boolean>) {
    state.isHidden = action.payload
  }
}

export const mainPanelSlice = createSlice<MainPanelStates, typeof reducers>({
  name: 'mainPanel',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers
})
