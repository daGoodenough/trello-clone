import axios from 'axios';
import { BASE_URL } from '../helpers/base-url';
import { DELETE_LIST } from './types';

export const deleteList = (listId) => dispatch => {
  dispatch({
    type: DELETE_LIST,
    payload: listId
  })

  axios.delete(
    `${BASE_URL}api/org/:orgId/user/:userId/boards/:boardId/lists/${listId}`
  )
    .then(response => {
      console.log("Delete list res: ", response.data);
    })
    .catch(e => {
      console.error('Error in deleting list', e);
      throw e;
    });
}