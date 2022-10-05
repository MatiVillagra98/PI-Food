
const axios = require('axios');

export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = 'GET_DIETS';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const ERROR = 'ERROR';
export const ADD_RECIPE_FAVORITE = 'ADD_RECIPE_FAVORITE';
export const REMOVE_RECIPE_FAVORITE = 'REMOVE_RECIPE_FAVORITE'

export function getRecipes(name) {
    if(!name) {
        return function(dispatch) {
            return axios(`/recipes`)
            .then(response => response.data)
            .then(response => {
                dispatch({ type: GET_RECIPES, payload: response });
            })
            .catch(error => alert('Error en el servidor'))
        };
    } else {
        return function(dispatch) {
            return axios(`/recipes?name=${name}`)
            .then(response => response.data)
            .then(response => {
                dispatch({ type: GET_RECIPES, payload: response });
            })
            .catch(error => alert('Error en el servidor'))
        };
    }
};

export function getDiets() {
    return function(dispatch) {
        return axios(`/diets`)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: GET_DIETS, payload: response });
        });
    };
};

export function getRecipeDetail(id) {
    return function(dispatch) {
        return axios(`/recipes/${id}`)
        .then(response => response.data)
        .then(response => {
            dispatch({ type: GET_RECIPE_DETAIL, payload: response });
        })
        .catch(error => alert('Error en el servidor'))
    };
};


export function addRecipeFavorite(detail) {
    return {
        type: ADD_RECIPE_FAVORITE, 
        payload: detail
    }
};

export function removeRecipeFavorite(id) {
    return {
        type: REMOVE_RECIPE_FAVORITE,
        payload: id
    }
};