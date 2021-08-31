import { useSelector } from 'react-redux'
import { GlobalState } from 'types'
import { ReactNode } from 'react'
import { Point } from './Point'

export const Points = () => {
  const points = useSelector((state: GlobalState) => state.points)
  const results: ReactNode[] = []
  const props = Object.keys(points)

  for (let i = 0; i < props.length; i++) {
    const key = props[i]
    results.push(<Point key={key} state={points[key]} />)
  }

  return <div>{results}</div>
}
