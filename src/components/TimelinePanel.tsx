import { Component, createRef, ReactNode } from 'react'

import { constants } from '../constants'
import styled from '@emotion/styled'

const TimelinePanelWrapper = styled.div`
  position: relative;
  top: -20px;
  height: 22px;
  background: var(--mojs-color-light-purple);
  box-shadow: 0 2px 4px black;
`

const TimelinePanelMainSvg = styled.svg`
  width: 100%;
  height: 100%;
`

const TimelinePanelLabel = styled.text`
  fill: var(--mojs-color-white);
  font-size: 7px;
`

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
  _svg = createRef<SVGSVGElement>()
  _dashesCnt = 0

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
    const dashes = this._compileDashes()
    const pointerValues = this._compileLabels()
    const { scale } = this.state

    return (
      <TimelinePanelWrapper>
        <TimelinePanelMainSvg ref={this._svg}>
          <g style={{ fontSize: `${scale}px` }}>
            {dashes}
            {pointerValues}
          </g>
        </TimelinePanelMainSvg>
      </TimelinePanelWrapper>
    )
  }

  _createDash(dashNumber) {
    const { dashesPerSec, DASH_STEP } = this.state
    const dashType = this._getDashType(dashNumber, dashesPerSec)

    const color = dashType === 'large' ? '#fff' : '#ae9bae'
    const height = dashType === 'large' ? 7 : dashType === 'middle' ? 6 : 4
    const x = DASH_STEP * dashNumber
    const y = constants.TIMELINE_HEIGHT - height

    return (
      <rect
        key={dashNumber}
        width="1"
        height={height}
        x={`${x}em`}
        y={y}
        fill={color}
      />
    )
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
        <svg key={j} x={`${x}em`} style={{ overflow: 'visible' }}>
          <TimelinePanelLabel y={y} textAnchor={textAnchor}>
            {value}
          </TimelinePanelLabel>
        </svg>
      )
    }

    return labels
  }
}
