import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons/Icon'
import Hammer from 'hammerjs'
import { selectedSpotSlice } from '../reducers/selectedSpot'
import { progressSlice } from '../reducers/progress'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from 'types'

const TIMELINE_HEAD_SIZE = 14
const TIMELINE_ICON_SIZE = 6

const TimelineHandleWrapper = styled.div`
  .timeline-handle {
    position: absolute;
    min-height: 100%;
    width: 1px;
    background: var(--mojs-color-orange);
    z-index: 20;
  }
`

const TimelineHandleHead = styled.div`
  cursor: pointer;
  background: var(--mojs-color-purple);
  border: 1px solid var(--mojs-color-orange);
  width: ${TIMELINE_HEAD_SIZE}px;
  height: ${TIMELINE_HEAD_SIZE}px;
  border-radius: 5px 5px 11px 11px;
  position: absolute;
  left: -${TIMELINE_HEAD_SIZE / 2}px;
  top: -${0.8 * TIMELINE_HEAD_SIZE}px;

  [data-component='icon'] {
    position: absolute;
    width: ${TIMELINE_ICON_SIZE}px;
    height: ${TIMELINE_ICON_SIZE}px;
    left: 50%;
    top: 50%;
    margin-left: -${TIMELINE_ICON_SIZE / 2}px;
    margin-top: -${TIMELINE_ICON_SIZE / 2 - 1}px;
  }

  &:hover {
    [data-component='icon'] {
      opacity: 0.85;
    }
  }
`

export const TimelineHandle = () => {
  const dispatch = useDispatch()
  const progress = useSelector((state: GlobalState) => state.progress)
  const [deltaX, setDeltaX] = useState<number>(0)
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headRef.current) {
      const mc = new Hammer.Manager(headRef.current)
      mc.add(new Hammer.Pan())

      mc.on('pan', (e) => {
        setDeltaX(clampDeltaX(10 * e.deltaX, 7000))
      })

      mc.on('panstart', () => {
        dispatch(selectedSpotSlice.actions.resetSelectedSpot())
      })

      mc.on('panend', () => {
        const data = progress + deltaX
        dispatch(progressSlice.actions.setProgress(data))
        setDeltaX(0)
      })
    }
  })
  //
  const clampDeltaX = (deltaX, max) => {
    deltaX = progress + deltaX < 0 ? -progress : deltaX
    deltaX = progress + deltaX > max ? max - progress : deltaX
    return deltaX
  }

  const shift = (progress + deltaX) / 10
  const style = { transform: `translateX(${shift}em)` }

  return (
    <TimelineHandleWrapper style={style} data-component='timeline-handle'>
      <TimelineHandleHead ref={headRef}>
        <Icon shape='handle' />
      </TimelineHandleHead>
    </TimelineHandleWrapper>
  )
}
