//initialState
// import Immutable from 'immutable'

const initialState = {
    list: [],
    selectedGame: {},
    picURL: ''
}
// const initialState = Immutable.Map()

//constants
export const GET_GAMES = 'getGames@app'
export const GET_GAMES_SUCCESS = 'getGamesSuccess@app'
export const GET_GAMES_FAILURE = 'getGamesFailure@app'
export const GET_SELECTED_GAME = 'getSelectedGame@app'
export const DELETE_GAME = 'deleteGame@app'
export const SUBMIT_GAME = 'submitGame@app'
export const SET_PIC_URL = 'setPicURL@app'
export const UPLOAD_PIC = 'uploadPic@app'


//actions
const getGames = () => ({
    type: GET_GAMES
})

const deleteGame = index => ({
    type: DELETE_GAME,
    payload: index
})

export const getGamesSuccess = games => ({
    type: GET_GAMES_SUCCESS,
    payload: games
})

export const getGamesFailure = error => ({
    type: GET_GAMES_FAILURE,
})

export const getSelectedGame = game => ({
    type: GET_SELECTED_GAME,
    payload: game
})

export const submitGame = game => ({
    type: SUBMIT_GAME,
    payload: game
})

export const setPicURL = url => ({
    type: SET_PIC_URL,
    payload: url
})



// Handler
const actionHandler = {
    [GET_GAMES_SUCCESS]: (state, action) => ({ ...state,
        list: action.payload
    }),
    [GET_GAMES_FAILURE]: (state, action) => ({ ...state,
        list: 'ERROR_FETCHING_GAME'
    }),
    [GET_SELECTED_GAME]: (state, action) => ({ ...state,
        selectedGame: action.payload
    }),
    [DELETE_GAME]: (state, action) => ({ ...state}),
    [SET_PIC_URL]: (state, action) => ({ ...state,
        picURL: action.payload
    })
}


//reducer
const appReducer = (state = initialState, action) => {
    const handler = actionHandler[action.type]
    return handler? handler(state, action) : state
}

export default appReducer
