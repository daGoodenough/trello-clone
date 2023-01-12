import { STORE_CARD_DETAILS } from '../actions/types';

const DEFAULT_STATE = {}

const cardDetailsReducer = function (state = DEFAULT_STATE, action) {
    switch(action.type){
        case STORE_CARD_DETAILS:
            return action.payload;
            default:
                return state;
    }
}

export default cardDetailsReducer;