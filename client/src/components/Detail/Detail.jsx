import React from 'react';
import DetailCard from '../DetailCard/DetailCard';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail } from '../../actions/index';
import NavBar from '../NavBar/NavBar';



const Detail = (props) => {

    const dispatch = useDispatch();
    const id = props.match.params.id
    const detail = useSelector(state => state.recipeDetail)

    React.useEffect(() => {
        dispatch(getRecipeDetail(id))
        .catch(error => console.log(error))
    },[dispatch, id]);
    console.log(detail)

    return (
        <div>
            <div><NavBar/></div>
            {detail.length &&
            <DetailCard 
                key={detail.id} 
                image={detail[0].image} 
                title={detail[0].title} 
                diets={detail[0].diets} 
                type={detail[0].type}
                summary={detail[0].summary}
                health={detail[0].health}
                steps={detail[0].steps}
            />}
        </div>
    )
}

export default Detail;