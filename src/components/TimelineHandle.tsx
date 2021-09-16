import styled from '@emotion/styled'
import { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Hammer from 'hammerjs'
import { Icon } from './Icons/Icon'
import { GlobalState } from '../types'
import { selectedSpotSlice } from '../reducers/selectedSpot'
import { clampDeltaX, timelineSlice } from '../reducers/timeline'

const TIMELINE_HEAD_SIZE = 14
const TIMELINE_ICON_SIZE = 6

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
    margin-top: -${TIMELINE_ICON_SIZE - 2}px;
  }

  &:hover {
    [data-component='icon'] {
      opacity: 0.85;
    }
  }
`

const TimelineHandleWrapper = styled.div`
  position: absolute;
  top: 0;
  min-height: 100%;
  width: 1px;
  background: var(--mojs-color-orange);
  z-index: 20;
  margin-left: var(--mojs-left-panel-width);
  font-size: 1px;

  &:hover {
    ${TimelineHandleHead} {
      transform: scale(1.3);
    }
  }
`

export const TimelineHandle = memo(() => {
  const dispatch = useDispatch()
  const progress = useSelector((state: GlobalState) => state.timeline.progress)
  const [deltaX, setDeltaX] = useState<number>(0)
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let hammerInstance

    if (headRef.current) {
      hammerInstance = new Hammer.Manager(headRef.current)
      hammerInstance.add(new Hammer.Pan({ threshold: 0 }))

      hammerInstance.on('pan', (e) => {
        setDeltaX(clampDeltaX(10 * e.deltaX, progress))
      })

      hammerInstance.on('panstart', () => {
        dispatch(selectedSpotSlice.actions.resetSelectedSpot())
      })

      hammerInstance.on('panend', (e) => {
        dispatch(timelineSlice.actions.updateProgress(10 * e.deltaX))
        setDeltaX(0)
      })
    }

    return () => {
      hammerInstance?.destroy()
    }
  }, [progress])

  const shift = (progress + deltaX) / 10
  const style = { transform: `translateX(${shift}px)` }

  return (
    <TimelineHandleWrapper ref={headRef} style={style}>
      <TimelineHandleHead>
        <Icon shape="handle" />
      </TimelineHandleHead>
    </TimelineHandleWrapper>
  )
})
