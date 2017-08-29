import { combineReducers } from 'redux'
import settingsReducer from './settings'

export const rootReducer = combineReducers({
    app: settingsReducer,
    
})

export default rootReducer
