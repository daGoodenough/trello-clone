import axios from 'axios'

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export const deleteBoard = async (boardId) => {
    try{
       await axios.delete(`http://localhost:5000/api/boards/${boardId}`)
    }
    catch(e){
        console.error('Error in posting board', e);
        throw e;
    }
  }