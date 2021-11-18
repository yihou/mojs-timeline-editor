import { combineReducers, Reducer } from 'redux'
import recycleState from 'redux-recycle'
import { timelineSlice } from './timeline'
import { mainPanelSlice } from './mainPanel'
import { controlsSlice } from './controls'
import { pointsSlice } from './points'
import { selectedSpotSlice } from './selectedSpot'
import { mojsSlice } from './mojs'

export const SET_APP_STATE = 'SET_APP_STATE'

export const allReducers: Reducer = recycleState(
  combineReducers({
    [timelineSlice.name]: timelineSlice.reducer,
    [mainPanelSlice.name]: mainPanelSlice.reducer,
    [controlsSlice.name]: controlsSlice.reducer,
    [pointsSlice.name]: pointsSlice.reducer,
    [selectedSpotSlice.name]: selectedSpotSlice.reducer,
    [mojsSlice.name]: mojsSlice.reducer
  }),
  [SET_APP_STATE],
  (_state, action) => action.data
)
