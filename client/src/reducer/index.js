import { 
    GET_DIETS, 
    GET_RECIPES, 
    GET_RECIPE_DETAIL, 
    ERROR, 
    ADD_RECIPE_FAVORITE, 
    REMOVE_RECIPE_FAVORITE 
} from "../actions";

const initialState = {
    recipeDetail: [],
    recipes: [],
    diets: [],
    error: '',
    favorites: []
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
        case ERROR: 
            return {
                ...state,
                error: action.payload
            }
        case ADD_RECIPE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.concat(action.payload)
            }
        case REMOVE_RECIPE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(recipe => recipe.id !== action.payload)
            }
        default:
            return state;
    };
};

export default rootReducer;