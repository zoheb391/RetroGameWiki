import { takeLatest } from 'redux-saga'
import { hashHistory } from 'react-router'
import { put, select, call } from 'redux-saga/effects'


import { GET_GAMES, DELETE_GAME, SUBMIT_GAME, UPLOAD_PIC } from '../reducers/games'
import { getGamesSuccess, getGamesFailure, setPicURL } from '../reducers/games'

const fetchGames = () => {
    return fetch('http://localhost:8080/api/games', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
}

const removeGame = id => {
    return fetch(`http://localhost:8080/api/games/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
    .then(response => response.json())
}

const fetchURL = () => {
    return new Promise((resolve, reject) => {
        filepicker.pick (
        {
            mimetype: 'image/*', // Cannot upload other files but images
            container: 'modal',
            services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
            openTo: 'COMPUTER' // First choice to upload files from
        }, (blob, err) => {
            if(err) {
                reject(err)
            } else {
                resolve(blob.url)
            }
        })
    })
}

const gameSumbission = game => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/api/games', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(game)
        })
        .then(response => {
            response.ok
                ? resolve({message: 'game created'})
                : reject({message: 'Submission Error'})
        })
    })
}

function* deleteGame({ payload }) {
    let list = yield select(state => state.games.list)
    let deleteGameId = list[payload]._id

    try {
        let response = yield removeGame(deleteGameId)
        let games = yield call(getGames)
    } catch(err) {
        alert('Error Deleting Game', err)
    }
}

function* getGames() {
    try {
        let games = yield fetchGames()
        yield put(getGamesSuccess(games))
    } catch (err) {
        yield put(getGamesFailure)
    }
}

function* submitGame({ payload: game }) {
    const picture = yield select(state => state.games.picURL)
    const newGame = { ...game, picture  }

    try {
        const response = yield gameSumbission(newGame)
        hashHistory.push('/games')
        yield put(setPicURL(''))
    } catch(e) {
        alert('error submitting', e)
    }

}

function* uploadPicture(){
    try {
        const response = yield call(fetchURL)
        yield put(setPicURL(response))
    } catch (err) {
        alert('failed to load pic')
    }

}

function* watchGetGames() {
    yield takeLatest(GET_GAMES, getGames)
}

function* watchDeleteGames() {
    yield takeLatest(DELETE_GAME, deleteGame)
}

function* watchSubmitGame() {
    yield takeLatest(SUBMIT_GAME, submitGame)
}

function* watchUploadPic() {
    yield takeLatest(UPLOAD_PIC, uploadPicture)
}

export {
    watchGetGames,
    watchDeleteGames,
    watchSubmitGame,
    watchUploadPic
}
