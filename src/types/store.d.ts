import { MainPanelStates } from '../reducers/mainPanel'
import { ControlsStates } from '../reducers/controls'
import { PointsState } from '../reducers/points'
import { SelectedSpot } from '../reducers/selectedSpot'
import { TimelineStates } from '../reducers/timeline'

export interface GlobalState {
  timeline: TimelineStates
  mainPanel: MainPanelStates
  controls: ControlsStates
  points: PointsState
  selectedSpot: SelectedSpot
}
