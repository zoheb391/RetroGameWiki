import React from 'react'

const Game = props => {
    let { name, description, picture } = props._source
    let { _id, i, toggleModal, deleteGame, user } = props

    const DeleteButton = () => (
        <button className='btn btn-danger' role='button' onClick={() => deleteGame(i)}>
            Delete
        </button>
    )

    return (
        <div className='col-md-4'>
            <div className='thumbnail'>
                <div className='thumbnail-frame'>
                    <img src={picture} alt='...' className='img-responsive thumbnail-pic' />
                </div>
                <div className='caption'>
                    <h5>{name}</h5>
                    <p className='description-thumbnail'>{ description? `${description.substring(0, 150)}...` : 'No Description'}</p>
                    <div className='btn-group' role='group' aria-label='...'>
                        <button className='btn btn-success' role='button' onClick={() => toggleModal(i)}>View</button>
                        { (user != null) && <DeleteButton /> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game
