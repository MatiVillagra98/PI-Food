import React from 'react';

const ToggleButton = (props) => {

    const [toggle, setToggle] = React.useState({name: 'A-Z', est: true})

    function order() {

        let orderedRecipes = props.food.length !== 0 ? props.food : props.recipes;

        if(toggle.est) {
            setToggle({name: 'Z-A', est: false})
            orderedRecipes = orderedRecipes.sort(function (a, b) {
                if (a.title > b.title) return 1;
                if (a.title < b.title) return -1;
                return 0;
            })
            props.setOrder('A-Z')
        } 
        else {    
            setToggle({name: 'A-Z', est: true})
            orderedRecipes = orderedRecipes.sort(function (a, b) {
                if (a.title < b.title) return 1;
                if (a.title > b.title) return -1;
                return 0;
            })
            props.setOrder('Z-A')
        }
        props.setFood(orderedRecipes)
        
    }

    return (
        <div key='toggle'>
            <button type='button' onClick={order}>{toggle.name}</button>
        </div>
    );

}

export default ToggleButton;