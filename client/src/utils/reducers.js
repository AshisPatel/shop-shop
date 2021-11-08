import { useReducer } from 'react';

import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from './actions';

export const reducer = (state, action) => {
    switch(action.type) {
        // if action type value is the value of 'UPDATE_PRODUCTS', return a new state object with an updated projects array
        case UPDATE_PRODUCTS:
            // spread operator to return all other properties of state object
            return {
                ...state,
                products: [...action.products]
            };
        // if action type value is the value of 'UPDATE_CATEGORIES', return a new state object withan updated categories array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        // if action type is the value of 'UPDATE_CURRENT_CATEGORY', return the updated value of the currentCategory
        case UPDATE_CURRENT_CATEGORY: 
            return {
                ...state,
                currentCategory: action.currentCategory
            }
        // if it's none of the cases, we will return the state without any updates
        default:
            return state; 
    }
};

// export reducer function so that it can be used by the global state
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}