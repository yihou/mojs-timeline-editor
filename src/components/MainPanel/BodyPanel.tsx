import { memo } from 'react'
import styled from '@emotion/styled'
import { PointsPanel } from '../PointsPanel'
import { TimelinesPanel } from '../TimelinesPanel'

const BodyPanelWrapper = styled.div`
  position: absolute;
  top: var(--mojs-top-panel-size);
  left: 0;
  right: 0;
  bottom: var(--mojs-player-size);
  z-index: 0;
  overflow: auto;
`

const BodyPanelLeft = styled.div`
  min-height: 100%;
  padding-top: 1px;
  float: left;
  width: var(--mojs-left-panel-width);
  background: var(--mojs-color-purple);
`

const BodyPanelRight = styled.div`
  min-height: 100%;
  padding-top: 1px;
  margin-left: var(--mojs-left-panel-width);
  background: var(--mojs-color-light-purple);
  overflow: auto;
  /*min-width: 1600px*/
`

export const BodyPanel = memo(() => {
  return (
    <BodyPanelWrapper>
      <BodyPanelLeft>
        <PointsPanel />
      </BodyPanelLeft>
      <BodyPanelRight>
        <TimelinesPanel />
      </BodyPanelRight>
    </BodyPanelWrapper>
  )
})
