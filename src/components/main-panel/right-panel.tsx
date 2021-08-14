import * as React from 'react'
import { Component } from 'react'

import { HideButton } from '../hide-button'
import { ResizeHandle } from '../resize-handle'
import { TimelinePanel } from '../timeline-panel'
import { mainPanelSlice } from '../../reducers/mainPanel'

const CLASSES = require('../../../css/blocks/right-panel.postcss.css.json')
require('../../../css/blocks/right-panel')

interface RightPanelProps {
  state: any
  onResize: (e: any) => void
  onResizeEnd: (e: any) => void
  onResizeStart: (e: any) => void
}

export class RightPanel extends Component<RightPanelProps> {
  render() {
    const { state } = this.props
    const { mainPanel } = state

    return (
      <div className={CLASSES['right-panel']}>
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
