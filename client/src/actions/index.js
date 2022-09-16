const axios = require('axios');

export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const CREATE_RECIPE =  'CREATE_RECIPE';
export const ERROR = 'ERROR'

export function getRecipes(name) {
    if(!name) {
        return function(dispatch) {
            return axios(`http://localhost:3001/recipes`)
            .then(response => response.data)
            .then(response => {
                dispatch({ type: GET_RECIPES, payload: response });
            });
        };
    } else {
        return function(dispatch) {
            return axios(`http://localhost:3001/recipes?name=${name}`)
            .then(response => response.data)
            .then(response => {
                dispatch({ type: GET_RECIPES, payload: response });
            });
        };
    }
};

export function getDiets() {
    return function(dispatch) {
        return axios(`http://localhost:3001/diets`)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: GET_DIETS, payload: response });
        });
    };
};

export function getRecipeDetail(id) {
    return function(dispatch) {
        return axios(`http://localhost:3001/recipes/${id}`)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: GET_RECIPE_DETAIL, payload: response });
        });
    };
};

export function createRecipe(values) {
    return function(dispatch) {
        return axios.post(`http://localhost:3001/recipes`, values)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: CREATE_RECIPE, payload: response });
        });
    };
};