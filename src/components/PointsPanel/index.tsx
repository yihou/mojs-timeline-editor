import { GlobalState } from 'types'
import { ReactNode } from 'react'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { PointLine } from './PointLine'

export const PointsPanel = () => {
  const points = useSelector((state: GlobalState) => state.points)
  const props = Object.keys(points)
  const pointLines: ReactNode[] = []

  for (let i = 0; i < props.length; i++) {
    const key = props[i]
    pointLines.push(<PointLine point={points[key]} />)
  }

  return (
    <div
      css={css`
        background: rgba(0, 0, 0, 0.1);
      `}
    >
      {pointLines}
    </div>
  )
}
