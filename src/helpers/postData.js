import axios from 'axios'

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export const postComment = async (cardId, commentToPost, userId) => {
    try{
    await axios.post(`http://localhost:5000/api/cards/${cardId}`,{
       text: commentToPost,
       user: userId,
       id: cardId
    })
    .then(response => {
        console.log(response.data);
      })
    }
    catch (e) {
      console.error('Error in posting comment', e);
      throw e;
    }
  }

  export const postCard = async (listId, cardToPost) => {
    try{
   await axios.post(`http://localhost:5000/api/lists/${listId}`,{
      id: listId,
      title: cardToPost
    })
    .then(response => {
        console.log(response.data);
      })
    }
    catch (e) {
      console.error('Error in posting comment', e);
      throw e;
    }
  }

  export const postBoard = async (userId, newBoard) => {
    try{
       const response = await axios.post(`http://localhost:5000/api/user/${userId}`, {
          title: newBoard
    })
    return response.data
    }
    catch(e){
        console.error('Error in posting board', e);
        throw e;
    }
  }

  export const postList = async (boardId, newList) => {
    try{
       const response = await axios.post(`http://localhost:5000/api/boards/${boardId}`, {
        newList
    })
    return response.data
    }
    catch(e){
        console.error('Error in posting board', e);
        throw e;
    }
  }
 