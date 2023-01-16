import {
  CHANGE_LOGIN_STATUS,
  STORE_BOARD_DETAILS,
  STORE_HOMESCREEN,
  STORE_CARD_DETAILS,
  AUTH_ERROR,
  AUTH_USER,
  GET_USER,
  REMOVE_USER,
} from './types';
import axios from 'axios';

export const localLogin = (event, callback) => dispatch => {
  event.preventDefault();
  const email = event.currentTarget[0].value
  const password = event.currentTarget[1].value

  axios.post('http://localhost:5000/auth/login', {
    email,
    password
  })
  .then(response => {
    localStorage.setItem("token", response.data.token);
    dispatch({
      type: AUTH_USER,
      payload: response.data,
    });
    callback();
  })
  .catch(error => {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.status,
    });
  });
}

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({type: REMOVE_USER})
}

export const fetchUser = () => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };
  axios.get('http://localhost:5000/auth/current_user', config)
    .then(response => {
      dispatch({ type: GET_USER, payload: response.data })
    })
    .catch(err => {
      console.log(err);
    })
}

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