import React from 'react';
import { Link } from 'react-router-dom';
import { getDiets, getRecipes } from '../../actions/index';
import { useDispatch } from 'react-redux';
import './NavBar.css'
import logo from './logo.png'

export default function NavBar() {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getDiets())
        .catch(error => console.log(error))
    },[dispatch]);

    function handleClick(e) {
        dispatch(getRecipes())
    }

    return (
        <header className='navbar'>
            <nav>
                <ul className='links'>
                    <Link to='/home'>
                        <button className='btn' onClick={handleClick} name='home'>HOME</button>
                    </Link>
                    <Link to='/createRecipe' name='create' className='btn'>
                        <button className='btn' name='create'>Crear Receta</button>
                    </Link>
                    <Link to='/fav'>
                        <button className='btn' name='fav'>❤</button>
                    </Link>
                </ul>
            </nav>
            <Link to='/' className='change'>
                <img src={logo} alt='PI FOOD' className='logo-black'/>
            </Link>
        </header>
    )
}

