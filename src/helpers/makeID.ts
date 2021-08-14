import md5 from 'md5'

export const makeID = () => {
  return md5(`${Math.random()}${Math.random()}`)
}
