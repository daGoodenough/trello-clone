import { CHANGE_LOGIN_STATUS } from '../actions/types';

const DEFAULT_STATE = () => {
  // check for cookie
  return true;
};

const loginReducer = (state = DEFAULT_STATE(), action) => {
  switch (action.typed) {
    case CHANGE_LOGIN_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default loginReducer;