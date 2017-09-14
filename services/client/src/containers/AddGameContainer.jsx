import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form } from '../components'

const mapStateToProps = state =>({
    picture: state.games.picURL
})

const mapDispatchToProps = {
    submitAction: game => ({ type: 'submitGame@app', payload: game }),
    uploadPicture: () => ({ type: 'uploadPic@app' })
}

const AddGameContainer = props => {
    let { submitAction, setPicURL, uploadPicture, picture } = props

    return(
        <div>
            <Form {...props}
                submitAction={submitAction}
                uploadPicture={uploadPicture}
             />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGameContainer)
