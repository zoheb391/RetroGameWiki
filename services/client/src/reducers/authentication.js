
const initialState = {
    user: null,
    errors: []
}


//constants
export const SET_USER = 'setUser@app'
export const SET_ERROR = 'setError@app'
export const CLEAR_ERRORS = 'clearErrors@app'


//actions
export const setUser = username => ({
    type: SET_USER,
    payload: username
})

export const setError = msg => ({
    type: SET_ERROR,
    payload: msg
})

export const clearErrors = () => ({
    type: CLEAR_ERRORS
})


// Handler
const actionHandler = {
    [SET_USER]: (state, action) => ({ ...state,
        user: action.payload
    }),
    [SET_ERROR]: (state, action) => ({ ...state,
        errors: [...state.errors, action.payload]
    }),
    [CLEAR_ERRORS]: (state, action) => ({ ...state,
        errors: []
    })
}


//reducer
const appReducer = (state = initialState, action) => {
    const handler = actionHandler[action.type]
    return handler? handler(state, action) : state
}

export default appReducer
