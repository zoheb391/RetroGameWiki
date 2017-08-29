import React from 'react'
import { Link } from 'react-router'

const Welcome = () => (
    <div className='inner cover'>
        <h1 className='cover-heading'> Welcome </h1>
        <p className='lead'> Click browse to journey into a wiki of games that made history </p>
        <p className='lead'>
            <Link className='btn btn-lg' to='/games'>
                browse
            </Link>
        </p>
    </div>
)

export default Welcome
