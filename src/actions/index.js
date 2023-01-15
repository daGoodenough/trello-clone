import {
  CHANGE_LOGIN_STATUS,
  STORE_BOARD_DETAILS,
  STORE_HOMESCREEN,
  STORE_CARD_DETAILS,
  AUTH_ERROR,
  AUTH_USER,
  GET_USER,
} from './types';
import axios from 'axios';

export const login = () => {
  //maybe make it accept username and password then send a request to get logged in
  return {
    type: CHANGE_LOGIN_STATUS,
    payload: true,
  };
};

export const localLogin = (event) => dispatch => {
  event.preventDefault();
  const email = event.currentTarget[0].value
  const password = event.currentTarget[1].value

  const data = { email, password }

  fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 401) {
        throw new Error("Incorrect username or password")
      }
      return response.json()
    })
    .then(data => {
      localStorage.setItem("token", data.token);
      dispatch({
        type: AUTH_USER,
        payload: data,
      })
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR,
        payload: error,
      })
    });
}

export const fetchUser = () => dispatch => {
  axios.get('http://localhost:5000/auth/current_user')
    .then(response => {
      dispatch({ type: GET_USER, payload: response.data })
    })
    .catch(err => {
      console.log(err);
    })
}

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