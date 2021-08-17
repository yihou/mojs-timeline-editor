import { Component, ReactNode } from 'react'

import { PointLine } from './point-line'
import { css } from '@emotion/react'
import { GlobalState } from '../../../types/store'

interface PointsPanelProps {
  state: any
  entireState: GlobalState
}

export class PointsPanel extends Component<PointsPanelProps> {
  render() {
    const { state } = this.props

    return (
      <div
        css={css`
          background: rgba(0, 0, 0, 0.1);
        `}
      >
        {this._renderPoints(state)}
      </div>
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
