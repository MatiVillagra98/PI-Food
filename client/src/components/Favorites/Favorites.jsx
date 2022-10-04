import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Recipe from '../Recipe/Recipe';
import './Favorites.css'

const Favorites = () => {

    const favorites = useSelector(state => state.favorites)

    if(favorites.length > 0) {
        return (
            <div>
                <Recipe fav={favorites} />
            </div>
        );
    }
    else {
        return (
            <div className='noFavorites'>
                <NavBar/>
                <h2>No Recipes added to Favorites</h2>
            </div>
        );
    }
}

export default Favorites;

