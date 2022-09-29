import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes, getDiets } from '../../actions/index';
import './LandingPage.css'

const Landing = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getDiets())
        dispatch(getRecipes())
        .catch(error => console.log(error))
    },[dispatch]);

    return (
        <div className='background'>
            <div className='intro'>
                <p>PI FOOD</p>
                <Link to='/home'>
                    <button className='home'>HOME</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;