import React from 'react'
import { Link } from 'react-router-dom';
import './error.css'
const Error = () => {

    return (
        <div className='error_container'>
            <h1>Page not found!</h1>
            <p>Comeback to the <Link to="/" className='link'>home page</Link>.</p>
        </div>
    )

}
export default Error;
