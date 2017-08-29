import { combineReducers } from 'redux'
import settingsReducer from './settings'
import gamesReducer from './games'


export const rootReducer = combineReducers({
    app: settingsReducer,
    games: gamesReducer
})

export default rootReducer
