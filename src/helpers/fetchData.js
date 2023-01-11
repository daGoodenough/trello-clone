import axios from 'axios'



export const fetchBoardDetails = async (boardId) => {
    try{
    const results = await axios.get(`http://localhost:5000/api/boards/${boardId}`)
    const data = results.data
    return data
    }
    catch (e) {
        console.error('Error in fetching board details', e);
        throw e;
      }
}