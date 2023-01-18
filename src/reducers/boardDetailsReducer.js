import { STORE_BOARD_DETAILS, REORDER_CARDS, REORDER_LISTS, UPDATE_TITLE } from '../actions/types';

const DEFAULT_STATE = {cards:[]}

const boardDetailsReducer = function (state = DEFAULT_STATE, action) {
    switch(action.type){
        case STORE_BOARD_DETAILS:
            return action.payload;
        case REORDER_CARDS:
            return {...state, cards: action.payload}
        case REORDER_LISTS:
            console.log('this is payload', action.payload)
            return {...state, lists: action.payload}
        case UPDATE_TITLE:
            return {...state, title: action.payload}
        default:
            return state;
    }
}

export default boardDetailsReducer;