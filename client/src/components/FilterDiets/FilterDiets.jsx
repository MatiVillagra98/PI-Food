import React from 'react';
import { useSelector } from 'react-redux';
import './FilterDiets.css'

let diet = [];
let filtered = [];

const FilterDiets = (props) => {
    const diets = useSelector(state => state.diets)

    function handleChange(event) {
        
        let filterFood = props.state.length !== 0 ? props.state : props.recipes;
        
        if(event.target.checked) {
            diet.push(event.target.value)

            filtered = filterFood.filter(r => {
                return r.diets.includes(event.target.value)
                })

            if(filtered.length === 0) {
                event.target.checked = false;
                diet.pop()
                alert('No match for that filters')
            }
            else {
                props.setState(filtered)
            }
            
        } else {
            diet = diet.filter(r => {
                return r !== event.target.value
            })           
            let filtered = props.recipes
            for (let i = 0; i < diet.length; i++) { // eslint-disable-next-line
                filtered = filtered.filter(r => {
                    return r.diets.includes(diet[i])
                })
            }
            props.setState(filtered)
        }        
    }

    return (            

        <div className='diets'>
            {diets.map((d, index) => 
            <div key={index} >
                <input type="checkbox" id={d.name} value={d.name} onChange={handleChange}/> 
                <label for={d.name}>{d.name}</label>
            </div>)}
        </div>
    )

};

export default FilterDiets;

