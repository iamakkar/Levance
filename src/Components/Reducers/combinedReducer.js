import {combineReducers} from 'redux'
import userDetails from './userDetails'


const rootReducer = combineReducers({
    userDetails: userDetails
}) 

export default rootReducer