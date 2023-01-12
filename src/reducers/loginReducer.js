import { CHANGE_LOGIN_STATUS } from '../actions/types';

const DEFAULT_STATE = () => {
  // check for cookie
  return false;
};

const loginReducer = (state = DEFAULT_STATE(), action) => {
  switch (action.type) {
    case CHANGE_LOGIN_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default loginReducer;