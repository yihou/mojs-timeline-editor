import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ControlsConstants {
  TOOLS_SET_SELECTED = 'TOOLS_SET_SELECTED',
  TOOLS_RESET_SELECTED = 'TOOLS_RESET_SELECTED',
  ADD_POINT = 'ADD_POINT',
  CONTROLS_SET_MOUSE_INSIDE = 'CONTROLS_SET_MOUSE_INSIDE'
}

interface ControlsStates {
  selected: null | 'html' | 'plus'
  isMouseInside: boolean
}

const initialState: ControlsStates = {
  selected: null,
  isMouseInside: false
}

export const controls = (state = initialState, action) => {
  const { data } = action

  switch (action.type) {
    case ControlsConstants.TOOLS_SET_SELECTED: {
      const selected = data === state.selected ? null : data
      return { ...state, selected }
    }
    case ControlsConstants.TOOLS_RESET_SELECTED:
    case ControlsConstants.ADD_POINT: {
      return { ...state, selected: null }
    }

    case ControlsConstants.CONTROLS_SET_MOUSE_INSIDE: {
      return { ...state, isMouseInside: data }
    }
  }
  return state
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
