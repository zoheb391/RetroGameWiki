//initialState
// import Immutable from 'immutable'

const initialState = {
    list: []
}
// const initialState = Immutable.Map()

//constants
export const GET_GAMES = 'getGames@app'
export const GET_GAMES_SUCCESS = 'getGamesSuccess@app'
export const GET_GAMES_FAILURE = 'getGamesFailure@app'



//actions
const getGames = () => ({
    type: GET_GAMES
})

export const getGamesSuccess = games => ({
    type: GET_GAMES_SUCCESS,
    payload: games
})

export const getGamesFailure = error => ({
    type: GET_GAMES_FAILURE,
})

// Handler
const actionHandler = {
    [GET_GAMES_SUCCESS]: (state, action) => ({ ...state,
        list: action.payload
    }),
    [GET_GAMES_FAILURE]: (state, action) => ({ ...state,
        list: 'ERROR_FETCHING_GAME'
    })
}


//reducer
const appReducer = (state = initialState, action) => {
    const handler = actionHandler[action.type]
    return handler? handler(state, action) : state
}

export default appReducer
