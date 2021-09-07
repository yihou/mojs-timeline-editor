import styled from '@emotion/styled'
import { memo, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { GlobalState } from 'types'
import { TimelineHandle } from '../TimelineHandle'
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
`

// HELPERS
const clampMinHeight = constants.PLAYER_HEIGHT
const getClampHeight = (height) => {
  return Math.max(clampMinHeight, height)
}

const clampDeltaY = (ySize, deltaY) => {
  if (ySize - deltaY <= clampMinHeight) {
    return ySize - clampMinHeight
  }

  return deltaY
}

export const MainPanel = memo(() => {
  const [deltaY, setDeltaY] = useState<number>(0)

  const dispatch = useDispatch()
  const isHidden = useSelector((state: GlobalState) => state.mainPanel.isHidden)
  const ySize = useSelector((state: GlobalState) => state.mainPanel.ySize)
  const currentHeight = getClampHeight(ySize - deltaY)
  const isTransition = useSelector(
    (state: GlobalState) => state.mainPanel.isTransition
  )

  const onResizeHeight = (hammerInput) => {
    setDeltaY(clampDeltaY(ySize, hammerInput.deltaY))
  }

  const onResizeHeightEnd = (hammerInput) => {
    const data = clampDeltaY(ySize, hammerInput.deltaY)
    dispatch(mainPanelSlice.actions.setYSize(data))
    setDeltaY(0)
  }

  const onResizeHeightStart = () => {
    if (ySize !== clampMinHeight) {
      dispatch(mainPanelSlice.actions.saveYPrev())
    }
  }

  const checkHideButton = () => {
    // if we drag the panel and it is in `isHidden` state, reset that state
    if (currentHeight > clampMinHeight && isHidden) {
      dispatch(mainPanelSlice.actions.setHidden(false))
    }
    // if we drag the panel and it is not in `isHidden` state, set that state
    // and reset prevHeight to add user the ability to expand the panel,
    // otherwise it will stick at the bottom
    if (currentHeight === clampMinHeight && !isHidden) {
      dispatch(mainPanelSlice.actions.setHidden(true))
    }
  }

  // on mount
  useEffect(() => {
    // check state of `hide button` regarding current height
    checkHideButton()
  }, [])

  return (
    <MainPanelSection
      style={{ height: currentHeight }}
      isTransition={isTransition}
    >
      <TimelineHandle />
      <LeftPanel />
      <RightPanel
        onResize={onResizeHeight}
        onResizeEnd={onResizeHeightEnd}
        onResizeStart={onResizeHeightStart}
      />
      <BodyPanel />
    </MainPanelSection>
  )
})
