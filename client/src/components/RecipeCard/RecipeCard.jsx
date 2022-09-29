import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';


const RecipeCard = (props) => {

    return (
        <Link to={`/detail/${props.id}`} className='link'>
            <div className='card'>
                <p className='title'value={props.title}>{props.title}</p>
                <img src={props.image} alt='Img not found'/>
                {props.diets && props.diets.map(d => <h3 key={Math.random()}>{d}</h3>)}
            </div>
        </Link>
    );
};

export default RecipeCard;