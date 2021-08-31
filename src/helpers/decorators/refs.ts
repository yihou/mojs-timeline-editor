import { isString } from '../isString'

/* Function to override string `ref` with automatic function. */
export function refsFunction(attrs) {
  if (!attrs) {
    return
  }
  const { ref } = attrs
  if (!ref || typeof ref === 'function') {
    return
  }

  if (isString(ref)) {
    // @ts-ignore
    attrs.ref = (el) => (this[ref] = el)
  }
}
