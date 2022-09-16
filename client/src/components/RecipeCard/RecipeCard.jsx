import React from 'react';


const RecipeCard = (props) => {

    return (
        <div key={props.id}>
            <h2>{props.title}</h2>
            <img src={props.image} alt='Img not found'/>
            {props.diets && props.diets.map(d => <p key={Math.random()}>{d}</p>)}
            <hr/>
        </div>
    );
};

export default RecipeCard;