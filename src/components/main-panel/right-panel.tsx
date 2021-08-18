import { Component } from 'react'

import { HideButton } from '../hide-button'
import { ResizeHandle } from '../resize-handle'
import { TimelinePanel } from '../timeline-panel'
import { mainPanelSlice } from '../../reducers/mainPanel'
import { GlobalState } from '../../../types/store'
import { css } from '@emotion/react'

interface RightPanelProps {
  state: GlobalState
  onResize: (e: any) => void
  onResizeEnd: (e: any) => void
  onResizeStart: (e: any) => void
}

export class RightPanel extends Component<RightPanelProps> {
  render() {
    const { state } = this.props
    const { mainPanel } = state

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
        <HideButton isHidden={mainPanel.isHidden} onTap={this._onHideButton} />
        <ResizeHandle {...this.props} />
        <TimelinePanel time={15} />
      </div>
    )
  }

  _onHideButton() {
    const { store } = this.context

    store.dispatch(mainPanelSlice.actions.hideToggle())
  }
}
