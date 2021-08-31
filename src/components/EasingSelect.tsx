import styled from '@emotion/styled'
import React, { FC } from 'react'

const GAP = '---'
const DELIMITER = (
  <option value={GAP} disabled>
    {GAP}
  </option>
)
const EasingDropdown = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  select {
    height: 100%;
    width: 100%;

    appearance: none;
    outline: 0;
    border-radius: var(--mojs-border-radius);
    cursor: pointer;
    position: absolute;
    z-index: 1;
    opacity: 0;
  }
`

interface EasingSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  value?: string
}

export const EasingSelect: FC<EasingSelectProps> = (props) => (
  <EasingDropdown>
    <select onChange={props.onChange} value={props.value}>
      <option value="none">none</option>
      {DELIMITER}
      <option value="custom">custom</option>
      {DELIMITER}
      <option value="ease.out">ease.out</option>
      <option value="ease.in">ease.in</option>
      <option value="ease.inout">ease.inout</option>
      {DELIMITER}
      <option value="sin.out">sin.out</option>
      <option value="sin.in">sin.in</option>
      <option value="sin.inout">sin.inout</option>
      {DELIMITER}
      <option value="quad.out">quad.out</option>
      <option value="quad.in">quad.in</option>
      <option value="quad.inout">quad.inout</option>
      {DELIMITER}
      <option value="cubic.out">cubic.out</option>
      <option value="cubic.in">cubic.in</option>
      <option value="cubic.inout">cubic.inout</option>
      {DELIMITER}
      <option value="quart.out">quart.out</option>
      <option value="quart.in">quart.in</option>
      <option value="quart.inout">quart.inout</option>
      {DELIMITER}
      <option value="quint.out">quint.out</option>
      <option value="quint.in">quint.in</option>
      <option value="quint.inout">quint.inout</option>
      {DELIMITER}
      <option value="expo.out">expo.out</option>
      <option value="expo.in">expo.in</option>
      <option value="expo.inout">expo.inout</option>
      {DELIMITER}
      <option value="circ.out">circ.out</option>
      <option value="circ.in">circ.in</option>
      <option value="circ.inout">circ.inout</option>
      {DELIMITER}
      <option value="back.out">back.out</option>
      <option value="back.in">back.in</option>
      <option value="back.inout">back.inout</option>
      {DELIMITER}
      <option value="elastic.out">elastic.out</option>
      <option value="elastic.in">elastic.in</option>
      <option value="elastic.inout">elastic.inout</option>
      {DELIMITER}
      <option value="bounce.out">bounce.out</option>
      <option value="bounce.in">bounce.in</option>
      <option value="bounce.inout">bounce.inout</option>
    </select>
  </EasingDropdown>
)
