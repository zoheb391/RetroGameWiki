//initialState
// import Immutable from 'immutable'

const initialState = {
    name: 'retro-game-wiki',
    searchBar: ''
}
// const initialState = Immutable.Map()

//constants
export const SET_NAME = 'setName@app'
export const SET_SEARCH_BAR = 'setSearchBar@app'


//actions
const changeName = name => ({
    type: SET_NAME,
    payload: name
})

const setSearchBar = value => ({
    type: SET_NAME,
    payload: value
})


// Handler
const actionHandler = {
    [SET_NAME]: (state, action) => ({ ...state,
        name: action.payload
    }),
    [SET_SEARCH_BAR]: (state, action) => ({ ...state,
        searchBar: action.payload
    })
}


//reducer
const appReducer = (state = initialState, action) => {
    const handler = actionHandler[action.type]
    return handler? handler(state, action) : state
}

export default appReducer
