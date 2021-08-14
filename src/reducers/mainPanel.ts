import { constants } from '../constants'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const INITIAL_SIZE = 400
const initialState = {
  prevHeight: INITIAL_SIZE,
  ySize: INITIAL_SIZE,
  isHidden: false,
  isTransition: false
}

export const mainPanelSlice = createSlice({
  name: 'mainPanel',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    hideToggle: (state) => {
      const isHidden = !state.isHidden
      const ySize = isHidden ? constants.PLAYER_HEIGHT : state.prevHeight
      const prevHeight = isHidden ? state.ySize : constants.PLAYER_HEIGHT
      const isTransition = true

      return { ...state, isHidden, ySize, prevHeight, isTransition }
    },
    setYSize: (state, action: PayloadAction<number>) => {
      return { ...state, ySize: state.ySize - action.payload }
    },
    resetTransition: (state) => {
      return { ...state, isTransition: false }
    },
    saveYPrev: (state) => {
      return { ...state, prevHeight: state.ySize }
    },
    setHidden: (state, action: PayloadAction<boolean>) => {
      return { ...state, isHidden: action.payload }
    }
  }
})
