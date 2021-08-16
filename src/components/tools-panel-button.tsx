import { Component } from 'react'
import { Icon, IconProps } from './icon'

const C = require('../css/blocks/tools-panel-button.postcss.css.json')

interface ToolsPanelButtonProps {
  icon: IconProps['shape']
  onClick: (e: any) => void
}

export class ToolsPanelButton extends Component<ToolsPanelButtonProps> {
  render() {
    return (
      <div
        className={C['tools-panel-button']}
        onClick={this._onSubmit}
        data-component='tools-panel-button'
      >
        <div className={C['tools-panel-button__inner']}>
          <Icon shape={this.props.icon} />
        </div>
      </div>
    )
  }

  _onSubmit(e) {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e)
    }
  }
}
