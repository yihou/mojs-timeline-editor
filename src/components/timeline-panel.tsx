import * as React from 'react'
import { Component, ReactNode } from 'react'

import { constants } from '../constants'

const CLASSES = require('../css/blocks/timeline-panel.postcss.css.json')
require('../css/blocks/timeline-panel')

interface TimelinePanelProps {
  time: number
  scale?: number
}

interface TimelinePanelStates {
  scale: number
  dashesPerSec: number
  DASH_STEP: number
}

export class TimelinePanel extends Component<
  TimelinePanelProps,
  TimelinePanelStates
> {
  _dashesCnt = 0
  _timeline: ReactNode = null

  constructor(props) {
    super(props)

    const DASHES_PER_SEC = 20
    this.state = {
      scale: props.scale || 1,
      dashesPerSec: DASHES_PER_SEC,
      DASH_STEP: 100 * (1 / DASHES_PER_SEC)
    }

    this._dashesCnt = props.time * this.state.dashesPerSec
  }

  render() {
    return <div className={CLASSES['timeline-panel']}>{this._timeline}</div>
  }

  componentWillMount() {
    this._timeline = this._createTimeline()
  }

  // will be removed when `preact` issue with nested `svg` will be fixed
  componentDidMount() {
    // this._svg.current?.classList.add(CLASSES['main-svg'])
  }

  _createTimeline = () => {
    const dashes = this._compileDashes()
    const pointerValues = this._compileLabels()
    const { scale } = this.state

    return (
      <svg>
        <g style={{ fontSize: `${scale}px` }}>
          {dashes}
          {pointerValues}
        </g>
      </svg>
    )
  }

  _createDash(dashNumber) {
    const { dashesPerSec, DASH_STEP } = this.state
    const dashType = this._getDashType(dashNumber, dashesPerSec)

    const color = dashType === 'large' ? '#fff' : '#ae9bae'
    const height = dashType === 'large' ? 7 : dashType === 'middle' ? 6 : 4
    const x = DASH_STEP * dashNumber
    const y = constants.TIMELINE_HEIGHT - height

    return <rect width='1' height={height} x={`${x}em`} y={y} fill={color} />
  }

  _getDashType(dashNumber, dashesPerSec) {
    const isLarge = !(dashNumber % (dashesPerSec / 2)) || dashNumber === 0
    const isMiddle = !(dashNumber % (dashesPerSec / 4))
    return isLarge ? 'large' : isMiddle ? 'middle' : 'small'
  }

  _compileDashes = () => {
    const dashes: ReactNode[] = []
    for (let j = 0; j <= this._dashesCnt; j++) {
      dashes.push(this._createDash(j))
    }

    return dashes
  }

  _compileLabels = () => {
    const labels: ReactNode[] = []
    const { dashesPerSec, DASH_STEP } = this.state

    for (
      let j = 0, value = 0;
      j <= this._dashesCnt;
      j += dashesPerSec / 2, value += 500
    ) {
      const textAnchor = j === 0 ? 'start' : 'middle'
      const x = DASH_STEP * j
      const y = constants.TIMELINE_HEIGHT / 2

      labels.push(
        <svg x={`${x}em`} style={{ overflow: 'visible' }}>
          <text y={y} className={CLASSES.label} textAnchor={textAnchor}>
            {value}
          </text>
        </svg>
      )
    }

    return labels
  }
}
