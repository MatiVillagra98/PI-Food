import React from 'react';

const ToggleButton = (props) => {

    const [toggle, setToggle] = React.useState({alph: 'A-Z', state: true, score: '+ / -'});

    function orderRecipe(value) {

        let orderedRecipes = props.filterFood.length !== 0 ? props.filterFood : props.recipes;

        if(toggle.state) {
            orderedRecipes = orderedRecipes.sort(function (a, b) {
                if (a[value] > b[value]) return 1;
                if (a[value] < b[value]) return -1;
                return 0;
            }, value);
        } 
        else {    
            orderedRecipes = orderedRecipes.sort(function (a, b) {
                if (a[value] < b[value]) return 1;
                if (a[value] > b[value]) return -1;
                return 0;
            }, value)
        }
    toggle.state === true ? 
    setToggle({alph: 'Z-A', state: false, score: '- / +'}) : setToggle({alph: 'A-Z', state: true, score: '+ / -'})
    props.setFood(orderedRecipes)
}

    function order(event) {
        if(event.target.value === 'title') {
            orderRecipe('title') 
        }
        else {
            orderRecipe('healthScore')
        }
    props.order === true ? props.setOrder(false) : props.setOrder(true)
    }

    return (
        <div key='toggle'>
            <button type='button' value='title' onClick={order}>{toggle.alph}</button>
            <button type='button' value='health' onClick={order}>{toggle.score}</button>
        </div>
    );

}

export default ToggleButton;