import React from 'react';

const Modal = props => {
    const { _id, img, name, description, year, picture } = props.game;

    return (
        <div className='modal fade' id='game-modal' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel'>
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>×</span>
                        </button>
                        <h4 className='modal-title' id='myModalLabel'>{`${name} (${year})`}</h4>
                    </div>
                    <div className='modal-body'>
                        <div>
                            <img src={picture} className='img-responsive img-big' />
                        </div>
                        <hr />
                        <p>{description}</p>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-warning' data-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal 
