import { GlobalState } from 'types'
import { mainPanelSlice } from '../../reducers/mainPanel'
import { css } from '@emotion/react'
import { HideButton } from '../HideButton'
import { ResizeHandle, ResizeHandleProps } from '../ResizeHandle'
import { TimelinePanel } from '../TimelinePanel'
import { useDispatch, useSelector } from 'react-redux'

export const RightPanel = (props: ResizeHandleProps) => {
  const dispatch = useDispatch()
  const isHidden = useSelector((state: GlobalState) => state.mainPanel.isHidden)

  const onHideButton = () => {
    dispatch(mainPanelSlice.actions.hideToggle())
  }

  return (
    <div
      css={css`
        position: absolute;
        right: 0;
        top: 0;
        left: var(--mojs-left-panel-width);
        height: var(--mojs-point-line-height);
        color: var(--mojs-color-white);
        z-index: 1;
      `}
    >
      <HideButton isHidden={isHidden} onTap={onHideButton} />
      <ResizeHandle {...props} />
      <TimelinePanel time={15} />
    </div>
  )
}
