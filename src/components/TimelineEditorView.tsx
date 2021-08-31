import styled from '@emotion/styled'
import React, { forwardRef, useEffect } from 'react'
import { InsertPoint } from './InsertPoint'
import { Icons } from './Icons'
import { Points } from './Points'
import { MainPanel } from './MainPanel'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../types'
import { controlsSlice } from '../reducers/controls'

const Wrapper = styled.div`
  font-family: Arial, sans-serif;

  & * {
    box-sizing: border-box;
    user-select: none;
  }
`

export const TimelineEditorView = forwardRef<HTMLDivElement>(() => {
  const dispatch = useDispatch()
  const controls = useSelector((state: GlobalState) => state.controls)

  const _mouseMove = (e) => {
    /* we cannot `stopPropagation` the event, because `hammerjs`
       will not be able to work properly on `resize-handle`, so we
       set the `isTimelinePanel` flag instead indicating that we are
       inside the `timeline-editor` panel
    */
    e.isTimelinePanel = true
    if (controls.isMouseInside) {
      return
    }

    dispatch(controlsSlice.actions.controlsSetMouseInside(true))
  }

  // on mount
  useEffect(() => {
    const docMouseMove = (e) => {
      if (e.isTimelinePanel) {
      }

      if (controls.isMouseInside) {
        dispatch(controlsSlice.actions.controlsSetMouseInside(false))
      }
    }

    document.addEventListener('mousemove', docMouseMove)

    return () => {
      console.log('remove docMousemove event')
      document.removeEventListener('mousemove', docMouseMove)
    }
  }, [])

  return (
    <Wrapper>
      <InsertPoint />
      <Points />
      <div onMouseMove={_mouseMove}>
        <Icons />
        <MainPanel />
      </div>
    </Wrapper>
  )
})
