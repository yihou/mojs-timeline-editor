import styled from '@emotion/styled'
import { memo, useEffect, useRef } from 'react'
import MojsCurveEditor from '@mojs/curve-editor'

const CurveEditorHtml = styled.div`
  outline: 1px solid cyan;
`

interface CurveEditorProps {
  meta: {
    id: string
    spotIndex: number
  }
}

export const CurveEditor = memo((props: CurveEditorProps) => {
  const editor = useRef<MojsCurveEditor>()

  useEffect(() => {
    const { meta } = props
    const { id, spotIndex } = meta

    editor.current = new MojsCurveEditor({
      name: `timeline_editor_curve_${id}_${spotIndex}`,
      isHiddenOnMin: true,
      onChange() {
        // TODO: apply custom path to states
        // console.log(path)
      }
    })

    return () => {
      if (editor.current?._rootEl) {
        editor.current?._rootEl.remove()
      }
    }
  }, [])

  return <CurveEditorHtml />
})
