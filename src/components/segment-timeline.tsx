import * as React from 'react'
import { Component } from 'react'

import { Spot } from './spot'
import { Easing } from './easing'

require('../css/blocks/segment-timeline')

export interface SegmentTimelineProps {
  state: any
  meta: any
  entireState: any
}

export class SegmentTimeline extends Component<SegmentTimelineProps> {
  render() {
    return (
      <div className='segment-timeline' data-component='segment-timeline'>
        <div className='segment-timeline__bar'>
          <div className='segment-timeline__delay' />
          <Spot type='start' {...this.props} />
          <Spot type='end' {...this.props}>
            <Easing {...this.props} />
          </Spot>
        </div>
      </div>
    )
  }
}
