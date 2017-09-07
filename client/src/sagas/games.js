import axios from 'axios'
import { takeLatest } from 'redux-saga'
import { browserHistory } from 'react-router'
import { put, select, call } from 'redux-saga/effects'


import { SET_GAMES, DELETE_GAME, SUBMIT_GAME, UPLOAD_PIC } from '../reducers/games'
import { setGames, setPicURL } from '../reducers/games'

const fetchGames = () => {
    return axios({
        method: 'GET',
        url: 'http://localhost:8080/api/games',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.data)
    .catch(error => {
        throw error
    })
}

const removeGame = id => {
    return axios({
        method: 'DELETE',
        url: `http://localhost:8080/api/games/${id}`,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.data)
    .catch(error => {
        throw error
    })
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
    return axios({
        method: 'POST',
        url: 'http://localhost:8080/api/games',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(game)
    })
    .then(response => response.data)
    .catch(error => {
        throw error
    })
}

function* deleteGame({ payload }) {
    let list = yield select(state => state.games.list)
    let deleteGameId = list[payload]._id

    try {
        let response = yield removeGame(deleteGameId)
        yield put({type: 'init::games'})

    } catch(err) {
        if (err.response) {
            console.log(err.response.data.message)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.log('delete games error', err)
        }
    }
}

function* getGames() {
    try {
        let games = yield fetchGames()
        yield put(setGames(games))

    } catch (err) {
        if (err.response) {
            console.log(err.response.data.message)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.log('fetch games error', err)
        }
    }
}

function* submitGame({ payload: game }) {
    const picture = yield select(state => state.games.picURL)
    const newGame = { ...game, picture  }

    try {
        const response = yield gameSumbission(newGame)
        browserHistory.push('/games')
        yield put(setPicURL(''))

    } catch(e) {
        if (err.response) {
            console.log(err.response.data.message)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.log('fetch games error', err)
        }
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

function* watchGames() {
    yield takeLatest('init::games', getGames)
    yield takeLatest('delete::game', deleteGame)
    yield takeLatest(SUBMIT_GAME, submitGame)
    yield takeLatest(UPLOAD_PIC, uploadPicture)

}


export {
    watchGames
}
