import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../../actions/index';


const CreateRecipe = () => {

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)
    const [recipe, setRecipe] = React.useState({title: '', summary: '', health: '', diet: [1]});
    const [error, setError] = React.useState({name: '', summary: '', healthScore: ''});

    function handleChange(e) {
        switch (e.target.name) {
            case 'title':
                if((!/^[a-zA-Z ]*$/.test(e.target.value)) || !e.target.value || e.target.value.length > 25) {
                    setError({...error, title: 'Debe ser entre 2 y 25 y no contener caracteres'})
                } 
                else {
                    setRecipe({...recipe, title: e.target.value})
                    setError({...error, title: ''})
                }
                break;
            case 'summary':
                if((!/^[A-Za-z0-9\-:!?¡%$"(),;. ]*$/.test(e.target.value)) || e.target.value.length > 100) {
                    setError({...error, summary: 'Debe ser menos a 100 y no caracter'})
                } 
                else {
                    setRecipe({...recipe, summary: e.target.value})
                    setError({...error, summary: ''})
                }
                break;
            case 'health':
                if(e.target.value > 100 || e.target.value < 0) {
                    setError({...error, health: 'Max 100'})
                }
                else {
                    setRecipe({...recipe, health: e.target.value})
                    setError({...error, health: ''})
                }
                break;
            case 'steps':
                setRecipe({...recipe, steps: e.target.value})
                break;
            default:
                return
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(!error.title && !error.health && !error.summary) {
            dispatch(createRecipe(recipe))
            setRecipe({...recipe, title: ''})
        }
        else {
            alert('Datos incorrectos')
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='title' value={recipe.title} placeholder="Name..." onChange={handleChange}></input>
                {!error.title ? null : <span>{error.title}</span>}
                <input name='summary' placeholder="Summary..." onChange={handleChange}></input>
                {!error.summary ? null : <span>{error.summary}</span>}
                <label>Nivel Health Score(0-100):</label>
                <input type="number" id='health' name="health" onChange={handleChange}></input>
                {!error.health ? null : <span>{error.health}</span>}
                <input name='steps' placeholder="Steps" onChange={handleChange}></input>

                {/*Falta ver como meter las dietas por id en un array
                Falta meter imagen*/}

                {diets.length && diets.map((d, index) => 
                    <div key={index}>
                        <input type="checkbox" value={d.name} onChange={console.log('dietSelector')}/> 
                        <label>{d.name}</label>
                    </div>)}
                <button>Crear</button>
            </form>
        </div>
    )

}

export default CreateRecipe;