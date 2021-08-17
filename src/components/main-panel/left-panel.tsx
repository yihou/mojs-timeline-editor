import { Component } from 'react'

import { ToolsPanel } from '../tools-panel'
import { GlobalState } from '../../../types/store'
const CLASSES = require('../../css/blocks/left-panel.postcss.css.json')
require('../../css/blocks/left-panel')

interface LeftPanelProps {
  state: GlobalState
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
