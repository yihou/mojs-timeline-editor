import { controlsSlice } from '../../reducers/controls'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../../types/store'
import { css } from '@emotion/react'
import { InsertPoint } from './point'
import { ToolsPanelAnchor, ToolsPanelButton } from './button'
import { Icon } from '../icon'

/* TODO:
    [x] refactor to emit `action creators` in event handlers;
*/
export const ToolsPanel = () => {
  const dispatch = useDispatch()
  const selected = useSelector((state: GlobalState) => state.controls.selected)

  const setPlus = () => {
    dispatch(controlsSlice.actions.toolsSetSelected('plus'))
    // dispatch(setSelected('OBJECT'));
  }

  const setHtml = () => {
    dispatch(controlsSlice.actions.toolsSetSelected('html'))
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
      <InsertPoint />
      <ToolsPanelButton isActive={selected === 'plus'} onClick={setPlus}>
        <Icon shape='plus' />
      </ToolsPanelButton>
      <ToolsPanelButton isActive={selected === 'html'} onClick={setHtml}>
        {'HTML'}
      </ToolsPanelButton>

      <ToolsPanelAnchor
        isLogo
        href='https://github.com/legomushroom/mojs-timeline-editor/'
        target='_blank'
      >
        <Icon shape='mojs-logo' />
      </ToolsPanelAnchor>

      {/*
          <ToolsPanelButton isLink>
            <Icon shape="link" />
          </ToolsPanelButton>
        */}
    </div>
  )
}
