import { STORE_HOMESCREEN } from '../actions/types';

const DEFAULT_STATE = {}

const homescreenReducer = function (state = DEFAULT_STATE, action) {
    switch(action.type){
        case STORE_HOMESCREEN:
            return action.payload;
            default:
                return state;
    }
}

export default homescreenReducer;