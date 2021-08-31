import { GlobalState } from 'types'
import { ReactNode } from 'react'
import { PointTimelineLine } from './PointTimelineLine'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'

export const TimelinesPanel = () => {
  const points = useSelector((state: GlobalState) => state.points)
  const keys = Object.keys(points)

  const pointTimelines: ReactNode[] = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    pointTimelines.push(<PointTimelineLine point={points[key]} />)
  }

  return (
    <div
      css={css`
        display: inline-block;
        /*min-width:   100%;*/
        min-width: 1600px;
        min-height: 100%;
      `}
    >
      {pointTimelines}
    </div>
  )
}
