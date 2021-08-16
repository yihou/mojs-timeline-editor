import { Component } from 'react'
import { pointsSlice } from '../reducers/points'
import { controlsSlice } from '../reducers/controls'
import { css } from '@emotion/react'

const CLASSES = require('../css/blocks/insert-point.postcss.css.json')

interface PointProps {
  state: {
    controls: any
    progress: number
  }
}

interface PointStates {
  x: number
  y: number
}

export class InsertPoint extends Component<PointProps, PointStates> {
  render() {
    const style = {
      display: this._isVisible() ? 'block' : 'none',
      transform: `translate(${this.state.x}px, ${this.state.y}px)`
    }

    return (
      <div
        style={style}
        css={css`
          position: absolute;
          width: var(--mojs-left-panel-width);
          height: var(--mojs-point-size);
          border-radius: 50%;
          background: var(--mojs-color-orange);
          margin-left: -(var(--mojs-point-size) / 2) * 1px;
          margin-top: -(var(--mojs-point-size) / 2) * 1px;
        `}
        onClick={this._addPoint}
        className={CLASSES['insert-point']}
        data-component='insert-point'
      >
        {'>'}
      </div>
    )
  }

  /* Method to find out if the insert point should be visible. */
  _isVisible() {
    const { controls } = this.props.state
    const { selected } = controls
    const isPlus = selected === 'plus'
    const isOut = !controls.isMouseInside
    return isOut && isPlus
  }

  _addPoint = () => {
    const { store } = this.context
    const { state } = this.props
    store.dispatch(
      pointsSlice.actions.addPoint({ ...this.state, time: state.progress })
    )
    store.dispatch(controlsSlice.actions.toolsResetSelected())
  }

  _mouseMove = (e) => {
    if (!this._isVisible()) {
      return
    }
    const { pageX: x, pageY: y } = e
    this.setState({ x, y })
  }

  componentWillMount() {
    this.setState({ x: 0, y: 0 })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this._mouseMove)
  }
}
