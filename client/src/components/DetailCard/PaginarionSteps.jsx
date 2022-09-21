import React from 'react';

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


    return(
        <div>
            <div>
                <h2>{paginated.toShow.number}</h2>
                <h2>{paginated.toShow.step}</h2>
            </div>
            <h1>Page {actualPage} of {totalPages}</h1>
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Go</button>
        </div>
    )
}

export default PaginationSteps;