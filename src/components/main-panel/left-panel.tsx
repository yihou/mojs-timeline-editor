import * as React from 'react'
import { Component } from 'react'

import { ToolsPanel } from '../tools-panel'
const CLASSES = require('../../css/blocks/left-panel.postcss.css.json')
require('../../css/blocks/left-panel')

interface LeftPanelProps {
  state: any
}

export class LeftPanel extends Component<LeftPanelProps> {
  render() {
    const { state } = this.props

    return (
      <div className={CLASSES['left-panel']}>
        <ToolsPanel state={state.controls} />
      </div>
    )
  }
}
