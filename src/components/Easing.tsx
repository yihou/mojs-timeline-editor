import { Icon } from './Icons/Icon'
import { CurveEditor } from './CurveEditor'
import styled from '@emotion/styled'
import { EasingSelect } from './EasingSelect'
import { pointsSlice } from '../reducers/points'
import { useDispatch } from 'react-redux'

const EASING_HEIGHT = 14
const EASING_WIDTH = 60
const EASING_ICON_SIZE = 6

const EasingWrapper = styled.div<{ isFull: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  margin-left: -${(props) => (props.isFull ? 0 : EASING_ICON_SIZE)}px;
  margin-top: -${EASING_HEIGHT / 2}px;

  &:hover {
    opacity: 0.85;
  }
`

const EasingFullIcon = styled.div<{ isFull: boolean }>`
  width: ${EASING_WIDTH}px;
  height: ${EASING_HEIGHT}px;
  background: var(--mojs-color-purple);
  border-radius: var(--mojs-border-radius);
  margin-left: -${EASING_WIDTH / 2}px;
  display: ${(props) => (props.isFull ? 'block' : 'none')};
`

const EasingIcon = styled(Icon)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${EASING_ICON_SIZE}px;
  height: ${EASING_ICON_SIZE}px;
  margin-left: -${EASING_ICON_SIZE / 2}px;
  margin-top: -${EASING_ICON_SIZE / 2}px;
  fill: var(--mojs-color-purple);
`

const EasingShortIcon = styled.div<{ isFull: boolean }>`
  width: ${EASING_HEIGHT}px;
  height: ${EASING_HEIGHT}px;
  cursor: pointer;
  display: ${(props) => (props.isFull ? 'none' : 'block')};
`

const EasingDropdownIcon = styled.div`
  .dropdown-icon {
    position: absolute;
    width: ${EASING_HEIGHT}px;
    height: ${EASING_HEIGHT}px;
    right: 0;
    top: 0;
    border-left: 1px solid var(--mojs-color-light-purple);
  }
`

const EasingLabel = styled.div`
  .label {
    position: absolute;
    left: -${EASING_WIDTH / 2}px;
    right: 0;
    top: 3px;
    color: var(--mojs-color-white);
    font-size: 7px;
    /*width:           100%;*/
    letter-spacing: 0.5px;
    padding-right: ${EASING_HEIGHT + 3}px;
    padding-left: 5px;

    // ellipsis
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

interface EasingProps {
  state: {
    easing: string
  }
  meta: any
}

export const Easing = (props: EasingProps) => {
  const { state, meta } = props
  const { easing } = state
  const isFull = props.state.easing !== 'none'
  const dispatch = useDispatch()

  // _renderEasing() {
  //   const {state, meta} = this.props;
  //   const {easing} = state;
  //
  //   return (easing === 'custom')
  //     ? <CurveEditor meta={meta} />
  //     : <div className="label" title={easing}>{easing}</div>;
  // }

  const onChange = (e) => {
    const { target } = e
    const { value } = target.options[target.selectedIndex]

    const data = { ...props.meta, easing: value }
    dispatch(pointsSlice.actions.setEasing(data))
  }

  // noinspection JSUnusedLocalSymbols
  const _onEasingAdd = () => {
    const data = { ...props.meta, easing: 'ease.out' }
    dispatch(pointsSlice.actions.setEasing(data))
  }

  return (
    <EasingWrapper isFull={isFull} data-component="easing">
      <EasingShortIcon isFull={isFull}>
        <EasingIcon shape="plus" />
      </EasingShortIcon>
      <EasingFullIcon isFull={isFull}>
        {easing === 'custom' ? <CurveEditor meta={meta} /> : null}
        <EasingLabel title={easing}>{easing}</EasingLabel>
        <EasingDropdownIcon>
          <EasingIcon shape="dropdown" />
        </EasingDropdownIcon>
      </EasingFullIcon>
      <EasingSelect onChange={onChange} value={easing} />
    </EasingWrapper>
  )
}
