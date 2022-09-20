import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets } from '../../actions/index';
import FilterDiets from '../FilterDiets/FilterDiets';
import ToggleButton from '../Toggle/ToggleButton';
import Paginated from '../Pagination/Pagination';

const Recipe = () => {

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes)
    const [state, setState] = React.useState({name: ' '})
    const [filterFood, setFilterFood] = React.useState([])
    const [order, setOrder] = React.useState(true)

    React.useEffect(() => {
        dispatch(getDiets())
        dispatch(getRecipes())
        .catch(error => console.log(error))
    },[dispatch]);//eslint-disable-line

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(getRecipes(state.name))
        setFilterFood([])
    }

    function handleChange(event) {
        setState({...state, name: event.target.value });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='buscar' placeholder="Buscar" onChange={handleChange}></input>
                <button>Buscar</button>
            </form>
        <FilterDiets setState={setFilterFood} state={filterFood} recipes={recipes} />
        <ToggleButton setFood={setFilterFood} filterFood={filterFood} setOrder={setOrder} order={order} recipes={recipes} />
        <Paginated filterFood={filterFood} recipes={recipes} order={order}/>
        </div>
    );
}

export default Recipe;