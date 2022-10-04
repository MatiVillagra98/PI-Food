import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Error404.css'

const Error404 = (props) => {

    return (
        <div>
            <NavBar/>
            <img src="https://www.clixpert.com.au/blog/wp-content/uploads/2020/10/custom-404-page.png" alt="404" className='not-found'></img>
        </div>
    );
};

export default Error404;
