import { Component } from 'react'

import { InsertPoint } from './point'
import { ToolsPanelAnchor, ToolsPanelButton } from './button'
import { Icon } from '../icon'
import { controlsSlice } from '../../reducers/controls'
import { css } from '@emotion/react'

interface ToolsPanelProps {
  state: any
}

interface ToolsPanelStates {
  selected: string
}

/* TODO:
    [x] refactor to emit `action creators` in event handlers;
*/
export class ToolsPanel extends Component<ToolsPanelProps, ToolsPanelStates> {
  render() {
    return (
      <div
        css={css`
          height: 22px;
          background: var(--mojs-color-purple);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          padding-right: 5px;
          position: relative;
          z-index: 1;
        `}
      >
        <InsertPoint />
        <ToolsPanelButton
          isActive={this.state.selected === 'plus'}
          onClick={this._setPlus}
        >
          <Icon shape='plus' />
        </ToolsPanelButton>
        <ToolsPanelButton
          isActive={this.state.selected === 'html'}
          onClick={this._setHtml}
        >
          {'HTML'}
        </ToolsPanelButton>

        <ToolsPanelAnchor
          isLogo
          href='https://github.com/legomushroom/mojs-timeline-editor/'
          target='_blank'
        >
          <Icon shape='mojs-logo' />
        </ToolsPanelAnchor>

        {/*
          <ToolsPanelButton isLink>
            <Icon shape="link" />
          </ToolsPanelButton>
        */}
      </div>
    )
  }

  _setPlus = () => {
    const { store } = this.context
    store.dispatch(controlsSlice.actions.toolsSetSelected('plus'))
    // store.dispatch(setSelected('OBJECT'));
  }

  _setHtml = () => {
    const { store } = this.context
    store.dispatch(controlsSlice.actions.toolsSetSelected('html'))
    // store.dispatch(setSelected('HTML'));
  }
}
