import React from 'react';
import PaginationSteps from './PaginationSteps';
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from 'react-redux';
import { addRecipeFavorite, removeRecipeFavorite } from '../../actions/index';
import './DetailCard.css'

const DetailCard = (props) => {

    const id = Number(props.id) === 'NaN' ? props.id : Number(props.id)
    const dispatch = useDispatch(); 
    const favorites = useSelector(state => state.favorites)
    const detail = useSelector(state => state.recipeDetail)
    const [ button, setButton ] = React.useState('')

    React.useEffect(() => {
        favorites.some(r => r.id === id) ? setButton('fav') : setButton('noFav')
    },[]);//eslint-disable-line
    function addFavorite(detail) {
        dispatch(addRecipeFavorite(detail))
    }

    function removeFavorite(id) {
        dispatch(removeRecipeFavorite(id))
    }

    function favorite(e) {
        e.preventDefault()
        if(e.target.className === 'fav') {
            removeFavorite(id)
            setButton('noFav')
        }
        else {
            addFavorite(detail)
            setButton('fav')
        }
    }


    return (
            <div className='card-detail'>
                <p className='title-detail'>{props.title}</p>
                <button className={button} onClick={favorite}>❤</button>
                {props.image && <img src={props.image} alt='Img not found'/>}
                <span className='summary'>{ReactHtmlParser(props.summary)}</span>
                {props.type && <h3 className='type'>Type {props.type}</h3>}
                {props.diets && <div className='diets'>{props.diets.map(d => <h3 className='diet' key={Math.random()}>{d}</h3>)}</div>}
                {props.health && <h2 className='health'>Health Level: {props.health}</h2>}
                {props.steps && <PaginationSteps steps={props.steps}/>}
            </div>
    );
};

export default DetailCard;