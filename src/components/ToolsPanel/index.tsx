import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { GlobalState } from 'types'
import { controlsSlice, ToolsType } from '../../reducers/controls'
import { Icon } from '../Icons/Icon'
import { ToolsPanelButton } from './ToolsPanelButton'
import { ToolsPanelAnchor } from './ToolsPanelAnchor'

/* TODO:
    [x] refactor to emit `action creators` in event handlers;
*/
export const ToolsPanel = () => {
  const dispatch = useDispatch()
  const selected = useSelector((state: GlobalState) => state.controls.selected)

  const setPlus = () => {
    dispatch(controlsSlice.actions.toolsSetSelected(ToolsType.PLUS))
    // dispatch(setSelected('OBJECT'));
  }

  const setHtml = () => {
    dispatch(controlsSlice.actions.toolsSetSelected(ToolsType.HTML))
    // dispatch(setSelected('HTML'));
  }

  return (
    <div
      css={css`
        height: 22px;
        background: var(--mojs-color-purple);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        padding-right: 5px;
        position: relative;
        z-index: 1;
      `}
    >
      {/* <Point /> */}
      <ToolsPanelButton isActive={selected === 'plus'} onClick={setPlus}>
        <Icon shape="plus" />
      </ToolsPanelButton>
      <ToolsPanelButton isActive={selected === 'html'} onClick={setHtml}>
        {'HTML'}
      </ToolsPanelButton>

      <ToolsPanelAnchor
        href="https://github.com/legomushroom/mojs-timeline-editor/"
        target="_blank"
        css={css`
          float: right;

          [data-component='icon'] {
            fill: var(--mojs-color-orange);
            width: 8px;
            height: 8px;
          }
        `}
      >
        <Icon shape="mojs-logo" />
      </ToolsPanelAnchor>

      {/*
          <ToolsPanelButton isLink>
            <Icon shape="link" />
          </ToolsPanelButton>
        */}
    </div>
  )
}
