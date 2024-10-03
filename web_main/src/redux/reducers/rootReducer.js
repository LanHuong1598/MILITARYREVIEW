// ** Redux Imports
import { combineReducers } from 'redux'
// ** Reducers Imports
import menu from './menu'
import login from './login'
const rootReducer = combineReducers({
    menu,
    login
})

export default rootReducer