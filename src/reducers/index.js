import { combineReducers } from 'redux';
import isLoggedIn from './isLoggedIn';
import isDrawerOpen from './isDrawerOpen';
import {isSnackbarOpen, snackbarMessage} from './snackbar';
import {selectedTrip, inviteCode} from './selectedTrip';
 
export default combineReducers({
    isLoggedIn,
    isDrawerOpen,
    isSnackbarOpen,
    snackbarMessage,
    selectedTrip,
    inviteCode
})