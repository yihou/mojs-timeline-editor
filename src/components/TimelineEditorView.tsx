import styled from '@emotion/styled'
import React, { forwardRef } from 'react'
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

  const mainPanelOnMouseEnter = () => {
    if (controls.isMouseInside) {
      return
    }

    dispatch(controlsSlice.actions.controlsSetMouseInside(true))
  }

  const mainPanelOnMouseLeave = () => {
    if (!controls.isMouseInside) {
      return
    }

    dispatch(controlsSlice.actions.controlsSetMouseInside(false))
  }

  return (
    <Wrapper>
      <InsertPoint />
      <Points />
      <div
        onMouseEnter={mainPanelOnMouseEnter}
        onMouseLeave={mainPanelOnMouseLeave}
      >
        <Icons />
        <MainPanel />
      </div>
    </Wrapper>
  )
})
