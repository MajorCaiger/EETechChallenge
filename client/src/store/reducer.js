import { NEW_ITEM, SET_ITEMS, UPDATE_ITEM } from './types';

const reducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case SET_ITEMS:
            const items = action.items;
            items.sort((a, b) => a.isComplete - b.isComplete);

            return {
                ...state,
                items
            };
        case NEW_ITEM:
            return {
                ...state,
                items: [action.item, ...state.items]
            };
        case UPDATE_ITEM:
            const newItems = [...state.items];
            const index = newItems.findIndex(item => item.id === action.item.id);
            newItems[index] = action.item;
            return {
                ...state,
                items: newItems
            };
    }

    return state;
};

export default reducer;
