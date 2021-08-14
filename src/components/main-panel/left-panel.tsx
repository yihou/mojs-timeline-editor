import { Component } from 'react'

import ToolsPanel from '../tools-panel/index'
const CLASSES = require('../../../css/blocks/left-panel.postcss.css.json')
require('../../../css/blocks/left-panel')

class LeftPanel extends Component {
  render() {
    const { state } = this.props

    return (
      <div className={CLASSES['left-panel']}>
        <ToolsPanel state={state.controls} />
      </div>
    )
  }
}

export default LeftPanel
