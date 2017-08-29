import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { GET_GAMES, getGamesSuccess, getGamesFailure } from '../reducers/games'


const fetchGames = () => {
    return fetch('http://localhost:8080/api/games', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
}


function* getGames() {
    try {
        let games = yield fetchGames()
        yield put(getGamesSuccess(games))
    } catch (err) {
        yield put(getGamesFailure)
    }
}

function* watchGetGames() {
    yield takeLatest(GET_GAMES, getGames)
}

export {
    watchGetGames
}
