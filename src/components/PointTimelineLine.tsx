import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { SegmentTimeline } from './SegmentTimeline'
import { Point, Segment } from '../types'

interface PointTimelineLineProps {
  point: Point
}

const POINT_LINE_HEIGHT = 24

const PointTimelineLineInner = styled.div`
  display: inline-block;
  vertical-align: top;
`

const PointTimelineLineHeader = styled.div`
  width: 100%;
  height: ${POINT_LINE_HEIGHT}px;
  background: var(--mojs-color-creamy);
  border-radius: 0 3px 3px 0;
  opacity: 0.2;
`

const PointTimelineLineBody = styled.div<{ isOpen: boolean }>`
  height: ${(props) => (props.isOpen ? 'auto' : 0)};
  overflow: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`

const PointTimelineLineProperty = styled.div`
  height: ${POINT_LINE_HEIGHT}px;
`

const PointTimelineLineWrapper = styled.div`
  min-height: ${POINT_LINE_HEIGHT}px;
  margin-top: 10px;
  position: relative;

  &:last-child {
    padding-bottom: 0;
  }
`

export const PointTimelineLine = ({ point }: PointTimelineLineProps) => {
  const renderProperty = (key, prop: Segment[]): ReactNode => {
    const results: ReactNode[] = []

    for (let i = 0; i < prop.length; i++) {
      const segment = prop[i]
      const meta = { id: point.id, prop: key, spotIndex: i }
      results.push(<SegmentTimeline segment={segment} meta={meta} />)
    }

    return <PointTimelineLineProperty>{results}</PointTimelineLineProperty>
  }

  const renderProperties = (point: Point) => {
    const { props } = point
    const results: ReactNode[] = []

    const keys = Object.keys(props)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      results.push(renderProperty(key, props[key]))
    }
    return results
  }

  return (
    <PointTimelineLineWrapper data-component="point-timeline-line">
      {'>'}
      <PointTimelineLineInner>
        <PointTimelineLineHeader />
        <PointTimelineLineBody isOpen={point.isOpen}>
          <span>{renderProperties(point)}</span>
          <PointTimelineLineProperty />
        </PointTimelineLineBody>
      </PointTimelineLineInner>
    </PointTimelineLineWrapper>
  )
}
