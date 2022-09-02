import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import categoriesReducers from './categoriesReducers';
import blogsReducers from './blogsReducers';
export default combineReducers({
    loginReducer,
    categoriesReducers,
    blogsReducers
})