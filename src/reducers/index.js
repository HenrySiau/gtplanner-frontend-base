import { combineReducers } from 'redux';
import isLoggedIn from './isLoggedIn';
import isDrawerOpen from './isDrawerOpen';
import {isSnackbarOpen, snackbarMessage} from './snackbar';
 
export default combineReducers({
    isLoggedIn,
    isDrawerOpen,
    isSnackbarOpen,
    snackbarMessage
})