import React from 'react';
import PaginationSteps from './PaginationSteps';
import ReactHtmlParser from "react-html-parser";


const DetailCard = (props) => {

    return (
            <div>
                <h2>{props.title}</h2>
                {props.image && <img src={props.image} alt='Img not found'/>}
                {props.diets && props.diets.map(d => <p key={Math.random()}>{d}</p>)}
                {props.type && <h3>Type {props.type}</h3>}
                <p>{ReactHtmlParser(props.summary)}</p> {/*tiene simbolos raros*/}
                <h2>Health Level: {props.health}</h2>
                {props.steps && <PaginationSteps steps={props.steps}/>}
            </div>
    );
};

export default DetailCard;