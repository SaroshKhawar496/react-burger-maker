import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
        return{
            // just spreading the state out won't copy the ingredients.
            // it doesn't do deep copy!
            ...state,
            ingredients: {
                ...state.ingredients,
                // ES6 feature below
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            }
        };

        case actionTypes.REMOVE_INGREDIENT:
        return{
            ...state,
            ingredients: {
                ...state.ingredients,
                // ES6 feature below
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            }
        };
        default:
            return state;

    }
};

export default reducer;