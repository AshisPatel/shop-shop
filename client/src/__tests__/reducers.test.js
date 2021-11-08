// import actions 
import {
    UPDATE_CATEGORIES,
    UPDATE_PRODUCTS,
    UPDATE_CURRENT_CATEGORY
} from "../utils/actions";

// import reducers
import { reducer } from "../utils/reducers";

// create an example of the global state
const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1'
};

// test to see if products can be added to the products state variable
// General format is to provide the type of action that we are going to perform, and the result of the state after the action
test('UPDATE_PRODUCTS', () => {
    let newState= reducer(initialState, {
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
});

// test to see if categories can be added to the categories state variable

test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });

    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
});

// test to see if the current category can be updated

test('UPDATE_CURRENT_CATEGORY', () => {
    let newState= reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });
    
    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
});