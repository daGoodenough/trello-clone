import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import boardDetailsReducer from './boardDetailsReducer';
import homescreenReducer from './homescreenReducer';
import cardDetailsReducer from './cardDetailsReducer';
import authReducer from './authReducer'

const rootReducer = combineReducers({
  loggedIn: loginReducer,
  boardDetails: boardDetailsReducer,
  homescreen: homescreenReducer,
  cardDetails: cardDetailsReducer,
  auth: authReducer,
});

export default rootReducer;