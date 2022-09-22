import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getDiets } from '../../actions/index';


const CreateRecipe = () => {

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)
    const [recipe, setRecipe] = React.useState({title: '', summary: '', health: '', diets: []});
    const [error, setError] = React.useState({name: '', summary: '', healthScore: ''});

    React.useEffect(() => {
        dispatch(getDiets())
        .catch(error => console.log(error))
    },[dispatch]);

    function handleChange(e) {
        switch (e.target.name) {
            case 'title':
                if((!/^[a-zA-Z ]*$/.test(e.target.value)) || e.target.value.length < 2 || e.target.value.length > 25) {
                    setError({...error, title: 'Debe ser entre 2 y 25 y no contener caracteres'})
                } 
                else {
                    setError({...error, title: ''})
                }
                setRecipe({...recipe, title: e.target.value})
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
                if(e.target.value > 100 || e.target.value < 0 || e.target.value % 1 !== 0) {
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

    // Falta validar recetas cargadas
    //Formularios de mas datos
    function handleSubmit(e) {
        e.preventDefault()
        if(!recipe.title || !recipe.health || !recipe.summary || recipe.diets.length === 0) {
            alert('Faltan Datos obligatorios')
        }
        else {  
            console.log(recipe)
        }
    }

    let dietsArray = []
    function dietSelector(e) {
        const dietId = Number(e.target.id) + 1
        if(!dietsArray.includes(dietId)) {
            dietsArray.push(dietId)
        } 
        else {
            const index = dietsArray.indexOf(dietId);
            dietsArray.splice(index, 1)
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
                {diets.length && diets.map((d, index) => 
                    <div key={index}>
                        <input id={index} type="checkbox" value={d.name} onChange={dietSelector}/> 
                        <label>{d.name}</label>
                    </div>)}
                <button>Crear</button>
            </form>
        </div>
    )

}

export default CreateRecipe;