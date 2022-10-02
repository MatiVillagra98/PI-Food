import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import './Pagination.css'

const Paginated = (props) => {

    let recipesToShow = props.filterFood.length > 0 ?
        props.filterFood : props.recipes;

    const [paginated, setPaginated] = React.useState({page: 0, toShow: [...recipesToShow].splice(0, 9)})

    const totalPages = Math.floor(recipesToShow.length/9) !== 0 ?
        Math.floor(recipesToShow.length/9) + 1 : 1;

    const actualPage = (paginated.page + 1) > totalPages ?
        1 : paginated.page + 1;

    function nextPage() {
        const nextPage = paginated.page + 1;
        const firstIndex = nextPage * 9;
        if(firstIndex >= recipesToShow.length) return;
        setPaginated({page: nextPage, toShow: [...recipesToShow].splice(firstIndex, 9)});
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    function prevPage() {
        const prevPage = paginated.page - 1;
        if (prevPage < 0) return;
        const firstIndex = prevPage * 9;
        setPaginated({page: prevPage, toShow: [...recipesToShow].splice(firstIndex, 9)});
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    React.useEffect(() => {
        setPaginated({...paginated, toShow: [...props.filterFood].splice(0, 9)})
        prevPage()
    },[props.filterFood, props.order]); //eslint-disable-line


    function recipesMap() {
        if (paginated.toShow.length !== 0) {
            return (
                paginated.toShow.map((r) =>
                <RecipeCard key={r.id} id={r.id} image={r.image} title={r.title} diets={r.diets} />
            ))
        }
        else {
            return(
                recipesToShow.length && [...recipesToShow].splice(0, 9).map(r =>
                <RecipeCard key={r.id} id={r.id} image={r.image} title={r.title} diets={r.diets} />
            ));
        };
    };

    return(
        <div className='pagination'>
            <div className='recipes'>
                {recipesMap()}
            </div>
            <h1 className='text'>Page {actualPage} of {totalPages}</h1>
            <button onClick={prevPage}>Back</button>
            <button onClick={nextPage}>Go</button>
        </div>
    )
}

export default Paginated;
