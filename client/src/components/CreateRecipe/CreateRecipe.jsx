import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getDiets } from '../../actions/index';
import DetailCard from '../DetailCard/DetailCard';
import NavBar from '../NavBar/NavBar';

const CreateRecipe = () => {

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)
    const [recipe, setRecipe] = React.useState({title: '', summary: '', health: '', steps: [], image:''});
    const [error, setError] = React.useState({name: '', summary: '', healthScore: ''});
    const [creado, setCreado] = React.useState('')
    const [stepsArray, setSteps] = React.useState({step: ''})

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
                if((!/^[A-Za-z0-9\-:!?¡%$"(),;.ñ ]*$/.test(e.target.value)) || e.target.value.length > 100) {
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
                setSteps({...stepsArray, step: e.target.value})
                break;
            case 'image':
                setRecipe({...recipe, image: e.target.value})
                break;
            default:
                return
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

    //Formularios de mas datos
    function handleSubmit(e) {
        e.preventDefault()

        if(recipe.title && recipe.health && recipe.summary) {

            for (let i = 4; i <= 15; i++) {
                e.target[i].checked = false
            }

            dispatch(createRecipe(recipe, dietsArray))
            setRecipe({title: '', summary: '', health: '', steps: ''})
            setCreado({title: recipe.title, summary: recipe.summary, health: recipe.health, image: recipe.image})
            alert('creado')

        }
        else {
            alert('Faltan Datos obligatorios')
        }
    }

    function insertSteps(e) {
        const steps = {number: recipe.steps.length + 1, step: stepsArray.step}
        const jsonSteps = JSON.stringify(steps)
        setRecipe({...recipe, steps: recipe.steps.concat(jsonSteps)})
        setSteps({step: ''})
    }


    return (
        <div>
            <div><NavBar/></div>
            <form onSubmit={handleSubmit}>
                <input name='title' value={recipe.title} placeholder="Name..." onChange={handleChange}/>
                {!error.title ? null : <span>{error.title}</span>}
                <input name='summary' value={recipe.summary} placeholder="Summary..." onChange={handleChange}/>
                {!error.summary ? null : <span>{error.summary}</span>}
                <label>Nivel Health Score(0-100):</label>
                <input type="number" id='health' value={recipe.health} name="health" onChange={handleChange}/>
                {!error.health ? null : <span>{error.health}</span>}
                <input name='steps' value={stepsArray.step} placeholder="Steps" onChange={handleChange}/>
                <button type='button' onClick={insertSteps}>Añadir Paso</button>
                <input name='image' value={recipe.image} placeholder='Image' onChange={handleChange}/>
                {diets.length && diets.map((d, index) => 
                    <div key={index}>
                        <input id={index} type="checkbox" value={d.name} onChange={dietSelector}/> 
                        <label>{d.name}</label>
                    </div>)}
                <button>Crear</button>
            </form>
            {creado && 
            <DetailCard 
                title={creado.title} 
                image={creado.image} 
                heatlh={creado.health}
                summary={creado.summary}
            />}
        </div>
    )

}

export default CreateRecipe;