import styled from '@emotion/styled'
import { useState } from 'react'
import { css } from '@emotion/react'
import { GlobalState } from 'types'
import { TimelineHandle } from '../timeline-handle'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'
import { BodyPanel } from './BodyPanel'
import { mainPanelSlice } from '../../reducers/mainPanel'
import { constants } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'

const MainPanelSection = styled.section<{ isTransition: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  /*height: 200px;*/
  color: white;
  background: var(--mojs-color-purple);
  ${(props) =>
    props.isTransition &&
    css`
      transition: height 0.4s;
    `};

  [data-component='timeline-handle'] {
    margin-left: var(--mojs-left-panel-width);
    font-size: 1px;
  }
`

export const MainPanel = () => {
  const dispatch = useDispatch()
  const mainPanel = useSelector((state: GlobalState) => state.mainPanel)
  const [deltaY, setDeltaY] = useState<number>(0)

  const _resizeHeight = (deltaY) => {
    // reset `isTransition` state that is responsible
    // for applying a className with transition enabled
    if (mainPanel.isTransition) {
      dispatch(mainPanelSlice.actions.resetTransition())
    }

    setDeltaY(_clampDeltaY(deltaY))
  }

  const _resizeHeightEnd = () => {
    const data = _clampDeltaY(deltaY)
    setDeltaY(0)
    dispatch(mainPanelSlice.actions.setYSize(data))
  }

  const _resizeHeightStart = () => {
    if (mainPanel.ySize !== _getMinHeight()) {
      dispatch(mainPanelSlice.actions.saveYPrev())
    }
  }

  // HELPERS

  const _clampHeight = (height) => {
    return Math.max(_getMinHeight(), height)
  }

  const _clampDeltaY = (deltaY) => {
    const minSize = _getMinHeight()
    return mainPanel.ySize - deltaY <= minSize
      ? mainPanel.ySize - minSize
      : deltaY
  }

  const _checkHideButton = (height) => {
    // if we drag the panel and it is in `isHidden` state, reset that state
    if (height > _getMinHeight() && mainPanel.isHidden) {
      dispatch(mainPanelSlice.actions.setHidden(false))
    }
    // if we drag the panel and it is not in `isHidden` state, set that state
    // and reset prevHeight to add user the ability to expand the panel,
    // otherwise it will stick at the bottom
    if (height === _getMinHeight() && !mainPanel.isHidden) {
      dispatch(mainPanelSlice.actions.setHidden(true))
    }
  }

  const _getMinHeight = () => {
    return constants.PLAYER_HEIGHT
  }

  const height = _clampHeight(mainPanel.ySize - deltaY)
  // check state of `hide button` regarding current height
  _checkHideButton(height)

  return (
    <MainPanelSection
      style={{ height }}
      isTransition={mainPanel.isTransition}
      data-component='main-panel'
    >
      {'>'}
      <TimelineHandle />
      <LeftPanel />
      <RightPanel
        onResize={_resizeHeight}
        onResizeEnd={_resizeHeightEnd}
        onResizeStart={_resizeHeightStart}
      />
      <BodyPanel />
    </MainPanelSection>
  )
}
