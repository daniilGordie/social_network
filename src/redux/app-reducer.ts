import { getAuthUserData } from './auth-reducer.ts'
import { InferActionTypes } from './redux-store'

const INITIALIZED_SUCCESS = 'sn/app/INITIALIZED_SUCCESS'

export type initialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

const initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

const actions = {
  initializedSuces: () =>
    ({
      type: INITIALIZED_SUCCESS,
    } as const),
}

export const initializeApp = () => (dispatch: any) => {
  const promise = dispatch(getAuthUserData())
  Promise.all([promise]).then(() => dispatch(actions.initializedSuces()))
}

export default appReducer
