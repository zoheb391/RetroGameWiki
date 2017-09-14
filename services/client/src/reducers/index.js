import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import settingsReducer from './settings'
import gamesReducer from './games'
import authReducer from './authentication'



export const rootReducer = combineReducers({
    app: settingsReducer,
    games: gamesReducer,
    form: formReducer,
    authentication: authReducer
})

export default rootReducer
