import React from 'react';
import { Link } from 'react-router-dom';


const RecipeCard = (props) => {

    return (
        <Link to={`/detail/${props.id}`}>
            <div>
                <h2 value={props.title}>{props.title}</h2>
                <img src={props.image} alt='Img not found'/>
                {props.diets && props.diets.map(d => <p key={Math.random()}>{d}</p>)}
            </div>
            <hr/>
        </Link>
    );
};

export default RecipeCard;