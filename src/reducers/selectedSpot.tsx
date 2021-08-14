export enum SelectedSpotConstants {
  SET_SELECTED_SPOT = 'SET_SELECTED_SPOT',
  RESET_SELECTED_SPOT = 'RESET_SELECTED_SPOT'
}

const INITIAL_STATE = {
  id: null,
  spotIndex: null,
  type: null,
  prop: null
}

export const selectedSpot = (state = INITIAL_STATE, action) => {
  const { data } = action

  switch (action.type) {
    case SelectedSpotConstants.SET_SELECTED_SPOT: {
      return { ...data }
    }

    case SelectedSpotConstants.RESET_SELECTED_SPOT: {
      return INITIAL_STATE
    }
  }

  return state
}
