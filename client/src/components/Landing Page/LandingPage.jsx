import React from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, getDiets } from '../../actions/index';

const Landing = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getDiets())
        dispatch(getRecipes())
        .catch(error => console.log(error))
    },[dispatch]);

    return (
        <div>
            <div>Landing Page</div>
        </div>
    )
}

export default Landing;