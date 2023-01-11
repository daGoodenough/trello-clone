import { STORE_BOARD_DETAILS } from '../actions/types';

const DEFAULT_STATE = {}

const boardDetailsReducer = function (state = DEFAULT_STATE, action) {
    switch(action.type){
        case STORE_BOARD_DETAILS:
            return action.payload;
            default:
                return state;
    }
}

export default boardDetailsReducer;