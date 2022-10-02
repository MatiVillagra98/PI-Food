import React from 'react';
import './PaginationSteps.css'

const PaginationSteps = (props) => {

    let steps = props.steps;

    const [paginated, setPaginated] = React.useState({page: 0, toShow: steps[0]})

    const totalPages = steps.length

    const actualPage = (paginated.page + 1) > totalPages ?
        1 : paginated.page + 1;

    function nextStep() {
        const nextPage = paginated.page + 1;
        if(nextPage >= steps.length) return;
        setPaginated({page: nextPage, toShow: steps[nextPage]});
    };

    function prevStep() {
        const prevPage = paginated.page - 1;
        if (prevPage < 0) return;
        setPaginated({page: prevPage, toShow: steps[prevPage]});
    };

    React.useEffect(() => {
        setPaginated({...paginated, toShow: steps[0]})
        prevStep()
    },[props.steps]); //eslint-disable-line
    
    if(paginated.toShow === undefined) {
        return (
            <div className='steps'>
                <h2>Sin datos de preparacion</h2>
            </div>
        )
    }
    else {
        return(
            <div className='steps'>
                <div>
                    <h2>Step N° {paginated.toShow.number}</h2>
                    <h2>{paginated.toShow.step}</h2>
                </div>
                <h3>Step {actualPage} of {totalPages}</h3>
                <button onClick={prevStep}>Prev Step</button>
                <button onClick={nextStep}>Next Step</button>
            </div>
        )
    }
}

export default PaginationSteps;