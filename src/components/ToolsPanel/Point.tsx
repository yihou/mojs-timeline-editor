import styled from '@emotion/styled'

export const Point = styled.div<{ isSelected?: boolean }>`
  position: absolute;
  width: var(--mojs-point-size);
  height: var(--mojs-point-size);
  border-radius: 50%;
  background: var(--mojs-color-orange);
  margin-left: calc(var(--mojs-point-size) / -2);
  margin-top: calc(var(--mojs-point-size) / -2);

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--mojs-point-size);
    height: var(--mojs-point-size);
    border: 1px solid var(--mojs-color-orange);
    transform: translate(-50%, -50%);
    /*margin-left: -($size - 100%);*/
    /*margin-top: -($size - 100%);*/
    border-radius: 50%;
    opacity: ${(props) => (props.isSelected ? 1 : 0)};
  }
`
