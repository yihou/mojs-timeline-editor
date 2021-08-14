import * as React from 'react'
import { Component } from 'react'

const CLASSES = require('../../../css/blocks/tools-panel.postcss.css.json')
require('../../../css/blocks/tools-panel')

interface ToolsPanelButtonProps {
  className?: string
  onClick?: (e: any) => void
}

export class ToolsPanelButton extends Component<ToolsPanelButtonProps> {
  render() {
    const p = this.props
    const className = `${CLASSES.button} ${p.className || ''}`
    return (
      <div className={className} onClick={p.onClick}>
        {p.children}
      </div>
    )
  }
}
