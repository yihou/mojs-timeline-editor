import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ToolsType {
  PLUS = 'plus',
  HTML = 'html'
}

export interface ControlsStates {
  selected?: ToolsType
  isMouseInside: boolean
}

const initialState: ControlsStates = {
  selected: undefined,
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
      state.selected =
        action.payload === state.selected ? undefined : action.payload
    },
    toolsResetSelected: (state) => {
      state.selected = undefined
    },
    controlsSetMouseInside: (state, action: PayloadAction<boolean>) => {
      state.isMouseInside = action.payload
    }
  }
})
