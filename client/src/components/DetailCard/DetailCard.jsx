import React from 'react';


const DetailCard = (props) => {

    return (
            <div>
                <h2 value={props.title}>{props.title}</h2>
                <img src={props.image} alt='Img not found'/>
                {props.diets && props.diets.map(d => <p key={Math.random()}>{d}</p>)}
                <h3>{props.type}</h3>
                <p>{props.summary}</p> {/*tiene simbolos raros*/}
                <h2>{props.health}</h2>
                {props.steps && props.steps.map(s => <p key={Math.random()}>{s.number} - {s.step}</p>)}
            </div>
    );
};

export default DetailCard;