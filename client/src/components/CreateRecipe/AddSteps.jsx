import React from 'react';

const AddStep = (props) => {

    const [steps, setStep] = React.useState('');

    function handleChange(e) {
        setStep(e.target.value)
    }

    function handleSubmit() {
        let step = {number: props.state.steps.length + 1, step: steps}

        props.setState({...props.state, step: step})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='steps' placeholder="Steps" onChange={handleChange}></input>
                <button>Add more steps</button>
            </form>
        </div>
    )
}

export default AddStep;