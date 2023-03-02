import { getAuthUserData } from './authReducer.ts'
import { InferActionTypes } from './redux-store'

const INITIALIZED_SUCCESS = 'sn/app/INITIALIZED_SUCCESS'

type initialStateType = {
  initialized: boolean
}
type ActionsType = InferActionTypes<typeof actions>

const initialState: initialStateType = {
  initialized: false,
}

const appReducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: action.initialized,
      }
    default:
      return state
  }
}

const actions = {
  initializedSuces: () => ({
    type: INITIALIZED_SUCCESS,
    initialized: true,
  }),
}

export const initializeApp = () => (dispatch: any) => {
  const promise = dispatch(getAuthUserData())
  Promise.all([promise]).then(() => dispatch(actions.initializedSuces()))
}

export default appReducer
