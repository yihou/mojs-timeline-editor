import { Component } from 'react'

import { ToolsPanel } from '../tools-panel'
import { GlobalState } from '../../../types/store'
import { css } from '@emotion/react'

interface LeftPanelProps {
  state: GlobalState
}

export class LeftPanel extends Component<LeftPanelProps> {
  render() {
    const { state } = this.props

    return (
      <div
        css={css`
          position: absolute;
          right: var(--mojs-left-panel-width);
          top: 0;
          left: 0;
          width: var(--mojs-left-panel-width);
          /*height: 100%;*/

          background: var(--mojs-color-purple);
        `}
      >
        <ToolsPanel state={state.controls} />
      </div>
    )
  }
}
