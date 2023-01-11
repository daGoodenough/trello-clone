import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import boardDetailsReducer from './boardDetailsReducer';

const rootReducer = combineReducers({
  loggedIn: loginReducer,
  boardDetails: boardDetailsReducer,
});

export default rootReducer;