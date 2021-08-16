import { Component } from 'react'
import MojsCurveEditor from '@mojs/curve-editor'

interface CurveEditorProps {
  meta: {
    id: string
    spotIndex: number
  }
}

export class CurveEditor extends Component<CurveEditorProps> {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div className='curve-editor' />
  }

  _editor

  componentDidMount() {
    const { meta } = this.props
    const { id, spotIndex } = meta

    this._editor = new MojsCurveEditor({
      name: `timeline_editor_curve_${id}_${spotIndex}`,
      isHiddenOnMin: true,
      onChange: this._onChange
    })
  }

  _onChange(path) {
    console.log(path)
  }

  componentWillUnmount() {
    console.log('will unmount')
  }

  componentDidUnmount() {
    console.log('did unmount')
  }
}
