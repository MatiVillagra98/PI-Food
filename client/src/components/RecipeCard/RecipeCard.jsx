import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';


const RecipeCard = (props) => {

    return (
        <Link to={`/detail/${props.id}`} className='link'>
            <div className='card'>
                <h2 value={props.title}>{props.title}</h2>
                <img src={props.image} alt='Img not found'/>
                {props.diets && props.diets.map(d => <p key={Math.random()}>{d}</p>)}
            </div>
        </Link>
    );
};

export default RecipeCard;