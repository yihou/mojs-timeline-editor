import { css } from '@emotion/react'
import { ToolsPanel } from '../ToolsPanel'

export const LeftPanel = () => {
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
      <ToolsPanel />
    </div>
  )
}
