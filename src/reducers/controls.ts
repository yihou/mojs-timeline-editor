import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ControlsStates {
  selected: null | 'html' | 'plus'
  isMouseInside: boolean
}

const initialState: ControlsStates = {
  selected: null,
  isMouseInside: false
}

export const controlsSlice = createSlice({
  name: 'controls',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toolsSetSelected: (
      state,
      action: PayloadAction<ControlsStates['selected']>
    ) => {
      const selected = action.payload === state.selected ? null : action.payload
      return { ...state, selected }
    },
    toolsResetSelected: (state) => {
      return { ...state, selected: null }
    },
    controlsSetMouseInside: (state, action: PayloadAction<boolean>) => {
      return { ...state, isMouseInside: action.payload }
    }
  }
})
