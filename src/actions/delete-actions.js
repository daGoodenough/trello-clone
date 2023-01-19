import axios from 'axios';
import { BASE_URL } from '../helpers/base-url';
import { DELETE_LIST, DELETE_CARD } from './types';

export const deleteList = (listId) => dispatch => {
  dispatch({
    type: DELETE_LIST,
    payload: listId
  })

  axios.delete(
    `${BASE_URL}api/org/:orgId/user/:userId/boards/:boardId/lists/${listId}`
  )
    .then(response => {
      //this is where we could handle a delete error
    })
    .catch(e => {
      console.error('Error in deleting list', e);
      throw e;
    });
};

export const deleteCard = (cardId) => dispatch => {
    dispatch({
      type: DELETE_CARD,
      payload: cardId,
    })

    axios.delete(
      `${BASE_URL}api/org/:orgId/user/:userId/boards/:boardId/lists/:listId/cards/${cardId}`
    )
    .then(response => {
      // this is where we could handle a delte error
    })
 .catch(e => {
     console.error('Error in deleting card', e);
     throw e;
 })
}