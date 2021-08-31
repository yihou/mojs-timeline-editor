import { GlobalState } from 'types'
import { PointTimelineLine } from './PointTimelineLine'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'

export const TimelinesPanel = () => {
  const points = useSelector((state: GlobalState) => state.points)
  const keys = Object.keys(points)

  return (
    <div
      css={css`
        display: inline-block;
        /*min-width:   100%;*/
        min-width: 1600px;
        min-height: 100%;
      `}
    >
      {keys.map((key) => (
        <PointTimelineLine key={points[key].id} point={points[key]} />
      ))}
    </div>
  )
}
