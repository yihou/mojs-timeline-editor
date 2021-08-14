export enum ProgressConstants {
  SET_PROGRESS = 'SET_PROGRESS'
}

const INITIAL_STATE = 0
export const progress = (state = INITIAL_STATE, action) => {
  const { data } = action

  switch (action.type) {
    case ProgressConstants.SET_PROGRESS: {
      return data
    }
  }

  return state
}
