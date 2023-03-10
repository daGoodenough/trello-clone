import axios from 'axios'
import { BASE_URL } from "./base-url";

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");


export const deleteBoard = async (boardId) => {
    try{
       await axios.delete(
         `${BASE_URL}api/org/:orgId/user/:userId/boards/${boardId}`
       );
    }
    catch(e){
        console.error('Error in deleting board', e);
        throw e;
    }
  }

export const deleteList = async (listId) => {
    try{
       await axios.delete(
         `${BASE_URL}api/org/:orgId/user/:userId/boards/:boardId/lists/${listId}`
       );
    }
    catch(e){
        console.error('Error in deleting list', e);
        throw e;
    }
  }

export const deleteComment = async (commentId) => {
    try{
       await axios.delete(
         `${BASE_URL}api/org/:orgId/user/:userId/boards/:boardId/lists/:listId/cards/:cardId/comments/${commentId}`
       );
    }
    catch(e){
        console.error('Error in deleting board', e);
        throw e;
    }
  }

  export const deleteCard = async (cardId) => {
    try{
       await axios.delete(
         `${BASE_URL}api/org/:orgId/user/:userId/boards/:boardId/lists/:listId/cards/${cardId}`
       );
    }
    catch(e){
        console.error('Error in deleting board', e);
        throw e;
    }
  }