import { Component } from 'react'
import MojsCurveEditor from '@mojs/curve-editor'
import styled from '@emotion/styled'

const CurveEditorHtml = styled.div`
  outline: 1px solid cyan;
`

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
    return <CurveEditorHtml />
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
