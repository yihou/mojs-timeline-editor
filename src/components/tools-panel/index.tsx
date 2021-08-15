import * as React from 'react'
import { Component } from 'react'

import { InsertPoint } from './point'
import { ToolsPanelButton } from './button'
import { Icon } from '../icon'
import { controlsSlice } from '../../reducers/controls'

const CLASSES = require('../../css/blocks/tools-panel.postcss.css.json')
require('../../css/blocks/tools-panel')

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
      <div className={CLASSES['tools-panel']}>
        <InsertPoint />
        <ToolsPanelButton
          className={this._getClassFor('plus')}
          onClick={this._setPlus}
        >
          <Icon shape='plus' />
        </ToolsPanelButton>
        <ToolsPanelButton
          className={this._getClassFor('html')}
          onClick={this._setHtml}
        >
          {'HTML'}
        </ToolsPanelButton>

        <a
          className={`${CLASSES.button} ${CLASSES['is-logo']}`}
          href='https://github.com/legomushroom/mojs-timeline-editor/'
          target='_blank'
        >
          <Icon shape='mojs-logo' />
        </a>

        {/*
          <Button className={`${CLASSES['button']} ${CLASSES['is-link']}`}>
            <Icon shape="link" />
          </Button>
        */}
      </div>
    )
  }

  _getClassFor(type) {
    const { state } = this.props
    const { selected } = state

    return selected === type ? CLASSES['is-active'] : ''
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
