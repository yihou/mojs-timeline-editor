import { GlobalState } from 'types'
import { mainPanelSlice } from '../../reducers/mainPanel'
import { css } from '@emotion/react'
import { HideButton } from '../hide-button'
import { ResizeHandle } from '../resize-handle'
import { TimelinePanel } from '../timeline-panel'
import { useDispatch, useSelector } from 'react-redux'

interface RightPanelProps {
  onResize: (e: any) => void
  onResizeEnd: (e: any) => void
  onResizeStart: (e: any) => void
}

export const RightPanel = (props: RightPanelProps) => {
  const dispatch = useDispatch()
  const mainPanel = useSelector((state: GlobalState) => state.mainPanel)

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
        z-index: 1;
        height: var(--mojs-point-line-height);
        /*height: 100%;*/

        color: var(--mojs-color-white);
      `}
    >
      <HideButton isHidden={mainPanel.isHidden} onTap={onHideButton} />
      <ResizeHandle {...props} />
      <TimelinePanel time={15} />
    </div>
  )
}
