import axios from 'axios'

export const deleteBoard = async (boardId) => {
    try{
       await axios.delete(`http://localhost:5000/api/boards/${boardId}`)
    }
    catch(e){
        console.error('Error in posting board', e);
        throw e;
    }
  }