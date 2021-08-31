import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState, Segment } from 'types'
import { constants } from '../constants'
import { isSelectedByConnection } from '../helpers/isSelectedByConnection'
import { pointsSlice } from '../reducers/points'
import { selectedSpotSlice } from '../reducers/selectedSpot'

const SpotWrapper = styled.div<{ type: SpotProps['type']; isSelect: boolean }>`
  position: relative;
  float: left;
  background: #bca5aa;
  height: 20px;
  border-top-left-radius: var(--mojs-border-radius);
  border-bottom-left-radius: var(--mojs-border-radius);

  ${(props) =>
    props.type === 'end' &&
    css`
      display: block;
      background: transparent;
    `}
`

const SpotDot = styled.div<{ isSelected: boolean; isEasing: boolean }>`
  width: 6px;
  height: 6px;
  position: absolute;
  z-index: 1;
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: pointer;
  transform: rotate(45deg);
  background: var(--mojs-color-purple);

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: var(--mojs-color-orange);
    `}

  &:hover,
  &:active {
    background: var(--mojs-color-light-purple);
    //outline: 1px solid var(--mojs-color-orange);
    outline: 2px solid #bca5aa;
  }

  &:after {
    content: '';
    position: absolute;
    width: 300%;
    height: 300%;
    margin-left: 100%;
    margin-top: 100%;
    transform: rotate(45deg);
    user-select: none;
  }

  [data-component='easing'] {
    display: ${(props) => (props.isEasing ? 'block' : 'none')};
  }
`

function isSpotEasing(
  type: SpotProps['type'],
  duration: number,
  dDuration: number
) {
  if (type === 'start') {
    return false
  }

  const durationWidth = duration / 10 + dDuration
  return durationWidth >= 80
}

interface SpotProps {
  type: 'start' | 'end'
  meta: any
  segment: Segment
}

export const Spot: FC<SpotProps> = ({ type, segment, meta, children }) => {
  const dispatch = useDispatch()
  const dot = useRef<HTMLDivElement>(null)
  const selectedSpot = useSelector((state: GlobalState) => state.selectedSpot)
  const points = useSelector((state: GlobalState) => state.points)
  const [dDelay, setDDelay] = useState(0)
  const [dDuration, setDDuration] = useState(0)
  const isEasing = isSpotEasing(type, segment.duration, dDuration)

  const isSelected = () => {
    const { id, spotIndex, type: selType, prop } = selectedSpot

    return (
      (meta.id === id &&
        type === selType &&
        meta.spotIndex === spotIndex &&
        meta.prop === prop) ||
      isSelectedByConnection({ ...meta, type }, selectedSpot, points)
    )
  }

  const pan = (e) => {
    if (type === 'end') {
      const threshold = constants.MIN_DURATION
      // TODO: double check
      // previously:
      // const min = -this.props.duration + threshold
      const min = -segment.duration + threshold
      const dDuration = e.deltaX * 10 < min ? min / 10 : e.deltaX
      setDDuration(dDuration)
    }
    if (type === 'start') {
      setDDelay(e.deltaX)
    }
  }

  const panEnd = () => {
    dispatch(
      pointsSlice.actions.shiftSegment({
        delay: dDelay * 10,
        duration: dDuration * 10,
        ...meta
      })
    )

    setDDelay(0)
    setDDuration(0)
  }

  const tap = () => {
    dispatch(selectedSpotSlice.actions.setSelectedSpot({ type, ...meta }))
  }

  useEffect(() => {
    if (dot.current) {
      const mc = new Hammer.Manager(dot.current)
      mc.add(new Hammer.Pan())
      mc.add(new Hammer.Tap())
      mc.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL })

      mc.on('pan', pan)
      mc.on('panend', panEnd)
      mc.on('tap', tap)
    }
  }, [])

  const delayWidth = segment.delay / 10 + dDelay
  const durationWidth = segment.duration / 10 + dDuration

  const style = {
    width: `${type === 'start' ? delayWidth : durationWidth}em`
  }

  const isSelect = isSelected()

  return (
    <SpotWrapper
      type={type}
      isSelect={isSelect}
      style={style}
      data-component='spot'
    >
      <SpotDot ref={dot} isSelected={isSelect} isEasing={isEasing} />
      {children}
    </SpotWrapper>
  )
}
