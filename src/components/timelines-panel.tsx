import { Component, ReactNode } from 'react'

import { PointTimelineLine } from './point-timeline-line'
import { css } from '@emotion/react'
import { GlobalState } from '../../types/store'

interface TimelinesPanelProps {
  state: GlobalState
}

export class TimelinesPanel extends Component<TimelinesPanelProps> {
  render() {
    return (
      <div
        css={css`
          display: inline-block;
          /*min-width:   100%;*/
          min-width: 1600px;
          min-height: 100%;
        `}
      >
        {this._renderTimelines()}
      </div>
    )
  }

  _renderTimelines() {
    const { state } = this.props
    const { points } = state
    const keys = Object.keys(points)

    const results: ReactNode[] = []
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      results.push(
        <PointTimelineLine state={points[key]} entireState={state} />
      )
    }

    return results
  }
  //
  // componentDidMount() {
  //   const {store} = this.context;
  //   console.log('b');
  //   resetEvent.add( (e) => {
  //     store.dispatch(selectedSpotSlice.actions.resetSelectedSpot())
  //     console.log('a');
  //   });
  // }
}
