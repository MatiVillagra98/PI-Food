import React from 'react';
import PaginationSteps from './PaginationSteps';
import ReactHtmlParser from "react-html-parser";
import './DetailCard.css'

const DetailCard = (props) => {

    return (
            <div className='card-detail'>
                <p className='title-detail'>{props.title}</p>
                {props.image && <img src={props.image} alt='Img not found'/>}
                <span className='summary'>{ReactHtmlParser(props.summary)}</span>
                {props.type && <h3 className='type'>Type {props.type}</h3>}
                {props.diets && <div className='diets'>{props.diets.map(d => <h3 className='diet' key={Math.random()}>{d}</h3>)}</div>}
                <h2 className='health'>Health Level: {props.health}</h2>
                {props.steps && <PaginationSteps steps={props.steps}/>}
            </div>
    );
};

export default DetailCard;