import React, { Component } from 'react'
import { Link } from 'react-router'


const AddGamePanel = props => {

    const signedIn = ({ user, logout }) => {
        return(
            <div className='add-game-panel'>
              <h5>Welcome {user}, <span onClick={logout}>Logout</span></h5>
              <Link to='/games/add' className='btn btn-danger'>add a new Game!</Link>
            </div>
        )
    }

    const notSignedIn = (
        <div className='btn-group' role='group' aria-label='...'>
          <Link to='/auth/signup' className='btn btn-primary'>Sign Up</Link>
          <Link to='/auth/login' className='btn btn-danger'>Login</Link>
        </div>
    )


    if (props.user !== null ){
        return signedIn(props)
    } else {
        return notSignedIn
    }

}

export default AddGamePanel
