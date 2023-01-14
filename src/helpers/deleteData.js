import axios from 'axios'

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export const deleteBoard = async (boardId) => {
    try{
       await axios.delete(`http://localhost:5000/api/boards/${boardId}`)
    }
    catch(e){
        console.error('Error in deleting board', e);
        throw e;
    }
  }

export const deleteList = async (listId) => {
    try{
       await axios.delete(`http://localhost:5000/api/lists/${listId}`)
    }
    catch(e){
        console.error('Error in deleting list', e);
        throw e;
    }
  }

export const deleteComment = async (commentId) => {
    try{
       await axios.delete(`http://localhost:5000/api/comments/${commentId}`)
    }
    catch(e){
        console.error('Error in deleting board', e);
        throw e;
    }
  }