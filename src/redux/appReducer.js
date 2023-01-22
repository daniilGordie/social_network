import { getAuthUserData } from './authReducer'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

const initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
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

const initializedSuces = () => ({
  type: INITIALIZED_SUCCESS,
  initialized: true,
})

export const initializeApp = () => (dispatch) => {
  const promise = dispatch(getAuthUserData())
  Promise.all([promise]).then(() => dispatch(initializedSuces()))
}

export default appReducer
