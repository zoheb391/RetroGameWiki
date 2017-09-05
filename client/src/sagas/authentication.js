import axios from 'axios'
import { takeLatest } from 'redux-saga'
import { browserHistory as history } from 'react-router'
import { put, select, call } from 'redux-saga/effects'

import { setError, setUser, clearErrors } from '../reducers/authentication'


const attemptLogin = credentials => {
    return axios({
        method: 'POST',
        url: 'http://localhost:8080/auth/login',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(credentials)
    })
    .then(response => response.data)
    .catch(error => {
        throw error
    })
}


const attemptLogout = () => {
    return axios({
        method: 'POST',
        url: 'http://localhost:8080/auth/logout',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.data)
    .catch(error => {
        throw error
    })
}

function* doLogin({ payload: credentials}) {
    try {
        yield put(clearErrors())
        let response = yield attemptLogin(credentials)
        yield put(setUser(response.accountDetails.username))
        history.push('/games')

    } catch(err) {
        if (err.response) {
            yield put(setError(err.response.data.message))
            console.log(err.response.data.message)
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.log('login saga error', error.message)
        }
    }
}

function* doLogout() {
    try {
        let response = yield attemptLogout()
        yield put(setUser(null))

    } catch(err) {
        if (err.response) {
            yield put(setError(err.response.data.message))
            console.log(err.response.data.message)
        } else if (err.request) {
            console.log('server unavailable', err.request)
        } else {
            console.log('logout saga error', error.message)
        }
    }
}

function* watchAuthentication() {
    yield takeLatest('do::login', doLogin)
    yield takeLatest('do::logout', doLogout)
}

export {
    watchAuthentication
}
