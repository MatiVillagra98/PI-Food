import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets } from '../../actions/index';
import RecipeCard from '../RecipeCard/RecipeCard'
import FilterDiets from '../FilterDiets/FilterDiets';
import ToggleButton from '../Toggle/ToggleButton';

const Recipe = (props) => {

    const recipes = useSelector(state => state.recipes)
    const [state, setState] = React.useState({name: ' '})
    const [filterFood, setFilterFood] = React.useState([])
    const [order, setOrder] = React.useState('DISORDER') //eslint-disable-line
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getRecipes())
        dispatch(getDiets())
        .catch(error => console.log(error))
    },[dispatch]);

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(getRecipes(state.name))
        setFilterFood([])
    }

    function handleChange(event) {
        setState({...state, name: event.target.value });
    }

    let filtered = filterFood.length > 0 ? filterFood : recipes

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='buscar' placeholder="Buscar" onChange={handleChange}></input>
                <button>Buscar</button>
            </form>
        <FilterDiets setState={setFilterFood} state={filterFood} recipes={recipes} />
        <ToggleButton setFood={setFilterFood} food={filterFood} setOrder={setOrder} recipes={recipes} />
            <div>
                {filtered.length > 0 && filtered.map((r) =>
                    <RecipeCard key={r.id} image={r.image} title={r.title} diets={r.diets}/>
                )}
            </div>
        </div>
    );
}

export default Recipe;