import React from 'react';
import PaginationSteps from './PaginarionSteps';


const DetailCard = (props) => {

    return (
            <div>
                <h2>{props.title}</h2>
                <img src={props.image} alt='Img not found'/>
                {props.diets && props.diets.map(d => <p key={Math.random()}>{d}</p>)}
                <h3>{props.type}</h3>
                <p>{props.summary}</p> {/*tiene simbolos raros*/}
                <h2>{props.health}</h2>
                <PaginationSteps steps={props.steps}/>
            </div>
    );
};

export default DetailCard;