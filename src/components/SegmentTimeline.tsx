import { Spot } from './Spot'
import { Easing } from './Easing'
import styled from '@emotion/styled'
import { Segment } from '../types'

const SegmentTimelineWrapper = styled.div`
  height: 100%;
  display: inline-block;
  vertical-align: top;
  position: relative;
  font-size: 1px;
`

const SegmentTimelineBar = styled.div`
  width: 100%;
  /*height: 80%;*/
  background: var(--mojs-color-creamy);
  border-radius: 3px;
  position: relative;
  top: (100% - 80%)/2;
  box-shadow: 2px 3px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;
`

const SegmentTimelineDelay = styled.div`
  background: #bca5aa;
  height: 100%;
  position: absolute;
  left: 0;
  z-index: 1;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`

export interface SegmentTimelineProps {
  segment: Segment
  meta: any
}

export const SegmentTimeline = (props: SegmentTimelineProps) => {
  return (
    <SegmentTimelineWrapper data-component="segment-timeline">
      <SegmentTimelineBar>
        <SegmentTimelineDelay />
        <Spot type="start" {...props} />
        <Spot type="end" {...props}>
          <Easing meta={props.meta} state={props.segment} />
        </Spot>
      </SegmentTimelineBar>
    </SegmentTimelineWrapper>
  )
}
