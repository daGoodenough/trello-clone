import {
  CHANGE_LOGIN_STATUS,
  STORE_BOARD_DETAILS,
  STORE_HOMESCREEN,
  STORE_CARD_DETAILS,
} from './types';

export const login = () => {
  //maybe make it accept username and password then send a request to get logged in
  return {
    type: CHANGE_LOGIN_STATUS,
    payload: true,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: CHANGE_LOGIN_STATUS,
    payload: false,
  };
};

export const storeBoardDetails = (boardDetails) => {
  return {
    type: STORE_BOARD_DETAILS,
    payload: boardDetails,
  }
}

export const storeHomescreen = (homescreen) => {
  return {
    type: STORE_HOMESCREEN,
    payload: homescreen,
  }
}

export const storeCardDetails = (cardDetails) => {
  return {
    type: STORE_CARD_DETAILS,
    payload: cardDetails,
  }
}