import React from 'react';
import DetailCard from '../DetailCard/DetailCard';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail } from '../../actions/index';
import NavBar from '../NavBar/NavBar';
import './Detail.css'
import Loading from '../Loading/Loading';

const Detail = (props) => {

    const dispatch = useDispatch();
    const detail = useSelector(state => state.recipeDetail);
    const id = props.match.params.id;

    React.useEffect(() => {
        window.scrollTo({top: 0})
        dispatch(getRecipeDetail(id))
        .catch(error => console.log(error))
    },[dispatch, id]);

    return (
        <div className='detail'>
            <div><NavBar/></div>
            {detail.length > 0 ?
                <DetailCard 
                    id={id}
                    image={detail[0].image} 
                    title={detail[0].title} 
                    diets={detail[0].diets} 
                    type={detail[0].type}
                    summary={detail[0].summary}
                    health={detail[0].health}
                    steps={detail[0].steps}
                /> :
                <Loading/>
            }
        </div>
    )
}

export default Detail;