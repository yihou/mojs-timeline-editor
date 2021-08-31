import { MainPanelStates } from '../reducers/mainPanel'
import { ControlsStates } from '../reducers/controls'
import { PointsState } from '../reducers/points'
import { SelectedSpot } from '../reducers/selectedSpot'

export interface GlobalState {
  progress: number
  mainPanel: MainPanelStates
  controls: ControlsStates
  points: PointsState
  selectedSpot: SelectedSpot
}
