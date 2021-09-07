import styled from '@emotion/styled'
import { memo, useRef } from 'react'
import { constants } from '../constants'

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

const DASHES_PER_SEC = 20
const DASH_STEP = 100 * (1 / DASHES_PER_SEC)

interface TimelinePanelProps {
  time: number
  scale?: number
}

const getDashType = (dashNumber, dashesPerSec) => {
  const isLarge = !(dashNumber % (dashesPerSec / 2)) || dashNumber === 0
  const isMiddle = !(dashNumber % (dashesPerSec / 4))
  return isLarge ? 'large' : isMiddle ? 'middle' : 'small'
}

const Dash = ({ dashNumber }) => {
  const dashType = getDashType(dashNumber, DASHES_PER_SEC)

  const color = dashType === 'large' ? '#fff' : '#ae9bae'
  const height = dashType === 'large' ? 7 : dashType === 'middle' ? 6 : 4
  const x = DASH_STEP * dashNumber
  const y = constants.TIMELINE_HEIGHT - height

  return (
    <rect
      key={dashNumber}
      width="1"
      height={height}
      x={`${x}px`} // TODO: check accuracy, previously using `em`
      y={y}
      fill={color}
    />
  )
}

const DashLabel = ({ dashNumber }) => {
  const amount = dashNumber * (DASHES_PER_SEC / 2)
  const textAnchor = amount === 0 ? 'start' : 'middle'
  const x = DASH_STEP * amount
  const y = constants.TIMELINE_HEIGHT / 2
  const label = amount * 50

  return (
    <svg key={dashNumber} x={`${x}px`} style={{ overflow: 'visible' }}>
      <TimelinePanelLabel y={y} textAnchor={textAnchor}>
        {label}
      </TimelinePanelLabel>
    </svg>
  )
}

export const TimelinePanel = memo((props: TimelinePanelProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const scale = props.scale || 1
  const dashCount = props.time * DASHES_PER_SEC
  const labelsCount = dashCount / (DASHES_PER_SEC / 2)

  // add the last label and tick at the end
  const dashes = [...Array(dashCount + 1)]
  const labels = [...Array(labelsCount + 1)]

  return (
    <TimelinePanelWrapper>
      <TimelinePanelMainSvg ref={svgRef}>
        <g style={{ fontSize: `${scale}px` }}>
          {dashes.map((_e, num) => (
            <Dash key={num} dashNumber={num} />
          ))}
          {labels.map((_e, num) => (
            <DashLabel key={num} dashNumber={num} />
          ))}
        </g>
      </TimelinePanelMainSvg>
    </TimelinePanelWrapper>
  )
})
