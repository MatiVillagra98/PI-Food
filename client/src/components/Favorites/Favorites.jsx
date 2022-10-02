import React from 'react';
import { useSelector } from 'react-redux';
import Recipe from '../Recipe/Recipe';
import './Favorites'

const Favorites = () => {

    const favorites = useSelector(state => state.favorites)

    return (
        <div>
            <Recipe fav={favorites} />
        </div>
    );
}

export default Favorites;

