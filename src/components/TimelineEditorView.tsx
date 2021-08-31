import styled from '@emotion/styled'
import { useEffect } from 'react'
import { InsertPoint } from './InsertPoint'
import { Icons } from './icons'
import { Points } from './Points'
import { MainPanel } from './MainPanel'

const Wrapper = styled.div`
  font-family: Arial, sans-serif;

  & * {
    box-sizing: border-box;
    user-select: none;
  }
`

export const TimelineEditorView = () => {
  // const { store } = context

  const _mouseMove = (e) => {
    /* we cannot `stopPropagation` the event, because `hammerjs`
       will not be able to work properly on `resize-handle`, so we
       set the `isTimelinePanel` flag instead indicating that we are
       inside the `timeline-editor` panel
    */
    e.isTimelinePanel = true
    // const { store } = this.context
    // const { controls } = this.getState()
    // if (controls.isMouseInside) {
    //   return
    // }

    // store.dispatch(controlsSlice.actions.controlsSetMouseInside(true))
  }

  const docMouseMove = (e) => {
    if (e.isTimelinePanel) {
    }
    // const { store } = this.context
    // const { controls } = this.getState()

    // if (controls.isMouseInside) {
    //   store.dispatch(controlsSlice.actions.controlsSetMouseInside(false))
    // }
  }

  useEffect(() => {
    // const { store } = this.context
    // store.subscribe(this.forceUpdate.bind(this))
    document.addEventListener('mousemove', docMouseMove)
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
}
