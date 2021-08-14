import { combineReducers, Reducer } from 'redux'
import recycleState from 'redux-recycle'
import { progressSlice } from './progress'
import { mainPanelSlice } from './mainPanel'
import { controlsSlice } from './controls'
import { pointsSlice } from './points'
import { selectedSpotSlice } from './selectedSpot'

export const SET_APP_STATE = 'SET_APP_STATE'

export const allReducers: Reducer = recycleState(
  combineReducers({
    [progressSlice.name]: progressSlice.reducer,
    [mainPanelSlice.name]: mainPanelSlice.reducer,
    [controlsSlice.name]: controlsSlice.reducer,
    [pointsSlice.name]: pointsSlice.reducer,
    [selectedSpotSlice.name]: selectedSpotSlice.reducer
  }),
  [SET_APP_STATE],
  (_state, action) => action.data
)
