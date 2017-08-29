import React, { Component } from 'react'
import { hashHistory } from 'react-router'

import { Form } from '../components'

export default class AddGameContainer extends Component {
    constructor(props) {
        super(props)

        this.state = { newGame: {} }

        this.submit = this.submit.bind(this)
        this.uploadPicture = this.uploadPicture.bind(this)
        this.setGame = this.setGame.bind(this)
    }

    submit() {
        const newGame = { ...this.state.newGame, picture: $('#picture').attr('src') }

        fetch('http://localhost:8080/api/games', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newGame)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            hashHistory.push('/games')
        })
    }

    setGame(){
        const newGame= {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            year: document.getElementById('year').value,
            picture: $('#picture').attr('src')
        }
        this.setState({ newGame })
    }

    uploadPicture () {
        filepicker.pick (
            {
                mimetype: 'image/*', // Cannot upload other files but images
                container: 'modal',
                services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
                openTo: 'COMPUTER' // First choice to upload files from
            },
            function (Blob) {
                console.log(JSON.stringify(Blob));
                $('#picture').attr('src', Blob.url);
            },
            function (FPError) {
                console.log(FPError.toString());
            }
        )
    }

    render() {
        return(
            <div>
                <Form
                    submit={this.submit}
                    uploadPicture={this.uploadPicture}
                    setGame={this.setGame} />
            </div>
        )
    }

}
