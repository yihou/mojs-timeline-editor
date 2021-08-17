import { MainPanelStates } from '../src/reducers/mainPanel'
import { ControlsStates } from '../src/reducers/controls'
import { PointsState } from '../src/reducers/points'
import { SelectedSpot } from '../src/reducers/selectedSpot'

export interface GlobalState {
  progress: number
  mainPanel: MainPanelStates
  controls: ControlsStates
  points: PointsState
  selectedSpot: SelectedSpot
}
