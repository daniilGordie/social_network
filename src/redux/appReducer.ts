import { getAuthUserData } from './authReducer.ts'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

type initialStateType = {
  initialized: boolean
}

const initialState: initialStateType = {
  initialized: false,
}

const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
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

type initializedSucesActionType = {
  type: typeof INITIALIZED_SUCCESS
  initialized: boolean
}

const initializedSuces = (): initializedSucesActionType => ({
  type: INITIALIZED_SUCCESS,
  initialized: true,
})

export const initializeApp = () => (dispatch: any) => {
  const promise = dispatch(getAuthUserData())
  Promise.all([promise]).then(() => dispatch(initializedSuces()))
}

export default appReducer
