import { combineReducers, Reducer } from 'redux'
import recycleState from 'redux-recycle'
import { progress } from './progress-reducer'
import { mainPanel } from './main-panel-reducer'
import { controls } from './controls-reducer'
import { points } from './points-reducer'
import { selectedSpot } from './selected-spot'

export const SET_APP_STATE = 'SET_APP_STATE'

export const allReducers: Reducer = recycleState(
  combineReducers({
    progress,
    mainPanel,
    controls,
    points,
    selectedSpot
  }),
  [SET_APP_STATE],
  (_state, action) => action.data
)
