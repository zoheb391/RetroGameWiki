import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import settingsReducer from './settings'
import gamesReducer from './games'


export const rootReducer = combineReducers({
    app: settingsReducer,
    games: gamesReducer,
    form: formReducer
})

export default rootReducer
