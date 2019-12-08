import {combineReducers} from 'redux'
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import itemReducer from './itemReducer';


export default combineReducers({
    item:itemReducer,
    error:errorReducer,
    auth:authReducer,
});