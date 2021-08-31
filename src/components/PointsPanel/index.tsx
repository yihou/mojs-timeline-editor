import { GlobalState } from 'types'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { PointLine } from './PointLine'

export const PointsPanel = () => {
  const points = useSelector((state: GlobalState) => state.points)
  const pointKeys = Object.keys(points)

  return (
    <div
      css={css`
        background: rgba(0, 0, 0, 0.1);
      `}
    >
      {pointKeys.map((key) => (
        <PointLine key={points[key].id} point={points[key]} />
      ))}
    </div>
  )
}
