import { combineReducers } from 'redux';
import isLoggedIn from './isLoggedIn';
import isDrawerOpen from './isDrawerOpen';
 
export default combineReducers({
    isLoggedIn,
    isDrawerOpen
})