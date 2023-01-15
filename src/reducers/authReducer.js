import { AUTH_ERROR, AUTH_USER, GET_USER } from "../actions/types";

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  errorMessage: '',
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: action.payload.token, email: action.payload.email}    
    case AUTH_ERROR:
      return {...state, error: action.payload}
    case GET_USER:
      return {...state, email: action.payload.email}
    default:
      return state;
  }
}

export default authReducer;