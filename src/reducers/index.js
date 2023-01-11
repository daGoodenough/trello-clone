import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import boardDetailsReducer from './boardDetailsReducer';
import homescreenReducer from './homescreenReducer';

const rootReducer = combineReducers({
  loggedIn: loginReducer,
  boardDetails: boardDetailsReducer,
  homescreen: homescreenReducer,
});

export default rootReducer;