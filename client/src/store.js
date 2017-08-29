import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'


const configureStore = () => {

    const initialState = window.REDUX_INITIAL_STATE || {}
    const store = createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return store
}

export default configureStore
