import * as React from 'react'
import { Component, ReactNode } from 'react'

import { PointLine } from './point-line'

const CLASSES = require('../../../css/blocks/points-panel.postcss.css.json')
require('../../../css/blocks/points-panel')

interface PointsPanelProps {
  state: any
  entireState: any
}

export class PointsPanel extends Component<PointsPanelProps> {
  render() {
    const { state } = this.props

    return (
      <div className={CLASSES['points-panel']}>{this._renderPoints(state)}</div>
    )
  }

  _renderPoints(state) {
    const { entireState } = this.props
    const props = Object.keys(state)
    const points: ReactNode[] = []
    for (let i = 0; i < props.length; i++) {
      const key = props[i]
      points.push(<PointLine state={state[key]} entireState={entireState} />)
    }
    return points
  }
}
