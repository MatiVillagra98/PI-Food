import React from 'react';
import { Link } from 'react-router-dom';
import { getDiets } from '../../actions/index';
import { useDispatch } from 'react-redux';
import './NavBar.css'

export default function NavBar() {

    // const [className, setClassName] = React.useState({home: 'notSelected', create:'notSelected'})

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getDiets())
        .catch(error => console.log(error))
    },[dispatch]);

    function isSelected(e) {
        // e.target.name === 'home' ? 
            // setClassName({home: 'isSelected', create: 'notSelected'}) :
            // setClassName({home: 'notSelected', create: 'isSelected'})
    }

    return (
        <header className='navbar'>
            <nav>
                <ul className='links'>
                    <Link to='/home'>
                        <button className='btn' name='home' onClick={isSelected}>HOME</button>
                    </Link>
                    <Link to='/createRecipe' name='create' className='btn'>
                        <button className='btn' name='create' onClick={isSelected}>Crear Receta</button>
                    </Link>
                </ul>
            </nav>
            <Link to='/' className='change'>
                <img src='logo.png' alt='PI FOOD' className='logo-black'/>
            </Link>
        </header>
    )
}

