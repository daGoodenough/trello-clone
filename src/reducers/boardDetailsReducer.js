import { STORE_BOARD_DETAILS, REORDER_CARDS } from '../actions/types';

const DEFAULT_STATE = {cards:[]}

const boardDetailsReducer = function (state = DEFAULT_STATE, action) {
    switch(action.type){
        case STORE_BOARD_DETAILS:
            return action.payload;
        case REORDER_CARDS:
            return {...state, cards: action.payload}
            default:
                return state;
    }
}

export default boardDetailsReducer;