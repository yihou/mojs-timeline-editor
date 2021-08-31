import { constants } from '../constants'
import Hammer from 'hammerjs'
import { pointsSlice } from '../reducers/points'
import { css } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState, Point as PointType } from 'types'

interface PointProps {
  state: PointType
  // entireState: GlobalState
}

export const Point = ({ state }: PointProps) => {
  const dispatch = useDispatch()

  const points = useSelector((state: GlobalState) => state.points)
  const selectedSpot = useSelector((state: GlobalState) => state.selectedSpot)

  const [isPan, setIsPan] = useState(false)
  const baseRef = useRef<HTMLDivElement>(null)
  const [deltaX, setDeltaX] = useState(0)
  const [deltaY, setDeltaY] = useState(0)

  const getCoords = () => {
    if (selectedSpot.id == null) {
      return state.currentProps[constants.POSITION_NAME]
    }

    const { id, prop, spotIndex, type } = selectedSpot
    return points[id].props[prop][spotIndex as number][type as string].value
  }

  const getXY = () => {
    const [x, y] = getCoords()
    return [x + deltaX, y + deltaY]
  }

  // on mount
  useEffect(() => {
    if (baseRef.current) {
      const mc = new Hammer.Manager(baseRef.current)
      mc.add(new Hammer.Pan())

      mc.on('pan', onPan)
      mc.on('panend', onPanEnd)
    }
  }, [])

  const onPan = (e) => {
    const { deltaX, deltaY } = e
    setIsPan(true)

    setDeltaX(deltaX)
    setDeltaY(deltaY)
  }

  const onPanEnd = (e) => {
    const { id } = state
    // const { selectedSpot } = entireState
    const { deltaX, deltaY } = e

    if (selectedSpot.id == null) {
      dispatch(
        pointsSlice.actions.changePointCurrentPosition({ deltaX, deltaY, id })
      )
    } else {
      if (!selectedSpot.type || !selectedSpot.spotIndex) {
        throw new Error('Selected spot type | spotIndex is empty')
      }

      dispatch(
        pointsSlice.actions.updateSelectedSpot({
          id: selectedSpot.id,
          type: selectedSpot.type,
          spotIndex: selectedSpot.spotIndex,
          prop: selectedSpot.prop,
          value: getXY()
        })
      )
    }

    setDeltaX(0)
    setDeltaY(0)
  }

  const onClick = () => {
    if (isPan) {
      return setIsPan(false)
    }
    dispatch(pointsSlice.actions.selectPoint(state.id))
  }

  const [x, y] = getXY()
  const style = { transform: `translate(${x}px, ${y}px)` }

  return (
    <div
      ref={baseRef}
      css={css`
        position: absolute;
        width: var(--mojs-point-size);
        height: var(--mojs-point-size);
        border-radius: 50%;
        background: var(--mojs-color-orange);
        margin-left: -(var(--mojs-point-size) / 2);
        margin-top: -(var(--mojs-point-size) / 2);

        &:after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 150%;
          height: 150%;
          border: 1px solid var(--mojs-color-orange);
          transform: translate(-50%, -50%);
          /*margin-left: -(150% - 100%);*/
          /*margin-top: -(150% - 100%);*/
          border-radius: 50%;
          opacity: ${state.isSelected ? 1 : 0};
        }
      `}
      style={style}
      onClick={onClick}
      title={state.name}
      data-component="point"
    />
  )
}
