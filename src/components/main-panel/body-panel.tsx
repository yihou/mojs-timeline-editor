import { Component } from 'react'

import { PointsPanel } from '../points-panel/points-panel'
import { TimelinesPanel } from '../timelines-panel'

const CLASSES = require('../../css/blocks/body-panel.postcss.css.json')

interface BodyPanelProps {
  state: {
    points
  }
}

export class BodyPanel extends Component<BodyPanelProps> {
  render() {
    const { state } = this.props

    return (
      <div className={CLASSES['body-panel']}>
        <div className={CLASSES['body-panel__left']}>
          <PointsPanel state={state.points} entireState={state} />
        </div>
        <div className={CLASSES['body-panel__right']}>
          <TimelinesPanel state={state} />
        </div>
      </div>
    )
  }
}
