//initialState
// import Immutable from 'immutable'

const initialState = {
    list: [],
    selectedGame: {},
    picURL: ''
}
// const initialState = Immutable.Map()

//constants
export const SET_GAMES = 'setGames@app'
export const SET_SELECTED_GAME = 'setSelectedGame@app'
export const DELETE_GAME = 'deleteGame@app'
export const SUBMIT_GAME = 'submitGame@app'
export const SET_PIC_URL = 'setPicURL@app'
export const UPLOAD_PIC = 'uploadPic@app'


//actions
export const setGames = games => ({
    type: SET_GAMES,
    payload: games
})

export const deleteGame = index => ({
    type: DELETE_GAME,
    payload: index
})

export const setSelectedGame = game => ({
    type: SET_SELECTED_GAME,
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
    [SET_GAMES]: (state, action) => ({ ...state,
        list: action.payload
    }),
    [SET_SELECTED_GAME]: (state, action) => ({ ...state,
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
