import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getDiets } from '../../actions/index';
import DetailCard from '../DetailCard/DetailCard';
import NavBar from '../NavBar/NavBar';
import './CreateRecipe.css'

const CreateRecipe = () => {

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets)
    const [recipe, setRecipe] = React.useState({title: '', summary: '', health: 0, steps: [], image:''});
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
                    setError({...error, title: 'Dato obligatorio, no puede contener caracteres especiales'})
                } 
                else {
                    setError({...error, title: ''})
                }
                setRecipe({...recipe, title: e.target.value})
                break;
            case 'summary':
                if((!/^[A-Za-z0-9\-:!?¡%$"(),;.ñ ]*$/.test(e.target.value)) || e.target.value.length < 1 || e.target.value.length > 1000) {
                    setError({...error, summary: 'Dato obligatorio, no puede contener caracteres especiales'})
                } 
                else {
                    setError({...error, summary: ''})
                }
                setRecipe({...recipe, summary: e.target.value})
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

        if(recipe.title && recipe.summary) {

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
        <div className='create'>
            <div><NavBar/></div>
            <form onSubmit={handleSubmit} className='form'>
                <h2 className='new'>New Recipe</h2>
                <label>Name:</label>
                <input name='title' className={error.title && 'error'} value={recipe.title} placeholder="Name..." onChange={handleChange}/>
                {!error.title ? null : <span>{error.title}</span>}
                <label>Summary:</label>
                <input name='summary' className={error.summary && 'error'} value={recipe.summary} placeholder="Summary..." onChange={handleChange}/>
                {!error.summary ? null : <span>{error.summary}</span>}
                <label>Health Score(0-100):</label>
                <input type="number" id='health' value={recipe.health} name="health" onChange={handleChange}/>
                {!error.health ? null : <span>{error.health}</span>}
                <label>Instructions:</label>
                <input name='steps' value={stepsArray.step} placeholder="Steps" onChange={handleChange}/>
                <button type='button' onClick={insertSteps}>Añadir Paso</button>
                <label>Picture:</label>
                <input name='image' value={recipe.image} placeholder='Image' onChange={handleChange}/>
                <div className='add'>
                    <input type="checkbox" id="add"/>
                    <label for="add" className='btn-add'><span>Add Diet</span></label>
                    <div className='diets-create'>
                        {diets.length && diets.map((d, index) => 
                            <div key={index}>
                                <input className='input' id={index} type="checkbox" value={d.name} onChange={dietSelector}/> 
                                <label for={index}>{d.name}</label>
                            </div>)}</div>
                    </div>
                <button>Crear</button>
                {creado && 
                <DetailCard className='created'
                    title={creado.title} 
                    image={creado.image} 
                    summary={creado.summary}
                />}
            </form>
        </div>
    )

}

export default CreateRecipe;