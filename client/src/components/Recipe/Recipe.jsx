import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../actions/index';
import FilterDiets from '../FilterDiets/FilterDiets';
import ToggleButton from '../Toggle/ToggleButton';
import Paginated from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import './Recipe.css';

const Recipe = () => {

    const dispatch = useDispatch(); 
    const recipes = useSelector(state => state.recipes)
    const [state, setState] = React.useState({name: ''})
    const [filterFood, setFilterFood] = React.useState([])
    const [order, setOrder] = React.useState(true)

    React.useEffect(() => {
        dispatch(getRecipes())
        .catch(error => console.log(error))
    },[dispatch]);//eslint-disable-line

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(getRecipes(state.name))
        setState({name: ''})
        setFilterFood([])
    }

    function handleChange(event) {
        setState({...state, name: event.target.value });
    }

    return (
        <div className='recipe'>
            <div><NavBar/></div>
            <form onSubmit={handleSubmit} className='search'>
                <input name='buscar' placeholder='Buscar...' value={state.name} onChange={handleChange}></input>
                <button>Buscar</button>
            </form>
            <div className='filters'>
                <input type="checkbox" id="show" />
                <label for="show" className='btn-show'><span>Filtrar</span></label>
                <div className='hidden'>
                    <FilterDiets setState={setFilterFood} state={filterFood} recipes={recipes}/>
                    <ToggleButton setFood={setFilterFood} filterFood={filterFood} setOrder={setOrder} order={order} recipes={recipes} />
                </div>
            </div>
            <Paginated filterFood={filterFood} recipes={recipes} order={order}/>
        </div>
    );
}

export default Recipe;