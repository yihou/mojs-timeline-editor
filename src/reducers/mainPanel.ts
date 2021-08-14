import { constants } from '../constants'

const INITIAL_SIZE = 400
const INITIAL_STATE = {
  prevHeight: INITIAL_SIZE,
  ySize: INITIAL_SIZE,
  isHidden: false,
  isTransition: false
}

export enum MainPanelConstants {
  MAIN_PANEL_HIDE_TOGGLE = 'MAIN_PANEL_HIDE_TOGGLE',
  MAIN_PANEL_SET_YSIZE = 'MAIN_PANEL_SET_YSIZE',
  MAIN_PANEL_RESET_TRANSITION = 'MAIN_PANEL_RESET_TRANSITION',
  MAIN_PANEL_SAVE_YPREV = 'MAIN_PANEL_SAVE_YPREV',
  MAIN_PANEL_SET_HIDDEN = 'MAIN_PANEL_SET_HIDDEN'
}

export const mainPanel = (state = INITIAL_STATE, action) => {
  const isHidden = !state.isHidden
  const ySize = isHidden ? constants.PLAYER_HEIGHT : state.prevHeight
  const prevHeight = isHidden ? state.ySize : constants.PLAYER_HEIGHT
  const isTransition = true

  switch (action.type) {
    case MainPanelConstants.MAIN_PANEL_HIDE_TOGGLE:
      return { ...state, isHidden, ySize, prevHeight, isTransition }

    case MainPanelConstants.MAIN_PANEL_SET_YSIZE:
      return { ...state, ySize: state.ySize - action.data }

    case MainPanelConstants.MAIN_PANEL_RESET_TRANSITION:
      return { ...state, isTransition: false }

    case MainPanelConstants.MAIN_PANEL_SAVE_YPREV:
      return { ...state, prevHeight: state.ySize }

    case MainPanelConstants.MAIN_PANEL_SET_HIDDEN:
      return { ...state, isHidden: action.data }
    default:
      return state
  }
}
