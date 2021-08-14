export enum ControlsConstants {
  TOOLS_SET_SELECTED = 'TOOLS_SET_SELECTED',
  TOOLS_RESET_SELECTED = 'TOOLS_RESET_SELECTED',
  ADD_POINT = 'ADD_POINT',
  CONTROLS_SET_MOUSE_INSIDE = 'CONTROLS_SET_MOUSE_INSIDE'
}

const INITIAL_STATE = {
  selected: null,
  isMouseInside: false
}

export const controls = (state = INITIAL_STATE, action) => {
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
