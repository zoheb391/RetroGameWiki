import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers'
import rootSaga from './sagas'


const configureStore = () => {

    const sagaMiddleware = createSagaMiddleware()
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    )

    sagaMiddleware.run(rootSaga)

    return store
}

export default configureStore
