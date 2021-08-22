import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../types/store'
import { ReactNode, useEffect } from 'react'
import { InsertPoint } from './InsertPoint'
import { Icons } from './icons'
import { MainPanel } from './main-panel/main-panel'
import { Point } from './point'

const Wrapper = styled.div`
  font-family: Arial, sans-serif;

  & * {
    box-sizing: border-box;
    user-select: none;
  }
`

const Points = () => {
  const points = useSelector((state: GlobalState) => state.points)
  const results: ReactNode[] = []
  const props = Object.keys(points)

  for (let i = 0; i < props.length; i++) {
    const key = props[i]
    results.push(<Point key={key} state={points[key]} />)
  }

  return <div>{results}</div>
}

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
