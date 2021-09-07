import { pointsSlice } from '../reducers/points'
import { controlsSlice } from '../reducers/controls'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { RootState, StoreDispatch } from '../store'

export const InsertPoint = () => {
  const dispatch = useDispatch<StoreDispatch>()
  const controls = useSelector((state: RootState) => state.controls)
  const progress = useSelector((state: RootState) => state.progress)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0
  })
  const isOut = !controls.isMouseInside
  /* To find out if the insert point should be visible. */
  const isVisible = controls.selected === 'plus' && isOut

  const addPoint = () => {
    dispatch(
      pointsSlice.actions.addPoint({
        time: progress,
        x: mousePosition.x,
        y: mousePosition.y
      })
    )

    dispatch(controlsSlice.actions.toolsResetSelected())
  }

  useEffect(() => {
    const mouseMove = (e) => {
      if (!isVisible) {
        return
      }
      const { pageX: x, pageY: y } = e
      setMousePosition({ x, y })
    }

    document.addEventListener('mousemove', mouseMove)

    return () => {
      document.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  const style = {
    display: isVisible ? 'block' : 'none',
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
  }

  return (
    <div
      style={style}
      css={css`
        position: absolute;
        width: var(--mojs-point-size);
        height: var(--mojs-point-size);
        border-radius: 50%;
        background: var(--mojs-color-orange);
        margin-left: calc(var(--mojs-point-size) / -2);
        margin-top: calc(var(--mojs-point-size) / -2);
      `}
      onClick={addPoint}
    />
  )
}
