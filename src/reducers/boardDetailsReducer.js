import { STORE_BOARD_DETAILS, REORDER_CARDS, REORDER_LISTS, UPDATE_TITLE, ADD_CARD } from '../actions/types';

const DEFAULT_STATE = { cards: [] }

const boardDetailsReducer = function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case STORE_BOARD_DETAILS:
            return action.payload;
        case REORDER_CARDS:
            return { ...state, cards: action.payload }
        case REORDER_LISTS:
            console.log('this is payload', action.payload)
            return { ...state, lists: action.payload }
        case UPDATE_TITLE:
            return { ...state, title: action.payload }
        case ADD_CARD:
            let isUnique = true;
            let cardIndex;
            state.cards.forEach((card, index) => {
                if (card.listId === action.payload.listId &&
                    card.title === action.payload.title &&
                    card.order === action.payload.order
                ) {
                    isUnique = false; 
                    cardIndex = index;
                }
            })
            if (isUnique) {
                return {...state, cards:[...state.cards, action.payload]};
            }

            const cardsCopy = state.cards;
            cardsCopy.splice(cardIndex, 1, action.payload);

            return {...state, cards: cardsCopy}
        default:
            return state;
    }
}

export default boardDetailsReducer;