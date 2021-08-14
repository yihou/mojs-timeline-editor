import * as React from 'react'
import { Component, ReactNode } from 'react'

import { PointTimelineLine } from './point-timeline-line'
// import resetEvent from '../helpers/global-reset-event';

const CLASSES = require('../css/blocks/timelines-panel.postcss.css.json')
require('../css/blocks/timelines-panel')

interface TimelinesPanelProps {
  state: any
}

export class TimelinesPanel extends Component<TimelinesPanelProps> {
  render() {
    return (
      <div className={CLASSES['timelines-panel']}>
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
