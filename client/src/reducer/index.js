import { CREATE_RECIPE, GET_DIETS, GET_RECIPES, GET_RECIPE_DETAIL, ERROR } from "../actions";

const initialState = {
    recipeDetail: [],
    recipes: [],
    diets: [],
    recipeCreated: [],
    error: ''
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_DIETS: 
            return {
                ...state,
                diets: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case CREATE_RECIPE:
            return {
                ...state,
                recipeCreated: action.payload 
            }
        case ERROR: 
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    };
};

export default rootReducer;