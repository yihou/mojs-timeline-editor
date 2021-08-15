import * as React from 'react'
import { Component } from 'react'

const CLASSES = require('../../css/blocks/tools-panel.postcss.css.json')
require('../../css/blocks/tools-panel')

export class InsertPoint extends Component<{ className?: string }> {
  render() {
    const p = this.props
    const className = `${CLASSES.point} ${p.className || ''}`

    return <div className={className} />
  }
}
