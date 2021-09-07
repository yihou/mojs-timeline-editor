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
  const renderProperty = (key, segments: Segment[]): ReactNode => {
    return (
      <PointTimelineLineProperty key={key}>
        {segments.map((segment, index) => {
          const meta = { id: point.id, prop: key, spotIndex: index }
          return <SegmentTimeline key={index} segment={segment} meta={meta} />
        })}
      </PointTimelineLineProperty>
    )
  }

  const renderProperties = (point: Point) => {
    const { props } = point
    const keys = Object.keys(props)

    return keys.map((key) => renderProperty(key, props[key]))
  }

  return (
    <PointTimelineLineWrapper data-component="point-timeline-line">
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
