import { Component, ReactNode } from 'react'

import { SegmentTimeline } from './segment-timeline'
import { Point } from '../helpers/create-point'
import styled from '@emotion/styled'

interface PointTimelineLineProps {
  state: Point
  entireState: any
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

export class PointTimelineLine extends Component<PointTimelineLineProps> {
  render() {
    const { state } = this.props

    return (
      <PointTimelineLineWrapper data-component='point-timeline-line'>
        {'>'}
        <PointTimelineLineInner>
          <PointTimelineLineHeader />
          <PointTimelineLineBody isOpen={state.isOpen}>
            <span>{this._renderProperties(state)}</span>
            <PointTimelineLineProperty />
          </PointTimelineLineBody>
        </PointTimelineLineInner>
      </PointTimelineLineWrapper>
    )
  }

  _renderProperties(state) {
    const { props } = state
    const results: ReactNode[] = []

    const keys = Object.keys(props)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      results.push(this._renderProperty(key, props[key]))
    }
    return results
  }

  _renderProperty(key, prop): ReactNode {
    const { state, entireState } = this.props
    const results: ReactNode[] = []

    for (let i = 0; i < prop.length; i++) {
      const spot = prop[i]
      const meta = { id: state.id, prop: key, spotIndex: i }
      results.push(
        <SegmentTimeline state={spot} meta={meta} entireState={entireState} />
      )
    }

    return <PointTimelineLineProperty>{results}</PointTimelineLineProperty>
  }
}
