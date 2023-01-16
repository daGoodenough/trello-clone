import { AUTH_ERROR, AUTH_USER, GET_USER, REMOVE_USER } from "../actions/types";

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  errorMessage: null,
  userId: '',
  email: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      debugger;
      return {
        ...state,
        authenticated: action.payload.token || '',
        email: action.payload.email || '',
        userId: action.payload.id || '', 
        errorMessage: null
      };    
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload};
    case GET_USER:
      debugger;
      return {
        ...state, 
        email: action.payload.email, 
        userId: action.payload.id
      };
    case REMOVE_USER:
      return {
        authenticated: '',
        email: '',
        userId: '', 
        errorMessage: null
      }
    default:
      return state;
  }
}

export default authReducer;