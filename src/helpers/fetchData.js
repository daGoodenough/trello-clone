import axios from 'axios'

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export const fetchHomescreen = async (userId) => {

  try {
    const results = await axios.get(`http://localhost:5000/api/user/${userId}`)
    const data = results.data
    return data
  }
  catch (e) {
    console.error('Error in fetching home screen', e);
    throw e;
  }
}

export const fetchBoardDetails = async (boardId) => {
  try {
    const results = await axios.get(
      `http://localhost:5000/api/org/:orgId/user/:userId/boards/${boardId}`
    );
    const data = results.data
    return data
  }
  catch (e) {
    console.error('Error in fetching board details', e);
    throw e;
  }
}

export const fetchCardDetails = async (cardId) => {
  try {
    const results = await axios.get(
      `http://localhost:5000//api/org/:orgId/user/:userId/boards/:boardId/lists/:listId/cards/${cardId}`
    );
    const data = results.data
    return data
  }
  catch (e) {
    console.error('Error in fetching card details', e);
    throw e;
  }
}