import { CREATE_RECIPE, GET_DIETS, GET_RECIPES, GET_RECIPE_DETAIL } from "../actions";

const initialState = {
    recipeDetail: [],
    recipes: [],
    diets: [],
    recipeCreated: [],
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
                recipes: action.payload
            }
        case CREATE_RECIPE:
            return {
                ...state,
                recipeCreated: action.payload 
            }
        default:
            return state;
    };
};

export default rootReducer;